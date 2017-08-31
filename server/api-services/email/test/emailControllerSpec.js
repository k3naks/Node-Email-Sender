let request = require("request");

let base_url = "http://localhost:8081"

describe("Testing Mail Sender", function() {
    describe("POST /email/send", function() {
        it("checks success sending", function(done) {
            let formData = {
                to: 'yshybeka@exadel.com',
                subject: 'Test Mail',
                body: 'It is just a test mail from Jasmine',
            }
            request.post({url: base_url + '/email/send', formData: formData}, function(error, response, body) {
                expect(error).toBeNull()
                expect(response.statusCode).toBe(200)
                expect(body).toBe('{\"message\":\"Message has been sent.\"}')
                done()
            })
        })

        it("checks missed field sending", function(done) {
            let formData = {
                body: 'It is just a test mail from Jasmine'
            }
            request.post({url: base_url + '/email/send', formData: formData}, function(error, response, body) {
                expect(error).toBeNull()
                expect(response.statusCode).toBe(400)
                done()
            })
        })
    });
});
