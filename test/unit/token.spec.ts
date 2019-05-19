'use strict';

import * as _ from 'lodash';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as mocks from '../resources/mocks';
import { CulqiSDK } from '../../src/culqi-sdk';
import { mockPost } from '../resources/request-intercepting';

chai.should();
chai.use(chaiAsPromised);
const expect = chai.expect;

interface tokenCreateData {
  object: string;
}

describe('Token Unit testing', () => {

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
      mockPost(200, '/tokens', {
        data: {
          "object": "token",
          "type": "card",
          "email": "test@test.com",
          "card_number": "411111******1111",
          "last_four": "1111",
          "active": true
        }
      });

      culqiSDK
        .token()
        .create(mocks.validCreateTokenParams)
        .then((data: tokenCreateData) => {
          expect(data.object, 'token');
        });

    });
  });

});