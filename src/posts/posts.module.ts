import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostModel from './model/post';
import { MulterModule } from '@nestjs/platform-express';
import { Users } from 'src/auth/model/user.model';
import { AuthModule } from 'src/auth/auth.module';

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
})
export class PostsModule {}
