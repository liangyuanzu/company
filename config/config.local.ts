import { EggAppConfig, PowerPartial } from 'egg'

export default () => {
  const config: PowerPartial<EggAppConfig> = {}
  // 添加sequelize配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    port: 3306,
    database: 'company'
  }

  // Redis相关配置
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0
    }
  }

  // 邮箱相关配置
  config.smtp = {
    host: 'smtp.qq.com',
    port: 465,
    user: 'liangyuanzu@foxmail.com', // 发送邮件的邮箱
    pass: `bnwlqlfvlszvdieh` // 邮箱对应的授权码
  }

  // 短信相关配置
  config.sms = {
    accessKeyId: '*******************',
    secretAccessKey: '*********************'
  }

  // 禁用CSRF安全校验
  config.security = {
    csrf: {
      enable: false
    }
  }

  return config
}
