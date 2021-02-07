const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

// sgMail.send({
//     to: 'shikhar.17456@knit.ac.in',
//     from: 'noreplydemo91@gmail.com',
//     subject: 'Sendgrid Testing',
//     text: 'Finally... Successful'
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'noreplydemo91@gmail.com',
        subject: 'Welcome to the Task App',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })

}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email, 
        from: 'noreplydemo91@gmail.com',
        subject: 'Account Cancellation Confirmation',
        text: `Hello ${name}, We are curious to know about why you did not like our service. And what we could have improved on to keep you onboard. Feel free to reply.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}