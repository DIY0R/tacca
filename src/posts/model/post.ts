import { ISession } from 'connect-typeorm';
import { Users } from 'src/auth/model/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column('text')
  text: string;

  @ManyToOne(() => Users, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user: Users;
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
