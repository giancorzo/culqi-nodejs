'use strict';

import * as _ from 'lodash';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as mocks from '../resources/mocks';
import { CulqiSDK } from '../../src/culqi-sdk';

chai.should();
chai.use(chaiAsPromised);
const expect = chai.expect;

interface IToken {
  object: string;
  type: string;
  id: string;
}

describe('Token Integration testing', () => {

  let culqiSDK: CulqiSDK = null;

  beforeEach(() => {
    culqiSDK = new CulqiSDK();
    culqiSDK.initializeApp(mocks.sdkOptions);
  });

  describe('#create', () => {
    it('should create a new token', (done) => {
      culqiSDK
        .token()
        .create(mocks.validCreateTokenParams)
        .then((data: IToken) => {
          expect(data.object, 'token');
          expect(data.type,'card');
          done();
        });
    });
  });

  describe('#getToken', () => {
    it('should get a token recently created', (done) => {

      culqiSDK
        .token()
        .create(mocks.validCreateTokenParams)
        .then((token: IToken) => {
          culqiSDK
            .token()
            .get(token.id)
            .then((data: IToken) => {
              expect(token.id, data.id);
              done();
            })
        });

    });
  });

  // NOT SUPPORTED YET!

  // describe('#listTokens', () => {
  //   it('should list all tokens in culqi', (done) => {
  //     culqiSDK
  //       .token()
  //       .list()
  //       .then((tokens: Array<IToken>) => {
  //         console.log(tokens);
  //         done();
  //       });
  //   });
  // });

});