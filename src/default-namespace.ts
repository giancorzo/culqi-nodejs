import { CulqiSDK } from './culqi-sdk';

const culqiSDK = new CulqiSDK();

// Inject a circular default export to allow users to use both:
//
//   import culqiSDK from 'culqi-nodejs';
//   which becomes: var firebaseAdmin = require('firebase-admin').default;
//
// as well as the more correct:
//
//   import * as firebaseAdmin from 'firebase-admin';
//   which becomes: var firebaseAdmin = require('firebase-admin');
(culqiSDK as any).default = culqiSDK;

export = culqiSDK;
