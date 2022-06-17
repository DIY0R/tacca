import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  Session,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { MyRequest, MyResponse } from 'src/types/response'
import { AuthService } from './auth.service'
import { LoginDtoValid } from './dto/login.dto'
import { RegistrationDtoValid } from './dto/registration.dto'
import { AuthGuard } from './guards/auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/registration')
  @UseGuards(AuthGuard)
  @Render('pages/registration/registration.hbs')
  registrationPage(@Req() req: any) {
    return {
      login: true,
      messages: req.flash('info'),
      css: ['registration'],
      scripts: ['validation'],
    }
  }

  @Post('/registration')
  @UseGuards(AuthGuard)
  async registration(
    @Body() registrationDto: RegistrationDtoValid,
    @Session()
    session: { isAuth: boolean; user: object; save: (fn: () => void) => void },
    @Req() req: any,
    @Res() res: any
  ) {
    const user = await this.authService.registration(
      registrationDto,
      session,
      req,
      res
    )

    return user
  }

  @Get('/login')
  @UseGuards(AuthGuard)
  @Render('pages/registration/login')
  loginPage(@Req() req: MyRequest) {
    return {
      login: true,
      messages: req.flash('messages'),
      css: ['registration'],
      scripts: ['validation'],
    }
  }
  @Get('/logout')
  @Redirect('/')
  async logout(@Session() session: Record<string, any>) {
    await this.authService.logout(session)
  }

  @Post('/login')
  @UseGuards(AuthGuard)
  async login(
    @Body() authLogin: LoginDtoValid,
    @Session() session: Record<string, any>,
    @Req() req: MyRequest,
    @Res() res: MyResponse
  ) {
    const user = await this.authService.login(authLogin, req)
    if (!user?.name) return res.redirect('/auth/login')
    console.log(user)
    session.isAuth = true
    session.user = user
    session.save(() => res.redirect('/'))
  }
}
