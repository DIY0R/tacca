import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { PostsService } from './posts/posts.service';
import { access } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

@Injectable()
export class AppService {
  private quote = '';
  private arr = [];
  constructor(private postsService: PostsService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Cron('* * * * * *')
  handleCron() {
    const randomIndex = Math.floor(Math.random() * this.arr.length);

    this.quote = this.arr[randomIndex];
  }

  async nav() {
    const posts = await this.postsService.allPosts();
    return { quote: this.quote, scripts: ['app'], posts };
  }

  private async accessFile(path: string): Promise<void | object> {
    try {
      const result = await access(path);
      return result;
    } catch (error) {
      return error;
    }
  }

  async staticImages(image) {
    const homeUrl = process.cwd() + '/public/images/postsImages/';

    const path = homeUrl + image;
    const result = await this.accessFile(path);
    const img = !!result ? 'black-line-1755.jpg' : image;
    const file = createReadStream(join(homeUrl + img));

    return file;
  }
}
