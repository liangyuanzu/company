import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  router.get('/imageCode', controller.util.imageCode)
  router.get('/emailCode', controller.util.emailCode)
  router.get('/smsCode', controller.util.smsCode)

  router.post('/register', controller.user.create)
}
