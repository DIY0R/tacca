import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  private quote = '';
  private arr = [
    '«Чем умнее человек, тем легче он признает себя дураком». ...',
    '«Никогда не ошибается тот, кто ничего не делает». ...',
    '«Менее всего просты люди, желающие казаться простыми». ...',
  ];
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }

  @Cron('* * * * * *')
  handleCron() {
    const randomIndex = Math.floor(Math.random() * this.arr.length);

    this.quote = this.arr[randomIndex];
  }
  private testFor(ms) {
    return new Promise((res) => {
      setTimeout(() => {
        for (let i = 0; i < 1_000_00; i++) {
          console.log('stack');
        }
        res(true);
      }, ms);
    });
  }
  async nav() {
    return { quote: this.quote, scripts: ['app'] };
  }
}
