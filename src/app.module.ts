import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Session } from './auth/model/session'
import { DatabaseConfig } from './database/DataBase'
import { AuthModule } from './auth/auth.module'
import { AuthCheckMiddleware } from './middlewares/auth.middleware'
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DatabaseConfig.getDataBaseConfig,
      entities: [Session],
      autoLoadEntities: true,
      timezone: '+05:00',
      // logging: false,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
