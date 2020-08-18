import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';
import MultiScreenHome from '../Component/MultiScreenHome';
//import Home from '../pages/Home';
import PostPublish from '../pages/PostPublish';


const AppStack = createStackNavigator();

const MainRouter: React.FC = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor='#191919' />
            <AppStack.Navigator>

                <AppStack.Screen
                    options={{
                        headerShown: false,
                    }}
                    component={MultiScreenHome}
                    name='Home'
                />
                <AppStack.Screen
                    options={{
                        headerShown: false,
                    }}
                    component={Profile}
                    name='Profile'
                />
                <AppStack.Screen
                    options={{
                        headerShown: false,
                    }}
                    component={Auth}
                    name='Auth'
                />
                <AppStack.Screen
                    options={{
                        headerShown: false,
                    }}
                    component={PostPublish}
                    name='PostPublish'
                />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
export default MainRouter;