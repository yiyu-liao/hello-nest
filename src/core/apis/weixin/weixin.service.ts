import { Injectable } from '@nestjs/common';
import $axios from 'axios';

const BaseUrl = 'https://api.weixin.qq.com';
import config from '@src/config';

import {
  IWeixinAuth,
  IWeixinToken,
  IRequestResponse,
} from '@src/core/interface';

@Injectable()
export class WeixinService {
  async authCode2Session(
    js_code: string,
  ): Promise<IRequestResponse<any>> {
    const url = `${BaseUrl}/sns/jscode2session`;
    return $axios.get(url, {
      params: {
        grant_type: 'authorization_code',
        appid: config.weixin.appid,
        secret: config['weixin'].appSecret,
        js_code,
      },
    });
  }

  async getAccessToken(): Promise<IRequestResponse<IWeixinToken>> {
    const url = `${BaseUrl}/cgi-bin/token`;
    return $axios.get(url, {
      params: {
        grant_type: 'client_credential',
        appid: config.weixin.appid,
        secret: config.weixin.appSecret,
      },
    });
  }
}
