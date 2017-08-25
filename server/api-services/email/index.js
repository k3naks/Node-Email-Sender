/**
 * Created by yshybeka on 8/25/2017.
 */
const EmailController = require('./src/EmailController')
const controller = new EmailController()
const EmailValidator = require('./src/EmailValidator')

module.exports = {controller, EmailValidator}