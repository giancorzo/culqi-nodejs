import { CulqiSDK } from "../culqi-sdk";
import * as validator from '../utils/validator';
import { AppErrorCodes, SDKError } from '../utils/error';

export class ClientService {

  private appInternal: CulqiSDK;

  constructor(app: CulqiSDK) {
    if (!validator.isNonNullObject(app) ||
        app.options == undefined ||
        app.options.publicKey == undefined ||
        app.options.secretKey == undefined) {
      throw new SDKError({
        code: AppErrorCodes.INVALID_ARGUMENTS,
        message: 'First argument passed to culqiSDK.clients() must be a valid culqiSDK instance.',
      });
    }

    this.appInternal = app;
  }


}