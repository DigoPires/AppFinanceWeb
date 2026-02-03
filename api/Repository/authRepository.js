import pool from '../connection.js';
import bcrypt from 'bcrypt';
import logger from '../../src/config/logger.js';

async function userExists(email) {
    try {
        const query = `
            SELECT * FROM users WHERE email = $1
        `;
        const result = await pool.query(query, [email]);
        const user = result.rows[0];

        return user || false;
    } catch (error) {
        logger.error("Erro interno no userExists", error);
        throw error;
    }
}

export async function loginValidationRepository(email, password) {
    try {

        const user = await userExists(email);

        if (!user) return { error: "Usuário não existe" };

        const validation = await bcrypt.compare(password, user.password);

        if (!validation) return { error: 'Senha incorreta' };

        const { password: _, ...userSafe } = user;
        return {
            success: true,
            user: userSafe
        };

    } catch (error) {
        logger.error('Erro na validação de Login', {
            error: error.message,
            stack: error.stack
        });
        throw error;
    }
}

export async function registerUserRepository(email, password, name) {
    try {
        const user = await userExists(email);

        if (user) return { error: "Já existe um usuário com este email" };

        const password_encrypt = await bcrypt.hash(password, 10)

        const query = `
            INSERT INTO users (email, password, name) 
            VALUES ($1, $2, $3);
        `;
        const values = [email, password_encrypt, name];
        const result = await pool.query(query, values);
        
        const newUser = await userExists(email);
        const { password: _, ...userSafe } = newUser;

        logger.info(`Usuário cadastrado com sucesso no banco: ${JSON.stringify(userSafe)}`);

        return {
            success: true,
            user: userSafe
        }

    } catch (error) {
        logger.error('Erro na validação de Cadastro', {
            error: error.message,
            stack: error.stack
        });
        throw error;
    }
}
