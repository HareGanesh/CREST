const sendMail= function(msgBody)
{
	console.log("Mail body" + msgBody);
		// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "amitkhandelwal.eca@gmail.com",
       pass: ""// to passowrd access
   }
});
// setup email data with unicode symbols
let mailOptions = {
    from: 'amitkhandelwal.eca@gmail.com', // sender address
    to: 'amitkhandelwal.eca@gmail.com', // list of receivers
    subject: 'CREST TEST MAIL ', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message  sent: %s', info.messageId, info.response);
});
};