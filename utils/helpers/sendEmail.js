const nodemailer = require('nodemailer')
const MailGen = require('mailgen')

const sendEmail=async(subject,send_to,template,reply_to,cc)=>{
    try {
        const transporter=nodemailer.createTransport({
            service:'gmail',
            host:process.env.GMAIL_HOST,
            port:587,
            auth:{
                user:process.env.GMAIL_USER,
                pass:process.env.GMAIL_PASSWORD
            }
        })

       // Configure mailgen by setting a theme and product info
    const mailGenerator = new MailGen({
        theme: 'neopolitan',
        product: {
        name: 'EcommerceApp',
        link: 'www.google.com'
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
         }
    });
    const emailTemplate = mailGenerator.generate(template);
    require('fs').writeFileSync('EmailTemplate.html', emailTemplate, 'utf8');

    

    const options={
        from:process.env.GMAIL_USER,
        to:send_to,
        replyTo:reply_to,
        subject,
        html:emailTemplate,
        cc
    }
    //Send Mail
    transporter.sendMail(options,function(err,info){
        if(err)console.log("err",err)
        else console.log("Success",info)
    })
        
    } catch (error) {
        console.log("Error",error);        
    }
}

module.exports=sendEmail;