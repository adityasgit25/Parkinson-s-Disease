// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Dashboard from './pages/Dashboard';
import { getAuth} from 'firebase/auth'
import app from './firebase';

const auth = getAuth(app);
const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);

  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute
