import Joi from "joi"

export const validateBusForm = (req) => {
    const schema = Joi.object({
        seats: Joi.number().required(),
        plate: Joi.string().required(),
    })
    return schema.validate(req.body);
}