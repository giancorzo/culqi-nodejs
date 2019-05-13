'use strict';

import * as _ from 'lodash';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as mocks from '../resources/mocks';
import { CulqiSDK } from '../../src/culqi-sdk';

chai.should();
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Token Service', () => {

  let culqiSDK: CulqiSDK = null;

  beforeEach(() => {
    culqiSDK = new CulqiSDK();
    culqiSDK.initializeApp(mocks.sdkOptions);
  });

  describe('#create', () => {

    it('should throw error if empty object is provided', () => {
      expect(() => {
        culqiSDK.token().create({});
      }).to.throw('Invalid arguments');
    });

    it('should throw validation error if card number is wrong',() => {
      expect(() => {
        culqiSDK.token().create(mocks.wrongCardNumberTokenParams);
      }).to.throw('Invalid arguments');
    });

    it('should throw validation error if cvv is wrong', () => {
      expect(() => {
        culqiSDK.token().create(mocks.wrongCVVTokenParams);
      }).to.throw('Invalid arguments');
    });

    it('should call culqiSDK with createToken parameters',() => {
      // expect(() => {
      // });
      const token = culqiSDK.token().create(mocks.validCreateTokenParams);
      console.log(token);
    });
  });

});