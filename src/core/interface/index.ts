export enum UserRole {
  undefined,
  customer,
  lawyer,
}

export enum UserStatus {
  notValidate,
  penddingVarify,
  validated,
}

export interface IRequestResponse<T> {
  statusCode?: number;
  data: T;
  message?: string;
}

export interface IWeixinAuth {
  openid: string;
  errorcode: string;
  errmsg: string;
  session_key: string;
  unionid: string;
}

export interface IWeixinToken {
  access_token: string;
}

export interface IUserBaseInfo {
  status?: number;
  role?: number;
  phone?: number;
  realname?: string;
  profile?: unknown | string;
}
