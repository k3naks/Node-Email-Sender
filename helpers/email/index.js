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
     * Send email
     * @param to
     * @param subject
     * @param body
     */
    send({to, subject, body, callback}) {
        let message = {to , subject, text: body}
        this._transporter.sendMail(message, (error, info) => {
            if (error) {
                if (callback) {
                    callback(error)
                }
                console.log('Error occurred');
                console.log(error.message);
                return;
            }
            console.log('Message sent successfully!');
            console.log('Server responded with "%s"', info.response);
            if (callback) {
                callback(null, 'Message has been sent!')
            }
            this._transporter.close();
        })
    }

}

module.exports = EmailSender