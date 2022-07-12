const API_KEY = 'b251b1a6e59db235e2f7940071c9698a-1b8ced53-7eb0a25b';
const DOMAIN = 'sandboxbdedced17be44bedae5b655b3ec40f83.mailgun.com';

const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: API_KEY});


const messageData = {
  from: 'BookingLet <noreply@bookinglet.com>',
  to: 'yvonne.tangyiyuan@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

client.messages.create(DOMAIN, messageData)
 .then((res) => {
   console.log(res);
 })
 .catch((err) => {
   console.error(err);
 });
