import pool from '../connection.js';
import bcrypt from 'bcrypt';

export async function loginValidationRepository(email, password){
    try {
        const query = `
            SELECT * 
            FROM users
            WHERE email = $1
        `;
        const value = [email];
        const result = await pool.query(query, value);

        if (!result.rows[0]) return {error: 'Usuário não existe'};

        const validation = await bcrypt.compare(password, result.rows[0].password);
        if(!validation) return {error: 'Senha incorreta'};
        
        return {success: true}

    } catch (error) {
        console.error('Erro na validação de Login (Repository):', error);
        throw error;
    }
}
