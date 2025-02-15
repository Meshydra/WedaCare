import axios from 'axios';

const API_URL = 'http://192.168.1.8:5001/api/auth'; 

export const signup = async (name, mobile, password, language) => {
    try {
        console.log("📤 Sending signup request:", { name, mobile, password, language });  
        const response = await axios.post(`${API_URL}/signup`, {  
            name,
            mobile,
            password,
            language,
        });
        console.log("✅ Signup response:", response.data);
        return response.data; 
    } catch (error) {
        console.error('❌ Signup failed:', error?.response?.data || error.message);
        throw error; 
    }
};


export const login = async (mobile, password) => {
    try {
        console.log("📤 Sending login request:", { mobile, password });
        const response = await axios.post(`${API_URL}/login`, { mobile, password });
        console.log("✅ Login response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Login error:", error.response ? error.response.data : error.message);
        throw error;
    }
};
