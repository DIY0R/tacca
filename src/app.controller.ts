import { Controller, Get, Param, Render, Req, Res } from '@nestjs/common';

import { AppService } from './app.service';
import { imgpathDtoValid } from './posts/dto/imgpath.dto';
import { PostsService } from './posts/posts.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private postsService: PostsService
  ) {}

  @Get('/postImages/:imgpath')
  async seeUploadedFile(@Param('imgpath') image: imgpathDtoValid, @Res() res) {
    const file = await this.appService.staticImages(image);
    file.pipe(res);
  }
  @Get()
  @Render('pages/all/all')
  getHello(): any {
    return this.appService.nav();
  }

  @Get('/post/:idPost')
  @Render('pages/all/postOne')
  async getOnePost(@Param('idPost') idPost: any, @Req() req: any) {
    const post = await this.postsService.getOnePost(idPost);

    return {
      post,
      errors: req.flash('error-comment'),
      login: true,
      css: ['postPage'],
      scripts: ['comment'],
    };
  }
}
