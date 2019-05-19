import { CulqiSDK } from "../culqi-sdk";
import * as request from 'request';

export class APIRequest {

  private baseUrl_: string;
  private appInternal: CulqiSDK;
  private privateHeader: object;
  private publicHeader: object;

  constructor(app: CulqiSDK) {
    this.appInternal = app;
    this.baseUrl_ = 'https://secure.culqi.com/v2';

    this.publicHeader = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.appInternal.options.publicKey,
    };

    this.privateHeader = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.appInternal.options.secretKey
    };
  }

  private apiCall(url: string, method: string, headers: {}, body: {}) {
    return new Promise((resolve, reject) => {
      return request({
        url,
        method,
        headers,
        json: true,
        body
      }, (error: any, response: request.Response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response.body);
      });
    });
  }

  public post(service: string, params: Object, publicHeader: boolean = true) {
    try {
      return this.apiCall(
        this.baseUrl_ + service,
        'POST',
        publicHeader ? this.publicHeader : this.privateHeader,
        params
      )
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  public get(service: string, publicHeader: boolean = true) {
    try {
      return this.apiCall(
        this.baseUrl_ + service,
        'GET',
        publicHeader ? this.publicHeader : this.privateHeader,
        null
      );
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  get baseUrl() {
    return this.baseUrl_;
  }
}