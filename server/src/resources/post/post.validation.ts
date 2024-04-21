import Joi from "joi";

const create = Joi.object({
  description: Joi.string().required(),
});

export default { create };
