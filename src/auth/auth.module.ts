import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

import { Session } from './model/session'
import { Users } from './model/user.model'
@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([Session, Users]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    AuthService,
  ],
  exports: [TypeOrmModule],
})
export class AuthModule {}
