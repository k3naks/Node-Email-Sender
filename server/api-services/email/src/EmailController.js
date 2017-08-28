const nodemailer = require('nodemailer')
const EmailSender = require('../../../../helpers/email')
const config = require('../../../../config')
const path = require('path')

/**
 * @class EmailController
 */
class EmailController {

    constructor() {
       this._emailSender = new EmailSender(config.get('emailConfig'))
    }

    sendEmail(req, res, next) {
        this._emailSender
            .send({
                to: req.body.to,
                subject: req.body.subject,
                body: req.body.body,
                attachments: req.files.map(function (file) {
                    return {filename: file.originalname, path: path.join('uploads', file.filename)}
                }),
                callback: function (err, info) {
                    if (err) res.status(500).json({errorMessage: 'Error while sending email: ' + err.message})
                    res.send(info)
                }
            })
    }

}

module.exports = EmailController
