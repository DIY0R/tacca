import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Users } from 'src/auth/model/user.model';
import { MyRequest } from 'src/types/response';
import { Repository } from 'typeorm';
import { PostDtoValid } from './dto/post.dto';
import PostModel from './model/post';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Users)
    private readonly repositoryUsers: Repository<Users>,

    @InjectRepository(PostModel)
    private readonly repositoryPost: Repository<PostModel>
  ) {}

  async getPosts(id: number) {
    const user: Users = await this.repositoryUsers
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.posts', 'posts')
      .orderBy('posts.created_at', 'DESC')
      .getOne();

    return user;
  }
  async getOnePost(id: number) {
    const post = await this.repositoryPost
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .innerJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.comment', 'comment')
      .orderBy('comment', 'DESC')
      .getOne();
    console.log(JSON.stringify(post));
    return post;
  }
  async allPosts() {
    const posts = await this.repositoryPost
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .orderBy('post.created_at', 'DESC')
      .getMany();

    return posts;
  }
  async deletePost(idPost: number, idUser: number) {
    const user = await this.repositoryPost
      .createQueryBuilder('post')
      .where('post.id =:id', { id: idPost })
      .innerJoin(Users, 'users', 'post.userId  = ' + idUser)
      .getRawOne();

    return { hello: 'hello' };
  }

  async addPost(
    postDto: PostDtoValid,
    img: Express.Multer.File,
    req: MyRequest,
    id: number
  ) {
    const validMessage = !!img ? postDto?.messages : ['загрузите изображение'];
    if (validMessage) return req.flash('postError', validMessage);

    const currentUser = await this.repositoryUsers.findOne({
      where: { id },
      relations: {
        posts: true,
      },
    });

    let newPost: PostModel = new PostModel();
    const { teg, text, title } = postDto;
    Object.assign(newPost, {
      imgName: img.filename,
      tegs: teg.join(','),
      title,
      text,
    });

    currentUser.posts.push(newPost);
    await this.repositoryUsers.save(currentUser);
    return { name: 'hello' };
  }
}
