import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/users/login', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error de conexión');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>StuffLynk</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {error && <p style={styles.errorText}>{error}</p>}
          <button type="submit" style={styles.button}>ACCEDER</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  card: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  title: {
    marginBottom: '1.5rem',
    color: '#27ae60',
    fontSize: '2.2rem',
    fontWeight: '800'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem'
  },
  input: {
    padding: '0.9rem',
    borderRadius: '6px',
    border: '1px solid #e0e0e0',
    fontSize: '1rem',
    outline: 'none'
  },
  button: {
    padding: '1rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background 0.3s'
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '0.85rem',
    marginTop: '-0.5rem'
  }
};

export default Login;