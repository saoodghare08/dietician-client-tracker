// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { supabase } from "../supabaseClient";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate('/'); // Redirect to HomePage on success
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <h2 className="mb-4">Login</h2>
      <Form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your password"
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className={loading ? 'opacity-50' : ''}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;