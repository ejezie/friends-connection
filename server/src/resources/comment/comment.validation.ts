import Joi from "joi";

const create = Joi.object({
  comment: Joi.string().required(),
  postId: Joi.string().required(),
});

const reply = Joi.object({
  comment: Joi.string().required(),
  commentId: Joi.string().required(),
});

export default { create, reply };
