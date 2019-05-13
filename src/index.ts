
import * as culqiSDK from './default-namespace';

// Only Node.js has a process variable that is of [[Class]] process
const processGlobal = typeof process !== 'undefined' ? process : 0;

if (Object.prototype.toString.call(processGlobal) !== '[object process]') {
  const message = `
======== WARNING! ========

culqi-nodejs parece haber sido instalado en un ambiente no soportado.

Use alguna de la otras librerias de culqi para integrarse:

https://www.culqi.com/docs/#/pagos/inicio
`;
  // tslint:disable-next-line:no-console
  console.error(message);
}

export = culqiSDK;
