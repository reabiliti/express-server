import { Entity, Column } from 'typeorm'

import Model from './Model'

@Entity('users')
export class User extends Model {
  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string
}
