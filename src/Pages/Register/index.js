import "../../global.scss";
import "./index.scss";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { remoteLog } from '../../utils/remoteLog.js'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password || !name) {
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

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                })
            })

            const data = await response.json();

            if (data && !data.error) {
                const userName = data.user?.name || "Novo Usuário";

                alert(`Usuário cadastrado com sucesso. Bem vindo, ${userName}`);
                remoteLog("info", data.message, data);
            }
            else {
                const errorMessage = data?.error || "Erro desconhecido";

                alert(`Erro ao realizar o cadastro: ${errorMessage}`);
                remoteLog("warn", data?.error, data);
            }

        } catch (error) {
            remoteLog("warn", "Erro ao realizar o cadastrado", error);
        }
    }

    return (
        <main className="register">
            <section className="side" id="left-side">
                <h1> TELA REGISTRO </h1>
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
                        <h2>Cadastro</h2>

                        <div className="input-group">
                            <label htmlFor="email" >Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" placeholder="Digite seu email" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Senha</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" placeholder="Digite sua senha" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="name">Nome</label>
                            <input value={name} onChange={e => setName(e.target.value)} type="name" id="name" placeholder="Digite seu nome" />
                        </div>

                        <div className="enter-button">
                            <button onClick={handleRegister}>Cadastrar</button>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

export default Register;