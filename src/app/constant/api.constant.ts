import { Api } from '../models/api.model'

export const API: Api = {
  APISERVER_LOGIN: "/login",
  APISERVER_AUTH: "/v1/auth",

  WEB_USER: "/user",
  WEB_LOGIN: "/login",
}

export const AUTHHEADER = 'X-Auth-Token'
export const INGOREAUTHORIZATION = ['login', 'logout', 'config', '/v1/auth'];
// export const INGOREAUTHORIZATION = [];
