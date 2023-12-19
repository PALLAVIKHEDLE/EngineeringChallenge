// TabLayout.tsx
import React, { useState ,useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import {Pressable, useColorScheme} from 'react-native';

import Colors from '../../constants/Colors';
import MachineStateScreen from './index'; // Replace with your actual authenticated screen component
import LogPartScreen from './two'; // Replace with your other authenticated screen component
import LoginScreen from './loginScreen';
import RegisterScreen from './registrationScreen';
import LogOutScreen from './logOutScreen';
import HistoryChartScreen from './historyChart'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

//TabLayout component manages the bottom tab navigation based on user authentication status.
function TabLayout(navigation) {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        // Check if the token exists
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
        // Handle errors, e.g., show an error message or redirect to the login screen
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >      
    {/* Display bottom tabs based on authentication status */}

      {isAuthenticated ? (
        <>
          <Tab.Screen
            name="index"
            component={MachineStateScreen} // Replace with your actual authenticated screen component
            options={{
              title: 'Machine State',
              tabBarIcon: ({ color }) => <FontAwesome name="list-ul" size={28} style={{ marginBottom: -3, color }} />,
            }}
          />
          <Tab.Screen
            name="two"
            component={LogPartScreen} // Replace with your other authenticated screen component
            options={{
              title: 'Log Part',
              tabBarIcon: ({ color }) => <FontAwesome name="edit" size={28} style={{ marginBottom: -3, color }} />,
            }}
          />
          <Tab.Screen
          name="historyChart"
          component={HistoryChartScreen}
          options={{
            title: 'Visualization',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="line-chart" size={28} style={{ marginBottom: -3, color }} />
              ),
            }}
        />
            <Tab.Screen
             name="logout"
             component={() => <LogOutScreen  onLogin={() => setIsAuthenticated(false)} />}
             options={{
               title: 'LogOut',
               tabBarIcon: ({ color }) => <FontAwesome name="sign-out" size={28} style={{ marginBottom: -3, color }} />,
             }}
           />
        </>
      ) : ( 
        <>
          <Tab.Screen
            name="login"
            component={() => <LoginScreen navigation={navigation} onLogin={() => setIsAuthenticated(true)} />}
            // component={LoginScreen}
            options={{
              title: 'Login',
              tabBarIcon: ({ color }) => <FontAwesome name="sign-in" size={28} style={{ marginBottom: -3, color }} />,
            }}
          />
          <Tab.Screen
            name="register"
            component={RegisterScreen}
            options={{
              title: 'Register',
              tabBarIcon: ({ color }) => <FontAwesome name="user-plus" size={28} style={{ marginBottom: -3, color }} />,
            }}
          />
          
        </>
      )} 
    </Tab.Navigator>
  );
}

export default TabLayout;
