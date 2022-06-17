import { Injectable, Post } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Users } from 'src/auth/model/user.model'
import { MyRequest } from 'src/types/response'
import { Repository } from 'typeorm'
import { PostDtoValid } from './dto/post.dto'
import PostModel from './model/post'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Users) private repositoryUsers: Repository<Users>,
    @InjectRepository(PostModel) private repositoryPost: Repository<PostModel>
  ) {}

  async getPosts(id: number) {
    const user: Users = await this.repositoryUsers
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.posts', 'posts')
      .orderBy('posts.created_at', 'ASC')
      .getOne()

    return user
  }

  async addPost(
    postDto: PostDtoValid,
    img: Express.Multer.File,
    req: MyRequest,
    id: number
  ) {
  
    const validMessage = !!img ? postDto?.messages : ['загрузите изображение']
    if (validMessage) return req.flash('postError', validMessage)

    const currentUser = await this.repositoryUsers.findOne({
      where: { id },
      relations: {
        posts: true,
      },
    })

    let newPost: PostModel = new PostModel()
    const { teg, text, title } = postDto
    newPost.imgName = img.filename
    newPost.tegs = teg.join(',')
    newPost.title = title
    newPost.text = text
    currentUser.posts.push(newPost)
    await this.repositoryUsers.save(currentUser)
    return { name: 'hello' }
  }
}

