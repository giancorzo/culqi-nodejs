const nock = require('nock');

const basePathURL = 'https://secure.culqi.com/v2';

export const mockGet = (status: number, path: string, payload: {} = {}) => {
  nock(basePathURL)
    .get(path)
    .reply(status, payload);
};

export const mockPost = (status: number, path: string, payload: {} = {}) => {
  nock(basePathURL)
    .post(path)
    .reply(status, payload);
};