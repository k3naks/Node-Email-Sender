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
     * @param from from which email address mail will be sent
     * @param to recipients
     * @param subject subject of email
     * @param body main text of the mail
     * @param attachments list of attachments
     * @param callback function that will be executed after sending mail if specified
     */
    send({from, to, subject, body, attachments, callback}) {
        let message = {from, to, subject, attachments, text: body}
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