import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostModel from './model/post';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { CommentModule } from './comment/comment.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    TypeOrmModule.forFeature([PostModel]),

    AuthModule,
    MulterModule.register({
      dest: './public/images/postsImages',
    }),
  ],
  exports: [PostsService, TypeOrmModule],
})
export class PostsModule {}
