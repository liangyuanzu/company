const nodemailer = require('nodemailer')

let transporter
export default {
  // 创建发送邮件对象
  createTransporterInstance(ctx: any) {
    if (transporter) return transporter
    const { host, port, user, pass } = ctx.app.config.smtp
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: {
        user, // 发送邮件的邮箱
        pass // 邮箱对应的授权码
      }
    })

    return transporter
  },

  // 创建需要发送的内容
  createEmailInfo(ctx: any, to: string) {
    // 1.生成验证码
    const code = Math.random().toString(16).slice(2, 6).toUpperCase()
    // 2.生成发送内容
    const info = {
      from: 'liangyuanzu@foxmail.com',
      to,
      subject: '「企业级」后台管理系统注册验证码',
      text: `您正在注册「企业级」后台管理系统, 您的验证码是: ${code}`
    }
    // 3.保存验证码
    ctx.session.emailCode = {
      code: code,
      expire: Date.now() + 60 * 1000 // 验证码1分钟之后过期
    }

    return info
  },

  async sendEmailCode(ctx: any, to: string) {
    const transporter = this.createTransporterInstance(ctx)
    const info = this.createEmailInfo(ctx, to)

    return new Promise((resolve, reject) => {
      transporter.sendMail(info, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  },

  verifyEmailCode(ctx: any, clientCode: string): void {
    // 1.取出服务端中保存的验证码和过期时间
    const serverCaptcha = ctx.session.emailCode
    let serverCode
    let serverExpire
    try {
      serverCode = serverCaptcha.code
      serverExpire = serverCaptcha.expire
    } catch (e) {
      throw new Error('请重新获取验证码')
    } finally {
      // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
      ctx.session.emailCode = null
    }

    if (Date.now() > serverExpire) {
      // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
      ctx.session.emailCode = null
      throw new Error('验证码已经过期')
    } else if (serverCode !== clientCode) {
      // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
      ctx.session.emailCode = null
      throw new Error('验证码不正确')
    }
    // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
    ctx.session.emailCode = null
  }
}
