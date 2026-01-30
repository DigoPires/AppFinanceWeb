import "../../global.scss";
import "./index.scss";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            toast.error('Por favor, preencha todos os campos', {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Por favor, insira um email válido', {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

        try{
            console.log(' Iniciando processo de login... ')

        } catch ( error ){
            console.error(console.error('Erro na validação de Login (Página):', error))
        }
    }

    return (
        <main className="login">
            <section className="side" id="left-side">
                <div className="flex-container">
                    <div className="image">
                        IMAGEM
                    </div>
                    <div className="text">
                        <h1>AppFinance</h1>

                        <p>Controle suas finanças de forma simples e eficiente. Acompanhe suas finanças pessoais em tempo real.</p>
                    </div>

                    <div className="information">
                        <div id="info">
                            <h3>100%</h3>
                            <p>Portável</p>
                        </div>
                        <div id="info">
                            <h3>24/7%</h3>
                            <p>Disponível</p>
                        </div>
                        <div id="info">
                            <h3>Seguro%</h3>
                            <p>JWT Auth</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="side" id="right-side">
                <div className="form-container">
                    <div className="form">
                        <h2>Login</h2>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Digite seu email" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" placeholder="Digite sua senha" />
                        </div>

                        <div className="checkbox">
                            <input type="checkbox" />
                            <label htmlFor="remember-me">Manter conectado por 30 dias</label>
                        </div>

                        <div className="enter-button">
                            <button>Entrar</button>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

export default Login;