import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (email: string, link: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === "production", // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "mdhabibur.hr7@gmail.com",
            pass: `${config.google_smtp_auth_pass}`,
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: 'mdhabibur.hr7@gmail.com', // sender address
        to: email, // list of receivers
        subject: "PH-University password reset link", // Subject line
        text: `Please change your password with this link : ${link}`, // plain text body
        html: `Please change your password with this link : ${link}`, // html body
    });
} 