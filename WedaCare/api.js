import axios from 'axios';

// Base URL for API requests (Change this IP if backend runs on a different machine)
const API_URL = 'http://192.168.1.8:5001/api/auth';  

/**
 * Signup function - Registers a new user
 * @param {string} name - User's full name
 * @param {string} mobile - User's mobile number
 * @param {string} password - User's password
 * @param {string} language - Preferred language
 * @returns {Promise<Object>} - Response data from the backend
 */
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

/**
 * Login function - Authenticates a user
 * @param {string} mobile - User's mobile number
 * @param {string} password - User's password
 * @returns {Promise<Object>} - Response data (usually token + user info)
 */
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

/**
 * Update user location in the backend
 * @param {string} mobile - User's mobile number
 * @param {number} latitude - User's current latitude
 * @param {number} longitude - User's current longitude
 * @returns {Promise<Object>} - Response confirming update
 */
export const updateLocation = async (mobile, latitude, longitude) => {
    try {
        const response = await axios.post(`${API_URL}/update-location`, { mobile, latitude, longitude });
        console.log("✅ Location updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating location:", error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Fetch user location from the backend
 * @param {string} mobile - User's mobile number
 * @returns {Promise<Object>} - Response containing location data
 */
export const getLocation = async (mobile) => {
    try {
        const response = await axios.get(`${API_URL}/get-location/${mobile}`);
        console.log("📍 Fetched location:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching location:", error.response ? error.response.data : error.message);
        throw error;
    }
};
