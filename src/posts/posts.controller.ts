import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

import { MyRequest, MyResponse } from 'src/types/response';
import { imgpathDtoValid } from './dto/imgpath.dto';
import { PostDtoValid } from './dto/post.dto';
import { AuthGuard } from './guards/auth.guard';

import { editFileName } from './middlewares/editFileName';
import { imageFileFilter } from './middlewares/imageFileFilter';
import { PostsService } from './posts.service';
import { createReadStream } from 'fs';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/myPosts')
  @Render('pages/posts/postPage.hbs')
  async myPosts(@Res() res: MyResponse) {
    const user: any = await this.postsService.getPosts(res.locals.user.id);
    console.log(user.posts);
    return {
      login: true,
      posts: user.posts,
      css: ['postPage'],
      name: user.name,
    };
  }

  @Get('/addPost')
  @Render('pages/posts/postAdd.hbs')
  addPostPage(@Req() req: MyRequest) {
    return {
      login: true,
      css: ['myPosts'],
      postError: req.flash('postError'),
      scripts: ['postEdit'],
    };
  }

  @Post('/addPost')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images/postsImages',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  @Redirect('/posts/addPost')
  async addPost(
    @Body() postDto: PostDtoValid,
    @UploadedFile() img: Express.Multer.File,
    @Req() req: MyRequest,
    @Res() res: MyResponse
  ) {
    console.log(res.locals.user);
    const post = this.postsService.addPost(
      postDto,
      img,
      req,
      res.locals.user.id
    );
    return { name: 'hello' };
  }
  @Delete('delete/:idPost')
  async deletePost(
    @Param('idPost') idPost: string,
    @Session() session: Record<string, any>
  ) {
    console.log('user->>', session.user.id);
    const posts = await this.postsService.deletePost(+idPost, +session.user.id);
    return { posts };
  }

  @Get('/postImages/:imgpath')
  seeUploadedFile(@Param('imgpath') image: imgpathDtoValid, @Res() res) {
    const file = createReadStream(
      join(process.cwd(), 'public/images/postsImages/' + image)
    );
    file.pipe(res);
  }
}
