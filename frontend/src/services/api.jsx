import axios from 'axios';

// Get the token from localStorage
const getToken = () => {
    return localStorage.getItem('token');
};

// API for creating a rule
export const createRule = async (ruleString) => {
    try {
        const token = getToken(); // Get token from localStorage
        const response = await axios.post('http://localhost:5000/api/rules/create', 
            { ruleString },
            {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the header
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating rule:', error);
        throw error;
    }
};

// API for evaluating a rule
export const evaluateRule = async (ruleId, data) => {
    try {
        const token = getToken(); // Get token from localStorage
        const response = await axios.post('http://localhost:5000/api/rules/evaluate', 
            { ruleId, data },
            {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the header
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error evaluating rule:', error);
        throw error;
    }
};
