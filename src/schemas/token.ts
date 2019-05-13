import * as Joi from '@hapi/joi';

export const createTokenSchema = Joi.object({
  card_number: Joi.string().regex(/^\d+$/).min(13).max(16).required(),
  cvv: Joi.string().required(),
  expiration_month: Joi.string().min(1).max(2).required(),
  expiration_year: Joi.string().min(4).max(4).required(),
  email: Joi.string().email().min(5).max(50).required(),
  metadata: Joi.object().optional()
}).required();