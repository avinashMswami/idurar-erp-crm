const Joi = require('joi');

module.exports = Joi.object({
  customerName: Joi.string().required(), // ObjectId (as string)
  description: Joi.string().required(),
  status: Joi.string().valid('Open', 'InProgress', 'Closed').optional(),
  resolution: Joi.string().max(100).optional(),
  notes: Joi.array().items(
    Joi.object({
      text: Joi.string().required(),
      created: Joi.date().optional(),
    })
  ).optional()
});