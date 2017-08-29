const nodemailer = require('nodemailer')

/**
 * Class for sending emails
 */
class EmailSender {

    /**
     *
     * @param service is a email service name
     * @param username is username for email service
     * @param password is password
     * @param from
     */
    constructor({service, username, password, from}) {
        this._transporter = nodemailer.createTransport({
            service: service,
            auth: {
                user: username,
                pass:  password
            }
        }, {
            from: from
        })
    }

    /**
     * Send Emails
     * @param to recipients
     * @param subject subject of email
     * @param body main text of the mail
     * @param attachments list of attachments
     */
    send({to, subject, body, attachments}) {
        return new Promise((resolve, reject) => {
            this._transporter.sendMail({to, subject, attachments, text: body}, (error, info) => {
                if (error) {
                    console.log('Error occurred')
                    console.log(error.message)
                    reject(new Error('Error occurred while sending email: ' + error.message))
                } else {
                    console.log('Message sent successfully!')
                    console.log('Server responded with "%s"', info.response)
                    resolve('Message has been sent.')
                }
            })
        })
    }


    /**
     * Forms Email message object from HTTP Request
     * @param req HTTP Request
     * @returns {{to: (string), subject: (string), body: (string), attachments: Array}}
     */
    formMessage(req) {
        return {
            to: req.body.to,
            subject: req.body.subject,
            body: req.body.body,
            attachments: req.files.map(file => ({
                filename: file.originalname,
                content: file.buffer
            }))
        }
    }

}

module.exports = EmailSender