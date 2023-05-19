import React, { useState } from 'react';
import './RegisterForm.css';
import newRequest from '../utils/newRequest';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não correspondem");
      return;
    }
    try {
      await newRequest.post("/auth/register", { username, email, password });
      navigate("/login")
      window.location.reload();
      alert('Conta criada com sucesso!! Por favor faça login.');
    } catch (err) {
      if (err.response && err.response.data.includes('duplicate key error collection')) {
        setError("O Nome ou Email fornecido já está em uso. Por favor, tente novamente com outras inforrmações.");
      } else {
        setError("Ocorreu um erro ao registrar. Por favor, tente novamente.");
      }
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Cadastre-se:</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {error && error}
      <div className="button-container">
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
