import {
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { classToPlain, Exclude } from 'class-transformer'
import { v4 as uuidv4 } from 'uuid'

export default abstract class Model extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @BeforeInsert()
  @Exclude()
  addId() {
    this.id = uuidv4()
  }

  toJSON() {
    return classToPlain(this)
  }
}
