import ImageCode from '../util/imageCode'

module.exports = {
  createImageCode(): string {
    return ImageCode.createImageCode(this.ctx)
  },

  verifyImageCode(clientCode: string): void {
    ImageCode.verifyImageCode(this.ctx, clientCode)
  }
}
