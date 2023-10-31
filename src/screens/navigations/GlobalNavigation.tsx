import React, { useEffect } from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import StackLogin from './StackLogin';
import StackHome from './StackHome';
import StackHomeGerant from './StackHomeGerant';

const Stack = createStackNavigator();

const GlobalNavigation = () => {
   
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
                
                <Stack.Screen name="StackHomeGerant" component={StackHomeGerant} />
                <Stack.Screen name="StackHome" component={StackHome} />
                <Stack.Screen name="StackLogin" component={StackLogin} />

                
        </Stack.Navigator>
    );
};

export default GlobalNavigation;