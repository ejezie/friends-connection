import Joi from 'joi';

const register = Joi.object({
    identifier: Joi.string().required(),
    name: Joi.string().required(),
});

const login = Joi.object({
    identifier: Joi.string().required(),
});

export default {register, login};