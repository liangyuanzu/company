/**
 * @desc 用户表
 */
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'
@Table({
  modelName: 'user'
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    comment: '用户ID'
  })
  id: number

  @Column({
    comment: '用户姓名'
  })
  name: string

  @Column({
    comment: '用户年龄'
  })
  age: number

  @Column({
    field: 'created_at'
  })
  createdAt: Date

  @Column({
    field: 'updated_at'
  })
  updatedAt: Date
}
export default () => User
