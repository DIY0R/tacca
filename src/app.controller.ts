import { Controller, Get, Inject, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('pages/all/all')
  getHello(): any {
    console.log(this.appService.nav());
    return this.appService.nav();
  }
}
