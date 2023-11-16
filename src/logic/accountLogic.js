import Joi from "joi"

export const validateRegistrationForm = (req) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        last_name: Joi.string().required(),
        identification: Joi.string().required(),
        phone: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        rol: Joi.number().integer().required()
    })
    return schema.validate(req.body);
}