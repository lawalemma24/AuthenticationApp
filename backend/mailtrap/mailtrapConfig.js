const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv");


dotenv.config()




exports.mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,endpoint : process.env.MAILTRAP_ENDPOINT
});

exports.sender = {
  email: "hello@demomailtrap.com",
  name: "DONJAY Test",
};
