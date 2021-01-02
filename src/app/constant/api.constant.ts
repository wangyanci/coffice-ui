import { Api } from '../models/api.model';

export const API: Api = {
  APISERVER_LOGIN: '/login',
  APISERVER_AUTH: '/v1/auth',
  APISERVER_USERNAME_IS_EXIST: '/v1/users/:name',

  WEB_USER: '/user',
  WEB_LOGIN: '/login',
};

export const AUTHHEADER = 'X-Auth-Token';
export const INGOREAUTHORIZATION = [
  'login',
  'logout',
  'config',
  '/v1/auth',
  '/v1/users/:name',
];
// export const INGOREAUTHORIZATION = [];
