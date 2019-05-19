import * as Joi from '@hapi/joi';

export const createTokenSchema = Joi.object({
  card_number: Joi.string().regex(/^\d+$/).min(13).max(16).required(),
  cvv: Joi.string().required(),
  expiration_month: Joi.string().min(1).max(2).required(),
  expiration_year: Joi.string().min(4).max(4).required(),
  email: Joi.string().email().min(5).max(50).required(),
  metadata: Joi.object().optional()
}).required();

export const listTokenSchema = Joi.object({
  creation_date: Joi.date().timestamp('unix'),
  creation_date_to: Joi.date().timestamp('unix'),
  card_brand: Joi.string().valid('Visa','Mastercard','Amex','Diner'),
  card_type: Joi.string().valid('credito','debito','prepagada'),
  device_type: Joi.string().valid('escritorio','movil','tablet'),
  bin: Joi.string(),
  country_code: Joi.string(),
  limit: Joi.string(),
  before: Joi.string(),
  after: Joi.string()
});