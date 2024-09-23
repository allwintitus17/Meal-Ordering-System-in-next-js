import axios from 'axios';

// Set base URL for axios, ensuring there's no trailing slash
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://meal-ordering-system-in-next-js.vercel.app/api/users/';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Check if window is defined (i.e., if the code is running in the browser)
const isBrowser = typeof window !== 'undefined';

// Register new user
const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/', userData); // Call to BASE_URL (users endpoint)
    if (response.data && isBrowser) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axiosInstance.post('/login', userData); // Call to /login endpoint
    if (response.data && isBrowser) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Logout user
const logout = () => {
  if (isBrowser) {
    localStorage.removeItem('user');
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
