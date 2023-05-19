import React, { useState } from 'react';
import './LoginForm.css';
import newRequest from '../utils/newRequest';
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await newRequest.post("/auth/login", { username, password });
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate("/hunts")
            window.location.reload()
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Bem Vindo Novamente!</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && error}
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
