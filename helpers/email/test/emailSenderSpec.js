/**
 * Created by yshybeka on 8/31/2017.
 */
const config = require('../../../config')
const EmailSender = require('../')

let sender = new EmailSender(config.get('emailConfig'))

describe("Testing Email Sender Service", function () {
    it("checks success sending", done => {
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
    it('check error', done => {
        let formData = {
            subject: 'Test Mail Service',
            body: 'It is just a test mail from Service sender Jasmine ',
        }
        sender.send(formData)
            .then(res => {
                done()
            })
            .catch(err => {
                expect(err.message).toBe('Error occurred while sending email: No recipients defined')
                done()
            })
    })
    it('check transformation of request',(done) => {
        let req = {
            body: {
                to: 'test',
                subject: 'TTTT',
                body: 'ASSA'
            },
            files: [{originalname: 'test', buffer: 'WWWWW'}, {originalname: 'bbb', buffer: 'TTTTT'}]
        }
        expect(sender.formMessage(req)).toEqual({
            to: 'test',
            subject: 'TTTT',
            body: 'ASSA',
            attachments: [{filename: 'test', content: 'WWWWW'}, {filename: 'bbb', content: 'TTTTT'}]
        })
        done()
    })
})
