import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  router.post('/register', controller.user.create)
  router.get('/captcha', controller.util.imageCode)
  router.get('/captcha', controller.util.imageCode)
  router.get('/verify', controller.util.verifyImageCode);
}
