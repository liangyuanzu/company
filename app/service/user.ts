import { Service } from 'egg'

export default class User extends Service {
  public async createUser({ username, email, phone, password }) {
    if (username) {
      return await this.createUserByUserName(username, password)
    } else if (email) {
      return await this.createUserByEmail(email, password)
    } else if (phone) {
      return await this.createUserByPhone(phone, password)
    }
  }

  private async createUserByUserName(username: string, password: string) {
    const user = await this.findUser({ username })
    if (user as any) {
      throw new Error('当前用户已存在')
    }

    password = this.ctx.helper.encryptText(password)
    const data = await this.ctx.model.User.create({
      username,
      password
    })
    return data['dataValues']
  }

  private async createUserByEmail(email: string, password: string) {
    const user = await this.findUser({ email })
    if (user as any) {
      throw new Error('当前用户已存在')
    }

    password = this.ctx.helper.encryptText(password)
    const data = await this.ctx.model.User.create({
      email,
      password
    })
    return data['dataValues']
  }

  private async createUserByPhone(phone: string, password: string) {
    const user = await this.findUser({ phone })
    if (user as any) {
      throw new Error('当前用户已存在')
    }

    password = this.ctx.helper.encryptText(password)
    const data = await this.ctx.model.User.create({
      phone,
      password
    })
    return data['dataValues']
  }

  private async findUser(options) {
    return await this.ctx.model.User.findOne({ where: options })
  }
}
