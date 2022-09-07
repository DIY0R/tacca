import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Session,
} from '@nestjs/common';
import { MyRequest } from 'src/types/response';
import { CommentService } from './comment.service';
import { commentDto, commentQueryDto } from './dto/addcomment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @Post('/addcomment')
  async addComment(
    @Query() belongOther: commentQueryDto,
    @Body() comment: commentDto,
    @Req() req: MyRequest
  ) {
    console.log('---->', comment, belongOther);
    const currentUser = req.session.user;
    if (!currentUser) return req.flash('error-comment', ['Ты не авторизован']);

    const commentadd = await this.commentService.addComment(
      belongOther,
      comment,
      currentUser.id
    );
    // console.log(query.postId);
    return { added: 'ok' };
  }
}
