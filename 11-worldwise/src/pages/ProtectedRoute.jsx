/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useFakeAuth } from '../contexts/FakeAuthContext';
import { useEffect } from 'react';
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useFakeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
