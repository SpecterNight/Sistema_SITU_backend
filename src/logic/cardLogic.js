import Joi from "joi"

export const validateFormatRegisterCard = (card)=>{
    const schema = Joi.object({
        external_id_person: Joi.string().required(),
        code: Joi.string().required()
    })
}