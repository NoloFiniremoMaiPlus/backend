const Joi = require('joi');

/* Accept either :
    - Date in ISO format
    - number of weekday */
const dateRangeSchema = Joi.alternatives().conditional(Joi.object({ from : Joi.date().iso()}).unknown(), {
    then : Joi.object({
        from: Joi.date().iso().required(),
        to: Joi.date().iso().min(Joi.ref('from')) // min is used as >=
    }),
    otherwise : Joi.object({
        from: Joi.number().min(0).max(6).integer().required(),
        to: Joi.number().min(Joi.ref('from')).max(6).integer() // min is used as >=
    })
});

module.exports = { dateRangeSchema }