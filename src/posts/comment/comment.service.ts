import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { commentDto, commentQueryDto } from './dto/addcomment.dto';
import Comment from './models/comment';
import PostModel from '../model/post';
import { Users } from '../../auth/model/user.model';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repositoryComment: Repository<Comment>,

    @InjectRepository(PostModel)
    private readonly repositoryPost: Repository<PostModel>,

    @InjectRepository(Users)
    private readonly repositoryUser: Repository<Users>
  ) {}

  async addComment(
    belongOther: commentQueryDto,
    comment: commentDto,
    currentUserId: number
  ) {
    const sql = await this.repositoryComment
      .query(`INSERT INTO comment (text, "postId", "userId")
      VALUES ('${comment.text}',${belongOther.postId}, ${currentUserId});`);
    console.log(sql);
  }
}
