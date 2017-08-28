/**
 * Created by yshybeka on 8/25/2017.
 */
const express = require('express')
const path = require('path')
const multer  = require('multer')

const {controller, EmailValidator} = require('../server/api-services/email')

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.route('/send')
    .post(upload.array('attachments'), EmailValidator.getMailTemplate(), controller.sendEmail.bind(controller))

module.exports = router
