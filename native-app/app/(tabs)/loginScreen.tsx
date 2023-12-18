// LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { loginUser } from './authService';

interface LoginScreenProps {
  navigation: any; // Replace with the appropriate navigation type
  onLogin:any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation ,onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Perform user login
      const userData = await loginUser(username, password);
      console.log('useData', userData)
      onLogin();
      navigation.navigate('index'); 
    } catch (error) {
        if(error.message=="Login failed")alert('Login Failed')
      console.log('Login failed:', error.message);
     
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
      <Button title="Login" onPress={handleLogin} />
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

export default LoginScreen;
