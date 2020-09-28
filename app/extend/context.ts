interface SuccessType {
  data?: {} | []
  status: number
  msg: string
}

interface ErrorType {
  status: number
  msg: string | []
}

module.exports = {
  success({ data, status = 0, msg = '成功' }: SuccessType): void {
    this.body = {
      code: status,
      msg: msg,
      data: data
    }
  },

  error({ status = 500, msg = '错误' }: ErrorType): void {
    this.body = {
      code: status,
      msg: msg
    }
  }
}
