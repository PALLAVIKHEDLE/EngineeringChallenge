import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = 'http://localhost:3001';  
const API_BASE_URL = 'http://192.168.1.141:3001'; 


export const registerUser = async (username, password) => {
  console.log('register request', username, password);
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    console.log('register response status:', response.status);

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    console.log('RegisterData', data);
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
      throw new Error('Login failed');
    }

    const data = await response.json();
    await AsyncStorage.setItem('token', JSON.stringify(data['token']));
    console.log('AuthService', await AsyncStorage.getItem('token'))
    return data;
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error;
  }
};
