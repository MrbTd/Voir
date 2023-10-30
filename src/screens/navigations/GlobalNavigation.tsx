import React, { useEffect } from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import StackLogin from './StackLogin';
import StackHome from './StackHome';

const Stack = createStackNavigator();

const GlobalNavigation = () => {
   
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
           
                <Stack.Screen name="StackHome" component={StackHome} />
                <Stack.Screen name="StackLogin" component={StackLogin} />

                
        </Stack.Navigator>
    );
};

export default GlobalNavigation;