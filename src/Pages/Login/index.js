import "../../global.scss";
import "./index.scss";
import { useState } from 'react';
import { remoteLog } from '../../utils/remoteLog.js'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Por favor, insira um email válido');
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const data = await response.json();

            if (data && !data.error){
                const userName = data.user?.name

                alert(`Login validado com sucesso. Bem vindo, ${userName}`);
                remoteLog("info", "Usuário Logado no Front", userName);
            }
            else {
                const errorMessage = data?.error || "Erro desconhecido";
                
                alert(`Login inválido: ${errorMessage}`)
                remoteLog("error", "Tentativa de login inválida", errorMessage);
            }

        } catch (error) {
            remoteLog("error", "Tentativa de login inválida", error);
        }
    }

    return (
        <main className="login">
            <section className="side" id="left-side">
                <div className="flex-container">
                    <h1> TELA LOGIN </h1>
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
                            <label htmlFor="email" >Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" placeholder="Digite seu email" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Senha</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" placeholder="Digite sua password" />
                        </div>

                        <div className="checkbox">
                            <input type="checkbox" />
                            <label htmlFor="remember-me">Manter conectado por 30 dias</label>
                        </div>

                        <div className="enter-button">
                            <button onClick={handleLogin}>Entrar</button>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

export default Login;