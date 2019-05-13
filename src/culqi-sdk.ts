import * as validator from './utils/validator';
import { AppErrorCodes, SDKError } from './utils/error';

export interface CulqiSDKOptions {
  publicKey: string;
  secretKey: string;
}

export class CulqiSDK {

  private options_: CulqiSDKOptions;

  public initializeApp(options?: CulqiSDKOptions): CulqiSDK {

    this.options_ = options;

    if (!validator.isNonNullObject(options)) {
      throw new SDKError({
        code: AppErrorCodes.INVALID_SDK_OPTIONS,
        message: 'Invalid initialization parameters'
      });
    }

    if (!validator.isNonEmptyString(options.publicKey)) {
      throw new SDKError({
        code: AppErrorCodes.INVALID_SDK_OPTIONS,
        message: 'Invalid initialization parameters: Public key cannot be empty'
      });
    }

    if (!validator.isNonEmptyString(options.secretKey)) {
      throw new SDKError({
        code: AppErrorCodes.INVALID_SDK_OPTIONS,
        message: 'Invalid initialization parameters: Secret key cannot be empty'
      });
    }
    return this;
  }

  public token() {
    const TokenService = require('./services/token').TokenService;
    return new TokenService(this);
  }

  public charges() {
    const ChargeService = require('./services/charge').ChargeService;
    return new ChargeService(this);
  }

  public cards() {
    const CardService = require('./services/card').CardService;
    return new CardService(this);
  }

  public clients() {
    const ClientService = require('./services/client').ClientService;
    return new ClientService(this);
  }

  public plans() {
    const PlanService = require('./services/plan').PlanService;
    return new PlanService(this);
  }

  public subscriptions() {
    const SubscriptionService = require('./services/subscription').SubscriptionService;
    return new SubscriptionService(this);
  }

  public orders() {
    const OrderService = require('./services/order').OrderService;
    return new OrderService(this);
  }

  get options(): CulqiSDKOptions {
    return {...this.options_} as CulqiSDKOptions;
  }

}