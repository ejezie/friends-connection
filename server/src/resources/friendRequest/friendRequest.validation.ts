import Joi from "joi";

const sendRequest = Joi.object({
  requestTo: Joi.string().required(),
});

const acceptRequest = Joi.object({
  rid: Joi.string().required(),
  status: Joi.string().required(),
});

export default { sendRequest, acceptRequest };
