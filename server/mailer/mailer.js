/**
 * Created by HSO on 10/17/15.
 */
'use strict';
let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'test@4hso.com',
        pass: 'test6420'
    }
});

module.exports = transporter;