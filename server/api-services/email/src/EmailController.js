const nodemailer = require('nodemailer')
const EmailSender = require('../../../../helpers/email')
const config = require('../../../../config')

/**
 * @class EmailController
 */
class EmailController {

    constructor() {

    }

    sendEmail(req, res, next) {
        new EmailSender(config.get('emailConfig'))
            .send({
                to: req.body.to,
                subject: req.body.subject,
                body: req.body.body,
                callback: function (err, info) {
                    if (err) res.status(500).json({errorMessage: 'Error while sending email: ' + err.message})
                    res.send(info)
                }
            })
    }

}

module.exports = EmailController
