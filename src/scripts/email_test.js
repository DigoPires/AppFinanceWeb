import axios, { AxiosError } from 'axios';
import logger from '../config/logger.js';
import "dotenv/config";

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_API_KEY = process.env.BREVO_API_KEY;

const code = 1111111

if (!BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY não definida");
}

async function sendEmail() {
    const response = await axios.post(
        BREVO_API_URL,
        {
            sender: {
                name: "AppFinance Suporte",
                email: process.env.EMAIL_SUPORT
            },
            to: [
                {
                    email: process.env.EMAIL_RECEIVER
                }
            ],
            subject: "Teste Brevo",
            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Verificação de Email</h2>
                    <p>Olá,</p>
                    <p>Obrigado por se registrar no AppFinance.</p>
                    <p>Seu código de verificação é:</p>
                    <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 24px; font-weight: bold; color: #333;">${code}</span>
                    </div>
                    <p>Este código expira em 10 minutos.</p>
                    <p>Insira este código para completar seu cadastro.</p>
                    <p>Atenciosamente,<br>Equipe AppFinance</p>
                </div>
            `
        },
        {
            headers: {
                "api-key": BREVO_API_KEY,
                "content-type": "application/json",
                "accept": "application/json"
            }
        }
    );
    
    logger.info(JSON.stringify(response.data))
};

sendEmail();