import { ensureLoggedIn } from 'connect-ensure-login'

const basic = () => ensureLoggedIn()

export default {
  basic
}
