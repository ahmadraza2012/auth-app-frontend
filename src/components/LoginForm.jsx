import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Basic validation
    if (!email) {
      validationErrors.email = 'Email is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3001/user/login', { email, password });
      // Save the token to localStorage
      localStorage.setItem('token', data.token);
      navigate('/app');
    } catch (error) {
      // Check if error has a response object (i.e., server-side error)
      if (error.response) {
        // Server responded with an error
        const errorMessage = error.response.data.message.message || error.response.data.message || 'An unexpected error occurred. Please try again.';
        setErrors({
          server: errorMessage
        });
      } else if (error.request) {
        // No response received
        setErrors({
          server: 'No response from server. Please try again later.'
        });
      } else {
        // Unexpected error
        setErrors({
          server: 'Unexpected error: ' + error.message
        });
      }
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign In</h2>

        {/* Email Field */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${errors.email ? 'error' : ''}`}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-control ${errors.password ? 'error' : ''}`}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {/* Server Error Message */}
        {errors.server && <div className="server-error">{errors.server}</div>}

        <button type="submit" className="submit-btn">Sign In</button>

        {/* Link to Signup Page */}
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;