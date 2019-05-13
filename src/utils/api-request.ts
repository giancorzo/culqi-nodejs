import { CulqiSDK } from "../culqi-sdk";
import Axios from 'axios';

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
      'X-API-VERSION': '2',
      'X-API-KEY': this.appInternal.options.publicKey,
      'X-CULQI-ENV': 'live'
    };

    this.privateHeader = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.appInternal.options.secretKey
    };
  }

  public async post(service: string, params: Object, publicHeader: boolean = true) {

    try {
      const res = await Axios.post(this.baseUrl_ + service, params, {
        headers: publicHeader ? this.publicHeader : this.privateHeader
      });

      // const res = await superAgent.post(service)
      //   .use(prefix)
      //   .set('Content-Type','application/json')
      //   .set('X-API-KEY','123Prueba')
      //   .set('Authorization', publicHeader ? this.publicHeader : this.privateHeader)
      //   .send(params);
      return res;

    } catch (e) {
      console.log(e);
    }
    return null;
  }

  get baseUrl() {
    return this.baseUrl_;
  }
}