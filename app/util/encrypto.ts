import * as crypto from 'crypto'

export default {
  _md5(password) {
    const md5 = crypto.createHash('md5')
    const hash = md5
      .update(password)
      .digest('hex')
    return hash
  },

  encryptText(helper, text: string) {
    text = text + helper.config.keys
    let hash = this._md5(text)
    return hash
  }
}
