import { CulqiSDK } from "../culqi-sdk";
import * as validator from '../utils/validator';
import { AppErrorCodes, SDKError } from '../utils/error';
import {APIRequest} from '../utils/api-request';
import { createTokenSchema, listTokenSchema } from '../schemas/token';
import * as Joi from '@hapi/joi';

export interface CreateTokenParams {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;
}

export interface ListTokenParams {
  creation_date: string;
  creation_date_to: string;
  card_brand: string; // Visa, Mastercard, Amex, Diner
  card_type: string; // credito, debito, prepagada
  device_type: string; // escritorio, movil, tablet
  bin: string;
  country_code: string;
  limit: string; // 1 - 100
  before: string;
  after: string;
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

    return this.apiRequest.post('/tokens', params);
  }

  public get(id: string) {

    if (!validator.isNonEmptyString(id)) {
      throw new SDKError({
        code: AppErrorCodes.INVALID_ARGUMENTS,
        message: 'Invalid Arguments'
      });
    }

    return this.apiRequest.get(`/tokens/${id}`,false);
  }

  public list(params: ListTokenParams) {

    if (Joi.validate(params, listTokenSchema).error !== null) {
      throw new SDKError({
        code: AppErrorCodes.INVALID_ARGUMENTS,
        message: 'Invalid Arguments'
      });
    }

    return this.apiRequest.get('/tokens',false);
  }

  get basePath(): string {
    return this.basePath_;
  }

}