'use strict';

import * as _ from 'lodash';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as mocks from '../resources/mocks';
import { CulqiSDK } from '../../src/culqi-sdk';

chai.should();
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Culqi SDK', () => {

  let culqiSDK: CulqiSDK = null;

  beforeEach(() => {
    culqiSDK = new CulqiSDK();
  });

  describe('#initializeApp()', () => {
    const invalidOptions: any[] = [null, NaN, 0, 1, true, false, '', 'a', [], _.noop];
    invalidOptions.forEach((invalidOption: any) => {
      it('should throw given invalid options object: ' + JSON.stringify(invalidOption), () => {
        expect(() => {
          culqiSDK.initializeApp(invalidOption);
        }).to.throw('Invalid initialization parameters');
      });
    });

    it('should not modify the provided options object', () => {
      const optionsClone = _.clone(mocks.sdkOptions);
      culqiSDK.initializeApp(mocks.sdkOptions);
      expect(optionsClone).to.deep.equal(mocks.sdkOptions);
    });

    it('should throw given empty options object', () => {
      expect(() => {
        culqiSDK.initializeApp(mocks.publicKeyEmptySdkOptions);
      }).to.throw('Invalid initialization parameters: Public key cannot be empty');

      expect(() => {
        culqiSDK.initializeApp(mocks.secretKeyEmptySdkOptions);
      }).to.throw('Invalid initialization parameters: Secret key cannot be empty');

    });

    it('should have a property public key in options object', () => {
      const app = culqiSDK.initializeApp(mocks.sdkOptions);
      expect(app.options).to.have.property('publicKey');
    });

    it('should have a property secret key in options object', () => {
      const app = culqiSDK.initializeApp(mocks.sdkOptions);
      expect(app.options).to.have.property('secretKey');
    });

  });

  describe('#tokens()', () => {
    it('should throw error if the app has not be initialized', () => {
      expect(() => {
        return culqiSDK.token();
      }).to.throw('First argument passed to culqiSDK.token() must be a valid culqiSDK instance.');
    });

    it('should return the token service', () => {
      culqiSDK.initializeApp(mocks.sdkOptions);
      expect(() => {
        return culqiSDK.token();
      }).not.to.throw();
    });
  });

  describe('#charges()', () => {
    it('should throw error if the app has not be initialized', () => {
      expect(() => {
        return culqiSDK.charges();
      }).to.throw('First argument passed to culqiSDK.charges() must be a valid culqiSDK instance.');
    });

    it('should return the charges service', () => {
      culqiSDK.initializeApp(mocks.sdkOptions);
      expect(() => {
        return culqiSDK.charges();
      }).not.to.throw();
    });
  });

  describe('#clients()', () => {
    it('should throw error if the app has not be initialized', () => {
      expect(() => {
        return culqiSDK.clients();
      }).to.throw('First argument passed to culqiSDK.clients() must be a valid culqiSDK instance.');
    });

    it('should return the charges service', () => {
      culqiSDK.initializeApp(mocks.sdkOptions);
      expect(() => {
        return culqiSDK.clients();
      }).not.to.throw();
    });
  });

  describe('#cards()', () => {
    it('should throw error if the app has not be initialized', () => {
      expect(() => {
        return culqiSDK.cards();
      }).to.throw('First argument passed to culqiSDK.cards() must be a valid culqiSDK instance.');
    });

    it('should return the charges service', () => {
      culqiSDK.initializeApp(mocks.sdkOptions);
      expect(() => {
        return culqiSDK.cards();
      }).not.to.throw();
    });
  });

  describe('#plans()', () => {
    it('should throw error if the app has not be initialized', () => {
      expect(() => {
        return culqiSDK.plans();
      }).to.throw('First argument passed to culqiSDK.plans() must be a valid culqiSDK instance.');
    });

    it('should return the charges service', () => {
      culqiSDK.initializeApp(mocks.sdkOptions);
      expect(() => {
        return culqiSDK.plans();
      }).not.to.throw();
    });
  });

  describe('#subscriptions()', () => {
    it('should throw error if the app has not be initialized', () => {
      expect(() => {
        return culqiSDK.subscriptions();
      }).to.throw('First argument passed to culqiSDK.subscriptions() must be a valid culqiSDK instance.');
    });

    it('should return the charges service', () => {
      culqiSDK.initializeApp(mocks.sdkOptions);
      expect(() => {
        return culqiSDK.subscriptions();
      }).not.to.throw();
    });
  });

  describe('#orders()', () => {
    it('should throw error if the app has not be initialized', () => {
      expect(() => {
        return culqiSDK.orders();
      }).to.throw('First argument passed to culqiSDK.orders() must be a valid culqiSDK instance.');
    });

    it('should return the charges service', () => {
      culqiSDK.initializeApp(mocks.sdkOptions);
      expect(() => {
        return culqiSDK.orders();
      }).not.to.throw();
    });
  });

});
