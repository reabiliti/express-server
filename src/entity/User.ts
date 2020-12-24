import { Entity, Column, Index } from 'typeorm'
import { Exclude } from 'class-transformer'

import Model from './Model'

@Entity('users')
export class User extends Model {
  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ unique: true })
  @Index()
  email: string

  @Column({ name: 'password_hash' })
  @Exclude()
  passwordHash: string
}
