import React, { useState } from "react";
import './Pages.css';

export default function Register () {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

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
                setSuccess('Usuario registrado con éxito');
                console.log('Registro exitoso:', data);
            } else {
                setError(data.message || 'Error al registrar usuario');
            }
        } catch (err) {
            setError('Error en el servidor. Intenta mas tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="container">
            <div class="screen">
                <div class="screen__content">
                    <h2>Register</h2>
                    <form class="login" onSubmit={handleRegister}>
                        <input
                            type="text"
                            class="login__input"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            class="login__input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            class="login__input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button class="login__submit" type="submit" disabled={loading}>
                            {loading ? 'Cargando...' : 'Registrarse'}
                        </button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
            </div>
        </div>
    );
};
