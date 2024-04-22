import Joi from "joi";

const create = Joi.object({
  description: Joi.string().required(),
  image: Joi.string().optional(),
});

export default { create };
