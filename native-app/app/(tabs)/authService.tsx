import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = 'http://localhost:3001';  
const API_BASE_URL = 'http://192.168.1.141:3001'; 


export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Get error message from the response body
      throw new Error(`Registration failed: ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Get error message from the response body
      throw new Error(`Login failed: ${errorMessage}`);
    }

    const data = await response.json();
    await AsyncStorage.setItem('token', JSON.stringify(data['token']));
    return data;
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error;
  }
};

export const fetchHistoryDataPoints = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/historyDataPoints`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during API request:', error.message);
    throw error;
  }
};
