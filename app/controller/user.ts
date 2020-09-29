import { Controller } from 'egg'
import NormalUserRule from '../validate/normalUserRule'
import EmailUserRule from '../validate/emailUserRule'
import PhoneUserRule from '../validate/phoneUserRule'

const enum RegisterTypeEnum {
  Normal = 'normal',
  Email = 'email',
  Phone = 'phone'
}

export default class UserController extends Controller {
  public async create() {
    const { ctx } = this
    try {
      // 校验数据和验证码
      this.validateUserInfo()
      //  将校验通过的数据保存到数据库
      const data = await ctx.service.user.createUser(ctx.request.body)
      ctx.success({ data, msg: '注册成功' })
    } catch (e) {
      if (e.errors) {
        ctx.error({ status: 400, msg: e.errors })
      } else {
        ctx.error({ status: 400, msg: e.message })
      }
    }
  }

  private validateUserInfo() {
    const { ctx } = this
    const data = ctx.request.body
    const registerType = data.registerType
    switch (registerType) {
      case RegisterTypeEnum.Normal:
        // 校验数据的格式是否正确
        ctx.validate(NormalUserRule, data)
        // 校验当前的验证码是否正确
        ctx.helper.verifyImageCode(data.captcha)
        break
      case RegisterTypeEnum.Email:
        ctx.validate(EmailUserRule, data)
        ctx.helper.verifyEmailCode(data.captcha)
        break
      case RegisterTypeEnum.Phone:
        ctx.validate(PhoneUserRule, data)
        ctx.helper.verifySmsCode(data.captcha)
        break
      default:
        throw new Error('注册类型不存在')
    }
  }
}
