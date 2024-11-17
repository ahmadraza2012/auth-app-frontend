import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ApplicationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If token doesn't exist, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

    // Navigate to external website
    const navigateToFeatures = () => {
      window.location.href = 'https://www.easygenerator.com/en/';
    };

  return (
    <div className="application-page-container">
      <div className="welcome-message">
        <h1>Welcome to the Application Page!</h1>
        <p>You have successfully logged in.</p>
      </div>
      <div className="cta-section">
        <p>Explore our amazing features!</p>
        <button className="cta-btn" onClick={navigateToFeatures}>Go to Features</button>
      </div>
    </div>
  );
}

export default ApplicationPage;