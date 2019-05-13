import { CulqiSDK } from "../culqi-sdk";
import * as validator from '../utils/validator';
import { AppErrorCodes, SDKError } from '../utils/error';
import {APIRequest} from '../utils/api-request';
import * as snakeCaseKeys from 'snakecase-keys';
import { createTokenSchema } from '../schemas/token';
import * as Joi from '@hapi/joi';

export interface CreateTokenParams {
  cardNumber: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  email: string;
}

export class TokenService {

  private appInternal_: CulqiSDK;
  private basePath_: string;
  private apiRequest: APIRequest;

  constructor(app: CulqiSDK) {
    if (!validator.isNonNullObject(app) ||
        app.options == undefined ||
        app.options.publicKey == undefined ||
        app.options.secretKey == undefined) {
      throw new SDKError({
        code: AppErrorCodes.INVALID_ARGUMENTS,
        message: 'First argument passed to culqiSDK.token() must be a valid culqiSDK instance.',
      });
    }

    this.appInternal_ = app;
    this.apiRequest = new APIRequest(app);
  }

  public create(params: CreateTokenParams) {

    if (validator.isEmptyKeyObject(params) ||
        Joi.validate(params, createTokenSchema).error !== null) {
      throw new SDKError({
        code: AppErrorCodes.INVALID_ARGUMENTS,
        message: "Invalid arguments"
      });
    }

    this.apiRequest.post('/tokens', params);
  }

  get basePath(): string {
    return this.basePath_;
  }

}