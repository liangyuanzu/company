import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  // 开启sequelize-typescript
  sequelize: {
    enable: true,
    package: 'egg-sequelize-ts'
  },

  // 开启前端数据校验
  validate: {
    enable: true,
    package: 'egg-validate'
  }
}

export default plugin
