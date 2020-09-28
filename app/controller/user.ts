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
      this.validateUserInfo()
      ctx.success({ msg: '注册成功' })
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
        break
      case RegisterTypeEnum.Phone:
        ctx.validate(PhoneUserRule, data)
        break
      default:
        throw new Error('注册类型不存在')
    }
  }
}
