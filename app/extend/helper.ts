import ImageCode from '../util/imageCode'
import EmailCode from '../util/emailCode'

module.exports = {
  createImageCode(): string {
    return ImageCode.createImageCode(this.ctx)
  },

  verifyImageCode(clientCode: string): void {
    ImageCode.verifyImageCode(this.ctx, clientCode)
  },

  async sendEmailCode(to: string) {
    return await EmailCode.sendEmailCode(this.ctx, to)
  },

  verifyEmailCode(clientCode: string): void {
    EmailCode.verifyEmailCode(this.ctx, clientCode)
  }
}
