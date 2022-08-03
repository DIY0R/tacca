import { Controller, Get, Render, Res, UseGuards } from '@nestjs/common';

import { AuthGuardGlobal } from 'src/guards/auth.guard';
import { MyResponse } from 'src/types/response';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuardGlobal)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/me')
  @Render('pages/profile/myProfile')
  async myProfile(@Res() res: MyResponse) {
    const userInfo = await this.profileService.getInfoUser(res.locals.user.id);
    return { css: ['myProfile'], userInfo, login: true };
  }
}
