import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// project imports
import { useEffect } from 'react';
import { isAuthenticated } from 'service/AuthService';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
  const user = isAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('login', { replace: true });
    }
  }, [user, navigate]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
