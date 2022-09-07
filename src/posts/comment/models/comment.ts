import { Users } from 'src/auth/model/user.model';
import Post from 'src/posts/model/post';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'text',
  })
  text: string;

  @ManyToOne(() => Post, (post) => post.comment, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => Users, (user) => user.comment, { onDelete: 'CASCADE' })
  user: Users;
}
