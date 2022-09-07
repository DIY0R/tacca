import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Session } from './auth/model/session';
import { DatabaseConfig } from './database/DataBase';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ProfileModule } from './profile/profile.module';
import { CommentModule } from './posts/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DatabaseConfig.getDataBaseConfig,
      entities: [Session],
      autoLoadEntities: true,
      timezone: '+05:00',
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      logging: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    PostsModule,
    ProfileModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
