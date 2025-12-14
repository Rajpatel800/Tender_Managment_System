import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    // Redirect to appropriate dashboard based on user role
    const roleRoutes = {
      junior_engineer: '/je/dashboard',
      senior_engineer: '/se/dashboard',
      admin: '/admin/dashboard',
      contractor: '/contractor/dashboard'
    };
    return <Navigate to={roleRoutes[user.role] || '/login'} replace />;
  }

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedRoute;

