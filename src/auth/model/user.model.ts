import { ISession } from 'connect-typeorm';
import Comment from 'src/posts/comment/models/comment';
import PostModel from 'src/posts/model/post';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    unique: true,
    length: 50,
  })
  email: string;

  @Column({
    select: false,
    nullable: true,
    length: 100,
  })
  password: string;

  @OneToMany(() => PostModel, (post) => post.user, { cascade: true })
  posts: PostModel[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comment: Comment[];
}
