const {MailtrapClient} = require('mailtrap');
const { mailtrapClient, sender } = require('./mailtrapConfig');
const {VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} = require ('./emailTemplate.js')


exports.sendVerificationEmail = async (email,verificationToken) => {
    const client = [{email}]

    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : client,
            subject : "verify Your Email",
            html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category : "email verification"
        })
        console.log("Email sent successfully", response);
        
    } catch (error) {
        console.error(`error sending verification`, error);
        
        throw new Error(`error sending email: ${error}`)
    }
}

exports.sendWelcomeEmail = async (email,name) => {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            // template_uuid: "aa8bd331-6f4d-4390-8b46-7bf004d7466d",
            template_uuid: "c6ef75e3-2e51-43d3-bcf4-b02ddbfc45fe",
            template_variables: {
              company_info_name : "DONJAY AUTOS NG",
              name : name,

        }})
        console.log("welcome email sent", response);
        
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error("Error sending welcome email", error);
        
        
    }
}

exports.sendResetSuccessEmail = async (email) =>{
    const recipient = [{ email}];

    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject : "password reset successfully",
            html : PASSWORD_RESET_SUCCESS_TEMPLATE,
            category : "password reset"
        })
    } catch (error) {
        console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	
        
        
    }

}

exports.sendPasswordResetEmail = async (email , resetURL) => {
    const recipient = [{email}]
    try {
       const response = await mailtrapClient.send({
        from : sender,
        to : recipient,
        subject : 'Reset Your Password',
        html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
        category : "password reset"
       })
    } catch (error) {
        console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	
        
    }
}