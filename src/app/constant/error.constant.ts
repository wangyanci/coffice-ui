import { ErrorCode, ErrorMsg } from '../models/error.model';

export const ERRCODE: ErrorCode = {
  K4S_USER_IS_EXIST: 'K4S.4090102101',
  K4S_USER_NOT_FOUND: 'K4S.4040102102',
  K4S_PARAM_INVALID: 'K4S.4000103105',
  K4S_PASSWORD_INVAILD: 'K4S.4000101105',
  K4S_RESOURCE_NOT_FOUND: 'K4S.4042003301',

  WEB_REQUEST_FAILD: 'WEB.5000003301',
  WEB_NETWORK_ERROR: 'WEB.5000003302',
};

export const InfoCode: ErrorCode = {
  WEB_REGIST_SUCCESS: 'WEB.2000101001',
  WEB_LOGIN_SUCCESS: 'WEB.2000101002',
};

export const ERRMSG: ErrorMsg = {
  'S2I.4042003301': '资源未找到!',
  'K4S.4000101105': '认证失败, 用户名或密码错误!',
  'K4S.4090102101': '用户名已存在!',
  'K4S.4040102102': '用户不存在',
  'K4S.4000103105': '请求参数无效',

  'WEB.5000003301': '请求失败!',
  'WEB.5000003302': '网络错误, 请稍后重试!',
};

export const INFO: ErrorMsg = {
  'WEB.2000101001': '注册成功!',
  'WEB.2000101002': '登陆成功!',
};
