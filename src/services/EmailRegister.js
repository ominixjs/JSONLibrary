import { Resend } from "resend";

//============ Utils
import AppError from "../utils/AppError.js";

const resend = new Resend(process.env.RESEND_KEY);

export default async function EmailService(email) {
    const { data, error } = await resend.emails.send({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Cadastro feito com sucesso",
        html: `
            <h2>Seja bem vindo ao JSONLibrary</h2>

            <p>Fique a vontade para criar qualquer biblioteca das mas variadas possiveis, você é quem diz como vai ser!</p>

            <h1>${email}</h1>

            <p>
                Se você não tentou fazer login, ignore este e-mail.
            </p>
        `,
    });

    if (error) {
        throw new AppError(error.message, 404);
    }

    console.log(data);
}
