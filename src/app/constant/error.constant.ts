import { ErrorCode, ErrorMsg } from '../models/error.model';

export const ERRCODE: ErrorCode = {
  K4S_PASSWORD_INVAILD: 'K4S.4000101005',
  K4S_RESOURCE_NOT_FOUND: 'K4S.4042003301',
  K4S_USER_NAME_IS_EXIST: 'K4S.4090102001',

  WEB_REQUEST_FAILD: 'WEB.5000003301',
  WEB_NETWORK_ERROR: 'WEB.5000003302',
};

export const ERRMSG: ErrorMsg = {
  'S2I.4042003301': '资源未找到!',
  'K4S.4000101005': '认证失败, 用户名或密码错误!',
  'K4S.4090102001': '用户名已存在!',

  'WEB.5000003301': '请求失败!',
  'WEB.5000003302': '网络错误, 请稍后重试!',
};
