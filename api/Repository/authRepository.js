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
        const user = result.rows[0]

        if (!user) return {error: 'Usuário não existe'};

        const validation = await bcrypt.compare(password, user.password);

        if(!validation) 
            return { error: 'Senha incorreta' };
        
         const { password: _, ...userSafe } = user;
         return { 
            success: true,
            user: userSafe
        };

    } catch (error) {
        console.error('Erro na validação de Login (Repository):', error);
        throw error;
    }
}
