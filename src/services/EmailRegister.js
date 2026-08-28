import { Resend } from "resend";

//============ Utils
import AppError from "../utils/AppError.js";

const resend = new Resend(process.env.RESEND_KEY);

export default async function EmailService(name, email) {
    const { data, error } = await resend.emails.send({
        from: "JSONLibrary <onboarding@resend.dev>",
        to: [email],
        subject: "Cadastro realizado com sucesso — JSONLibrary",

        html: `
    <div>
      <img
        src="${process.env.APP_URL}/assets/logo.png"
        alt="JSONLibrary"
        width="180"
      >

      <h1>Cadastro realizado com sucesso! 🎉</h1>

      <p>Olá, ${name}!</p>

      <p>
        Sua conta na JSONLibrary foi criada com sucesso.
      </p>

      <p>
        Agora você já pode acessar sua conta e utilizar a plataforma.
      </p>

      <a href="${process.env.APP_URL}">
        Acessar JSONLibrary
      </a>

      <p>
        Este é um e-mail automático da JSONLibrary.
        Por favor, não responda a este e-mail.
      </p>
    </div>
  `,

        replyTo: process.env.EMAIL_REPLY_TO,
    });

    if (error) {
        throw new AppError(error.message, 404);
    }

    console.log(data);
}
