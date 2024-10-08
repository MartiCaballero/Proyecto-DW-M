import { useState } from 'react';
import Header from "../Components/Header";
import './Pages.css';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('Login exitoso:', data);
            } else {
                setError(data.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error en el servidor. Intenta más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const redirectRegister = () => {
        navigate('/Register');
        
    };

    const redirectHome = () => {
        navigate('/home');
        
    };

    return (
        <>
            <Header />
                <div class="container">
                    <div class="box">
                        <div class="icon-container">
                            <div class="icon-bg"></div>
                            <div class="icon-content"></div>
                        </div>

                        <div class="title">fakestagram</div>
                        <div class="login-button-container">
                            <div class="login-button-text"></div>
                            <form class="login-form" onSubmit={handleLogin}>
                                <div class="login_field">
                                    <input
                                        type="email"
                                        class="login_input"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div class="login_field">
                                    <input
                                        type="password"
                                        class="login_input"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button class="login_submit" type="submit" onClick={redirectHome} disabled={loading}>
                                    {loading ? 'Cargando...' : 'Login'}
                                </button>

                            </form>
                            <div class="text-box">
                            <span class="text-light">Create account</span>
                            <span class="text-bold" style={{textDecoration: 'bold', cursor: 'pointer'}} onClick={redirectRegister}> here</span>
                        </div>
                        </div>
                    </div>
                </div>
            
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            </>

    );
        
}

    
    /*(
        <>
            <Header />
            
                <div class="container">
                    <div class="screen">
                        <div class="screen__content">
                        <h2>Login Page</h2>
                        <form class="login" onSubmit={handleLogin}>
                            <div class= "login__field">
                                    <input
                                    type="email"
                                    class= "login__input"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    class= "login__input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button class="login__submit" type="submit" onClick={redirectHome} disabled={loading}>
                                    {loading ? 'Cargando...' : 'Login'}
                                </button>

                                <button class="login__submit" onClick={redirectRegister}>Registrarse</button>

                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
        </>
    );
    
    import './styles.css';  // Importa el archivo CSS

const LoginPage = () => (
    <>
        <Header />

        <div className="container">
            <div className="box">
                <div className="text-box">
                    <span className="text-light">Create account</span>
                    <span className="text-bold"> here</span>
                </div>
                <div className="button-container">
                    <div className="button"></div>
                    <div className="button-text">Login</div>
                    <form className="login" onSubmit={handleLogin}>
                        <div className="login__field">
                            <input
                                type="email"
                                className="login__input"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="login__input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button className="login__submit" type="submit" onClick={redirectHome} disabled={loading}>
                                {loading ? 'Cargando...' : 'Login'}
                            </button>

                            <button className="login__submit" onClick={redirectRegister}>Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="field">
                <div className="input-box" />
                <div className="input-label">Email</div>
            </div>

            <div className="field">
                <div className="input-box" />
                <div className="input-label">Password</div>
            </div>

            <div className="title">fakestagram</div>

            <div className="icon-container">
                <div className="icon-bg" />
                <div className="icon-content"></div>
            </div>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
);

    
    
    */

