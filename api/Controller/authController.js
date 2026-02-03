import * as authServices from '../Services/authServices.js';
import logger from '../../src/config/logger.js';

export function requestCodeController(req, res){
    try {
        const { email } = req.body;

        const result = authServices.generateValidationServices(email);

        if (result.error) return res.status(500).json({ error: result.error });

        return res.status(200).json({
            message: "Código enviado com sucesso!",
            tokenValidator: result.tokenValidator
        })
    } catch (error) {
        return res.status(500).json({ error: "Erro ao gerar código." });
    }
};

export function validationCodeController(req, res) {
    const { typedCode, tokenValidator } = req.body;

    const isValid = authServices.verifyCodeServices(typedCode, tokenValidator);

    if (isValid) {
        return res.json({ success: true, message: "Acesso liberado!" });
    }
    return res.status(401).json({ success: false, message: "Código inválido ou expirado." });
};

export async function verifyUserExists(req, res) {
    const { email } = req.body;

    const exists = await authServices.userExists(email);

    if (!exists) {
        return res.json({ success: true, message: "Usuário não existe" });
    }
    return res.status(401).json({ success: false, message: "Usuário já existe" });
};

export async function loginValidationController(req, res) {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                error: 'E-mail e password são campos obrigatórios'
            });
        }

        const result = await authServices.loginValidationServices(email, password);

        if (result.error) {
            return res.status(401).json({ 
                error: result.error 
            });
        }

        res.status(201).json({
            message: 'Login validado com sucesso', 
            user: result.user
        });

    } catch ( error ) {
        res.status(500).json({ error: error.message });
    }
};

export async function registerUserController(req, res) {
    try{
        const {email, password, name} = req.body;

        if(!email || !password || !name){
            return res.status(400).json({
                error: 'Campo obrigatório vazio'
            });
        }

        const result = await authServices.registerUserServices(email, password, name);

        if (result.error) {
            return res.status(401).json({ 
                error: result.error 
            });
        }

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso!', 
            user: result.user
        });

    } catch ( error ) {
        res.status(500).json({ error: error.message });
    }
};