import axios from 'axios';

export const login = async (credentials) => {
  const response = await axios.post('https://dummyjson.com/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  
  return Promise.resolve();
};