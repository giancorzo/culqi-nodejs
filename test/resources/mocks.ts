'use strict';

import {CulqiSDKOptions } from '../../src/culqi-sdk';
import { CreateTokenParams } from '../../src/services/token';

export const sdkOptions: CulqiSDKOptions = {
  publicKey: 'pk_test_LsRBKejzCOEEWOwO',
  secretKey: 'sk_test_uRT4E2S2mH7FLr2p'
};

export const publicKeyEmptySdkOptions: CulqiSDKOptions = {
  publicKey: '',
  secretKey: 'sk_test_uRT4E2S2mH7FLr2p'
}

export const secretKeyEmptySdkOptions: CulqiSDKOptions = {
  publicKey: 'pk_test_LsRBKejzCOEEWOwO',
  secretKey: ''
}

export const validCreateTokenParams = {
  card_number: '4111111111111111',
  cvv: '123',
  expiration_month: '09',
  expiration_year: '2020',
  email: 'gian.corzo@gmail.com'
}

export const wrongCardNumberTokenParams = {
  card_number: 'ABCDASADADADA',
  cvv: '123',
  expiration_month: '09',
  expiration_year: '2020',
  email: 'gian.corzo@gmail.com'
}

export const wrongCVVTokenParams = {
  card_number: '4111111111111111',
  cvv: 123,
  expiration_month: '09',
  expiration_year: '2020',
  email: 'gian.corzo@gmail.com'
}