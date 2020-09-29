/**
 * @desc 用户表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript'
@Table({
  modelName: 'user'
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '用户ID'
  })
  id: number

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
    comment: '用户姓名',
    validate: {
      is: /^[A-Za-z0-9]{6,}$/
    }
  })
  username: string

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
    comment: '用户邮箱',
    validate: {
      isEmail: true
    }
  })
  email: string

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
    comment: '用户手机',
    validate: {
      is: /^1[3456789]\d{9}$/
    }
  })
  phone: string

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    comment: '用户密码'
  })
  password: string

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}

export default () => User
