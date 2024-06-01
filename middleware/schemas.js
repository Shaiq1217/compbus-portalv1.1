const Joi = require('joi');

class Schema {
  categoryPost = Joi.object({
    name: Joi.string().required().min(5).max(50),
    isDeleted: Joi.boolean().required(),
    description: Joi.object().required()
  });

  categoryPatch = Joi.object({
    name: Joi.string().min(5).max(50),
    description: Joi.object()
  }).or('name', 'description');

  categoryGetDetail = Joi.object({
    id: Joi.string().hex().length(24)
  });
}

const schema = new Schema();
module.exports = schema;
