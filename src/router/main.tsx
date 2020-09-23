import React from 'react';
import {  StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';
import MultiScreenHome from '../Component/MultiScreenHome';
import PostPublish from '../pages/PostPublish';
import Comments from '../pages/Comments';
import ChatRooms from '../pages/ChatRooms';

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
                <AppStack.Screen
                    options={{
                        headerShown: true,
                        title: 'Comentários',
                        headerStyle: { backgroundColor: '#191919' },
                        headerTitleStyle: { color: 'white' },
                        headerTintColor: 'white'
                    }}
                    initialParams={{ postID: 1 }}
                    component={Comments}
                    name='Comments'
                />
                <AppStack.Screen
                    options={{
                        headerShown: false,
                    }}
                    component={ChatRooms}
                    name='ChatRooms'
                />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
export default MainRouter;