// RegisterScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { registerUser } from './authService';

interface RegisterScreenProps {
  navigation: any; 
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Perform user registration
      const userData = await registerUser(username, password);
      navigation.navigate('login'); 
    } catch (error) {
      try {
        const parsedError = JSON.parse(error.message);
        if (parsedError && parsedError.type === 'duplicate_username') {
          alert('Username already exists');
        } else {
          alert('Registration failed. Please try again later.');
        }
      } catch (parseError) {
        alert('Registration failed. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default RegisterScreen;
