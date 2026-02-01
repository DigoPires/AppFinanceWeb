import * as authRepository from '../Repository/authRepository.js';

export default async function loginValidationController(req, res) {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                error: 'E-mail e password são campos obrigatórios'
            });
        }

        const result = await authRepository.loginValidationRepository(email, password);

        if (result.error) {
            return res.status(401).json({ error: result.error });
        }

        res.status(201).json({
            message: 'Login validado com sucesso', 
            user: result.user
        });

    } catch ( error ) {
        console.error('Erro na validação de Login (Controller):', error)
        res.status(500).json({ error: error.message });
    }
}