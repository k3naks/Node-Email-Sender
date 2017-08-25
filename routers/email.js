/**
 * Created by yshybeka on 8/25/2017.
 */
const express = require('express')
const bodyParser = require('body-parser')

const {controller, EmailValidator} = require('../server/api-services/email')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))

router.route('/send').post(EmailValidator.getMailTemplate(), controller.sendEmail)

module.exports = router
