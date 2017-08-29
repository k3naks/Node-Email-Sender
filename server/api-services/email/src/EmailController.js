const nodemailer = require('nodemailer')
const EmailSender = require('../../../../helpers/email')
const config = require('../../../../config')

/**
 * @class EmailController
 */
class EmailController {

    constructor() {
        this._emailSender = new EmailSender(config.get('emailConfig'))
    }

    sendEmail(req, res, next) {
        this._emailSender
            .send(this._emailSender.formMessage(req))
            .then(result => {
                res.status(200).json({message: result})
            })
            .catch(error => {
                res.status(500).json({errorMessage: error.message})
            })

    }

}

module.exports = EmailController
