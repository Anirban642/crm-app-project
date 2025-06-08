import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Logging in with:', credentials);
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: credentials.username,
        password: credentials.password,
      });
      console.log('Response:', response.data);
      return response.data;
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data || { message: 'Login failed' });
    }
  }
);
