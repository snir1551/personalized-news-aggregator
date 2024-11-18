import nodemailer from 'nodemailer';
import transporterConfig from '../config/email.js';

let transporter;

const initTransporter = () => {
    transporter = nodemailer.createTransport(transporterConfig);
};

export const sendEmailHandler = async (email, newsContent) => {
    if (!transporter) {
        initTransporter();
    }
    const mailOptions = {
        from: process.env.EMAIL_USER_NAME,
        to: email,
        subject: 'Your daily news update',
        html: `<h1>News update</h1><p>${newsContent}</p>`
    };
    await transporter.sendMail(mailOptions);
};