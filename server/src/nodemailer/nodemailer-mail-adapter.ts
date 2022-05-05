import { MailAdapter, SendMailData } from "../adapeters/mail-adapter";
import nodemailer from 'nodemailer';
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9565985fa49306",
      pass: "4f2c4d8b658553"
    }
  });
export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject,body}: SendMailData){
           await transport.sendMail({    
        from:'Equipe Feedget <oi@feedget.com.>',
        to:'Raphael Martins <rapha35om@gmail.com>',
        subject,
        html:body
    })
    };
    
}