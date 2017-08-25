/**
 * Created by yshybeka on 8/25/2017.
 */
const Joi = require('joi');
const expressJoi = require('express-joi-validator');

class EmailValidator {

    static getMailTemplate() {
        return expressJoi({
            body: Joi.object().unknown(true).keys({
                to: Joi.string().email().required(),
                subject: Joi.string().required(),
                body: Joi.string().required()
            })
        });
    }
}

module.exports = EmailValidator