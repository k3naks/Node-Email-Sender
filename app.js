const express = require('express')
const app = express()

app.use('/email', require('./routers/email'))

app.listen(8081, function () {
    console.log('Application listening on port ' + 8081)
})

app.use(function (err, req, res, next) {
    if (err.isBoom) {
        return res.status(err.output.statusCode).json(err.output.payload)
    }
})

