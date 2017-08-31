/**
 * Created by yshybeka on 8/31/2017.
 */
const config = require('../../../config')
const EmailSender = require('../')

let sender = new EmailSender(config.get('emailConfig'))

describe("Testing Email Sender Service", function () {
    it("checks success sending", function (done) {
        let formData = {
            to: 'yshybeka@exadel.com',
            subject: 'Test Mail Service',
            body: 'It is just a test mail from Service sender Jasmine ',
        }
        sender.send(formData).then(res => {
            expect(res).toBe('Message has been sent.')
            done()
        })
    })
})
