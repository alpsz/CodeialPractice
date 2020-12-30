const nodemailer = require('nodemailer');
const env = require('../config/environment');

let transporter = nodemailer.createTransport(
     env.smtp
);


module.exports = transporter;