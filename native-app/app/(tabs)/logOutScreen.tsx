import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LogOutScreenProps {
  onLogin:any;
}

const LogOutScreen: React.FC<LogOutScreenProps> = ({  onLogin}) => {

AsyncStorage.removeItem('token')
onLogin()
  return (
  <></>
  );
};

export default LogOutScreen;