const nodemailer =require('nodemailer');
const EmailEntry=require("../schema/email")

const { EMAIL, EMAILPaSS  } = require("./server-config");
 

    const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:EMAIL    ,   
    pass: EMAILPaSS  
  }
});
// 

const sendEmail=async(item,userEmail,id)=>{try {


// varify email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValid = emailRegex.test(userEmail.email);
if(isValid===false){
    throw new Error("email is not valid");
  
}

// saveEmail on db
const newEmailEntry=new EmailEntry({email:userEmail.email,productId:id
  
})
 await newEmailEntry.save()

    const { name,  description, coverImage } = item
    console.log(userEmail)
const subject = `Enquiry Received: ${name}`;

const html = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #0052cc;">Thank you for your enquiry, ${name}!</h2>
    <p>We've received your enquiry and will get back to you shortly with more details.</p>
    <h3>Enquiry Summary:</h3>
    <p>${description}</p>
    ${coverImage ? `<img src="${coverImage}" alt="Image related to your enquiry" width="200" style="border-radius: 8px; margin-top: 10px;" />` : ''}
    <p style="margin-top: 20px;">If you have any questions in the meantime, feel free to reply to this email.</p>
    <p>Best regards,<br/>Customer Support Team</p>
  </div>
`;

await transporter.sendMail({
  from: EMAIL,
  to: userEmail.email,
  subject: subject,
  html: html,
});

  const message="email success"
  console.log(message)
  return message
    
} catch (error) {
  console.log("error in nodemailer")
   throw error
    
}



}

module.exports={sendEmail}
