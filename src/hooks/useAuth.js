import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = (redirectPath = '/login') => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(redirectPath);
    }
  }, [token, navigate, redirectPath]);

  return token;
};