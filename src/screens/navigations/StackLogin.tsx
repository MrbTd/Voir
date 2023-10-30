import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import PasswordForgot from '../pages/PasswordForgot';


const Stack = createStackNavigator();

const StackLogin = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Login" component={Login}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                }} />

            <Stack.Screen name="PasswordForgot" component={PasswordForgot}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                }} />
        </Stack.Navigator>
    )
}

export default StackLogin