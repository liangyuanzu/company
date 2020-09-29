const Core = require('@alicloud/pop-core')

let transporter
export default {
  // 创建发送短信对象
  createTransporterInstance(ctx: any) {
    if (transporter) return transporter
    const { accessKeyId, secretAccessKey: accessKeySecret } = ctx.app.config.sms
    transporter = new Core({
      accessKeyId,
      accessKeySecret,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25'
    })

    return transporter
  },

  // 创建需要发送的内容
  createSmsInfo(ctx: any, to: string) {
    // 1.生成验证码
    const code = Math.random().toString(16).slice(2, 6).toUpperCase()
    // 2.生成发送内容
    const info = {
      RegionId: 'cn-hangzhou',
      PhoneNumbers: to,
      SignName: '圈聊',
      TemplateCode: 'SMS_204030090',
      TemplateParam: JSON.stringify({ code })
    }
    // 3.保存验证码
    ctx.session.smsCode = {
      code: code,
      expire: Date.now() + 60 * 1000 // 验证码1分钟之后过期
    }

    return info
  },

  async sendSmsCode(ctx: any, to: string) {
    const transporter = this.createTransporterInstance(ctx)
    const info = this.createSmsInfo(ctx, to)

    const requestOption = {
      method: 'POST'
    }

    return new Promise((resolve, reject) => {
      transporter.request('SendSms', info, requestOption).then(
        (result) => {
          resolve(result)
        },
        (ex) => {
          reject(ex)
        }
      )
    })
  },

  verifySmsCode(ctx: any, clientCode: string): void {
    // 1.取出服务端中保存的验证码和过期时间
    const serverCaptcha = ctx.session.smsCode
    let serverCode
    let serverExpire
    try {
      serverCode = serverCaptcha.code
      serverExpire = serverCaptcha.expire
    } catch (e) {
      throw new Error('请重新获取验证码')
    }

    if (Date.now() > serverExpire) {
      throw new Error('验证码已经过期')
    } else if (serverCode !== clientCode) {
      throw new Error('验证码不正确')
    }
    // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
    ctx.session.smsCode = null
  }
}
