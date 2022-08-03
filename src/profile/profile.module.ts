import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [AuthModule],
  exports: [],
})
export class ProfileModule {}
