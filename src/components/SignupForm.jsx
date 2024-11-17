import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // State to track errors
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Helper function to validate the form
  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Za-z]/.test(password)) {
      errors.password = 'Password must contain at least one letter';
    } else if (!/[0-9]/.test(password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/[\W_]/.test(password)) {
      errors.password = 'Password must contain at least one special character';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      // Make the request to the server
      await axios.post('http://localhost:3001/user/register', { email, name, password });
      setSuccessMessage('Signup successful! Redirecting to login...');
      // Navigate to the app page on successful registration

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1000); // Show success message for 1 second

    } catch (error) {
      // Handle server-side validation errors
      if (error.response) {
        setErrors({ server: error.response.data.message?.message || 'Something went wrong!' });
      } else {
        setErrors({ server: 'Unexpected error: ' + error.message });
      }
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>

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

        {/* Name Field */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-control ${errors.name ? 'error' : ''}`}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
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

        {/* Success message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <button type="submit" className="submit-btn">Sign Up</button>

        {/* Link to Login Page */}
        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;