import React, { useState } from "react";
import './Pages.css';
import { useNavigate } from "react-router-dom";

export default function Register () {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setError(''); 
        setSuccess('');

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setSuccess('Usuario registrado con éxito');
                console.log('Registro exitoso:', data);
            } else {
                setError(data.message || 'Error al registrar usuario');
            }
        } catch (err) {
            setError('Error en el servidor. Intenta mas tarde.');
        } finally {
            setLoading(false);
            navigate('/home');
        }
    };

    return (
        <div class="container">
            <div class="box">
                <div>
                    <h2 class="title">Register</h2>
                    <div class="icon-container">
                            <div class="icon-bg"></div>
                            <div class="icon-content"></div>
                        </div>
                    <form class="login-form" onSubmit={handleRegister}>
                        <input
                            type="text"
                            class="login_input"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            class="login_input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            class="login_input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button class="login_submit" type="submit" disabled={loading}>
                            {loading ? 'Cargando...' : 'Sign up'}
                        </button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
            </div>
        </div>
    );
};
