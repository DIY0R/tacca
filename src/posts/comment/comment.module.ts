import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PostsModule } from '../posts.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import Comment from './models/comment';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [TypeOrmModule.forFeature([Comment]), AuthModule, PostsModule],
})
export class CommentModule {}
