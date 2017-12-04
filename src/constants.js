export const BASE_PATH = __DEV__ ? '' : '/reside'
export const LIST_PATH = BASE_PATH + '/projects'
export const ACCOUNT_PATH = BASE_PATH + '/account'
export const USERS_PATH = BASE_PATH + '/users'
export const LOGIN_PATH = BASE_PATH + '/login'
export const SIGNUP_PATH = BASE_PATH + '/signup'
export const ACCOUNT_FORM_NAME = 'account'
export const LOGIN_FORM_NAME = 'login'
export const SIGNUP_FORM_NAME = 'signup'
export const NEW_PROJECT_FORM_NAME = 'newProject'

export const formNames = {
  account: ACCOUNT_FORM_NAME,
  signup: SIGNUP_FORM_NAME,
  login: LOGIN_FORM_NAME
}

export const paths = {
  list: LIST_PATH,
  account: ACCOUNT_PATH,
  login: LOGIN_PATH,
  signup: SIGNUP_PATH,
  users: USERS_PATH
}

export default { ...paths, ...formNames }
