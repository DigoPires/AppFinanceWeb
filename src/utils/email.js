import axios from 'axios';
import logger from '../config/logger.js';
import "dotenv/config";

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY não definida");
}

const sendEmail = async (to_email, subject, htmlContent) => {
    let result = false
    const response = await axios.post(
        BREVO_API_URL,
        {
            sender: {
                name: "AppFinance Suporte",
                email: process.env.EMAIL_SUPORT
            },
            to: [
                {
                    email: to_email
                }
            ],
            subject: subject,
            htmlContent: htmlContent,
        },
        {
            headers: {
                "api-key": BREVO_API_KEY,
                "content-type": "application/json",
                "accept": "application/json"
            }
        }
    );

    result = true
    logger.info(`E-mail enviado com sucesso para ${to_email} | ${JSON.stringify(response.data)}`)
    return result
};

export async function validationCode(email, code) {

    // const subject = "Código de Verificação";

    // const htmlContent = `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //         <h2 style="color: #333;">Verificação de Email</h2>
            
    //         <p>Olá,</p>
    //         <p>Obrigado por se registrar no AppFinance.</p>
    //         <p>Seu código de verificação é:</p>

    //         <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
    //             <span style="font-size: 24px; font-weight: bold; color: #333;">${code}</span>
    //         </div>

    //         <p>Este código expira em 10 minutos.</p>
    //         <p>Insira este código para completar seu cadastro.</p>

    //         <p>Atenciosamente,<br>Equipe AppFinance</p>
    //     </div>
    // `;

    // const result = sendEmail(email, subject, htmlContent);

    const result = true
    logger.info(`Código para teste dev: ${code}`)

    return result;
};