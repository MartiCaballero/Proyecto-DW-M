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
                                    {loading ? 'Cargando...' : 'LOGIN'}
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
}
