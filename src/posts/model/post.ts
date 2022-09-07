import { ISession } from 'connect-typeorm';
import { Users } from 'src/auth/model/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Comment from '../comment/models/comment';

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
    length: 50,
  })
  tegs: string;
  @Column({ nullable: false, length: 50 })
  imgName: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  text: string;

  @ManyToOne(() => Users, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user: Users;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comment: Comment[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
