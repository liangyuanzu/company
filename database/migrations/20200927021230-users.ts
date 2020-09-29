'use strict'
import { QueryInterface } from 'sequelize'

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface: QueryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize
    await queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: STRING(255),
        allowNull: true,
        unique: true
      },
      email: {
        type: STRING(255),
        allowNull: true,
        unique: true
      },
      phone: {
        type: STRING(255),
        allowNull: true,
        unique: true
      },
      password: {
        type: STRING(255), // varchar(255)
        allowNull: false,
        unique: false
      },
      created_at: {
        type: DATE
      },
      updated_at: {
        type: DATE
      }
    })
  },

  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users')
  }
}
