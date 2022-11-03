import { Injectable } from '@nestjs/common';
import {google} from 'googleapis';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    async sendEmail(to: string, subject: string, msg: string, options: object) {
        const clientID = process.env.CLIENT_ID;
        const secretKey = process.env.SECRET_KEY;
        const refreshToken = process.env.REFRESH_TOKEN;
        const redirectURI = 'https://developers.google.com/oauthplayground'
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(clientID, secretKey, redirectURI);
        oauth2Client.setCredentials({refresh_token: refreshToken});
        const accessToken = oauth2Client.getAccessToken();
        const smtpTransport = nodemailer.createTransport({
            host : 'smtp.gmail.com',
            port : 465,
            secure : true,
            logger : false,
            debug : false,
            auth : {
                type : 'OAuth2',
                user : 'alesongandpraise@gmail.com',
                clientId : clientID,
                clientSecret : secretKey,
                refreshToken : refreshToken,
                accessToken : accessToken
            },
        });

        const mailOptions = {
            from : 'alesongandpraise@gmail.com',
            to : to,
            subject : subject,
            html : `Enviando msg com nest js
            <h1>${msg}</h1>
            somente especilistas`,
        };
        try {
            const result = await smtpTransport.sendMail(mailOptions);
            if(!result.reject) {
                return {message: 'Email enviado com sucesso'};
            }else{
                return {message: 'Erro ao enviar email'};
            }
        }
        catch (error) {
           return {message: error.message};
        }
    }
}
