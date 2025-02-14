import axios from 'axios';

const API_URL = 'http://192.168.1.12:5001/api/auth';

export const signup = async (name, mobile, password, language) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        mobile,
        password,
        language,
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error('Signup failed:', error);
      throw error; // Throw the error to handle it in the component
    }
  };
  
  // Login function (example)
  export const login = async (mobile, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        mobile,
        password,
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Throw the error to handle it in the component
    }
  };
