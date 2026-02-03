import "../../global.scss";
import "./index.scss";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { remoteLog } from '../../utils/remoteLog.js'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [tokenValidator, setTokenValidator] = useState(null);

    // PASSO 1: Verificar se o usuário já existe (Botão "Cadastrar")
    const verifyUser = async () => {

        if (!email || !password || !name) {
            alert('Preencha todos os campos')
            return toast.error('Preencha todos os campos');
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Por favor, insira um email válido', {
                position: "top-right",
                autoClose: 3000
            });
            alert('Por favor, insira um email válido');
            return;
        }

        try {
            const respValid = await fetch('/api/verify-user', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });

            const dataValid = await respValid.json();

            if (respValid.ok) {
                requestCode();
            } else {
                toast.error(dataValid.message || "Usuário já existe");
                alert('Usuário já existe')
                remoteLog("error", "Usuário já existe nos registros")
            }
        } catch (error) {
            remoteLog("error", "Erro na verificação de usuário", error);
        }
    };

    // PASSO 2: Solicita o código 
    const requestCode = async () => {
        try {
            const response = await fetch('/api/request-code', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();

            if (response.ok) {
                setTokenValidator(data.tokenValidator);
                toast.success("Código enviado ao e-mail!");
                alert('Código enviado ao e-mail!')
                remoteLog("info", "Código enviado ao e-mail!")
            } else {
                toast.error(data.error || "Erro ao enviar código");
                remoteLog("error", data.error || "Erro ao enviar código");
                alert('Erro ao enviar código')
            }
        } catch (error) {
            remoteLog("error", "Erro ao solicitar código", error);
        }
    };

    // PASSO 3: Intercepta o clique no botão "Validar Cadastro"
    const handleVerifyAndRegister = async (e) => {
        if (e) e.preventDefault(); // Evita reload da página

        if (!code || !tokenValidator) {
            return toast.error("Solicite o código no e-mail primeiro!");
        }

        try {
            // Chamada para a sua rota de validação
            const respValid = await fetch('/api/validate-code', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ typedCode: code, tokenValidator })
            });

            const dataValid = await respValid.json();

            if (respValid.ok) {
                toast.success("E-mail validado! Criando conta...");
                remoteLog("info", "E-mail validado! Criando conta...")
                // Se o código está OK, chama a função de registro final
                finishRegistration();
            } else {
                toast.error(dataValid.message || "Código inválido");
                remoteLog("error", (dataValid.message || "Código inválido"))
            }
        } catch (error) {
            remoteLog("error", "Erro na validação do código", error);
        }
    };

    // PASSO 4: Efetiva o registro no banco de dados
    const finishRegistration = async () => {

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });

            const data = await response.json();

            if (response.ok && !data.error) {
                alert(`Sucesso! Bem-vindo, ${data.user?.name}`);
                // Limpar campos ou redirecionar
            } else {
                alert(`Erro no cadastro: ${data.error || "Erro desconhecido"}`);
            }
        } catch (error) {
            remoteLog("error", "Erro ao realizar o cadastro final", error);
        }
    };

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
                            <button onClick={verifyUser}>Cadastrar</button>
                        </div>


                        <div className="input-group">
                            <label htmlFor="name">Verifique seu Código</label>
                            <input value={code} onChange={e => setCode(e.target.value)} type="code" id="code" placeholder="Digite o código de validação" />
                        </div>

                        <div className="enter-button">
                            <button onClick={handleVerifyAndRegister}>Validar Cadastro</button>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

export default Register;