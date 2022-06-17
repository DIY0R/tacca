import { ISession } from 'connect-typeorm'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Session implements ISession {
  @Index()
  @Column('bigint')
  public expiredAt = Date.now()

  @PrimaryColumn('varchar', { length: 255 })
  public id = ''

  @CreateDateColumn({
    type: 'timestamptz',
    default: 'Sun, 30 May 2021 14:59:15 GMT',
  })
  created_at: Date

  @UpdateDateColumn({
    type: 'timestamptz',
    default: new Date().toUTCString(),
  })
  updated_at: Date

  @Column('text')
  public json = ''
}
