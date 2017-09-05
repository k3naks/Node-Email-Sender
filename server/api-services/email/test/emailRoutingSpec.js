const request = require("request");
const fs = require('fs');
const app = require('../../../../app');

let base_url = "http://localhost:8081"

describe("Testing Mail Sender Controller", () => {

    describe("POST /email/send", () => {
        it("checks success sending without attachments", done => {
            let formData = {
                to: 'yshybeka@exadel.com',
                subject: 'Test Mail',
                body: 'This test message without attachments'
            }
            request.post({
                url: base_url + '/email/send',
                formData: formData
            }, (error, response, body) => {
                expect(error).toBeNull()
                expect(response.statusCode).toBe(200)
                expect(body).toBe('{\"message\":\"Message has been sent.\"}')
                done()
            })
        })

        it("checks success sending with attachments", done => {
            let formData = {
                to: 'yshybeka@exadel.com',
                subject: 'Test Mail',
                body: 'This test message with attachments',
                attachments: [fs.createReadStream(__dirname + '/attach.txt')]
            }

            request.post({
                url: base_url + '/email/send',
                formData: formData
            },  (error, response, body) => {
                expect(error).toBeNull()
                expect(response.statusCode).toBe(200)
                expect(body).toBe('{\"message\":\"Message has been sent.\"}')
                done()
            })
        })

        it("checks missed field sending", done=> {
            let formData = {
                body: 'It is just a test mail from Jasmine'
            }
            request.post({url: base_url + '/email/send', formData: formData}, (error, response, body) => {
                expect(error).toBeNull()
                expect(response.statusCode).toBe(400)
                done()
            })
        })
    });
});
