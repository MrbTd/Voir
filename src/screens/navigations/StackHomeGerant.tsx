import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import ListUtilisateur from '../pages/gerants/ListUtilisateur';
import DetailsUtilisateur from '../pages/gerants/DetailsUtilisateur';

const Stack = createStackNavigator();

const StackHomeGerant = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="ListUtilisateur" component={ListUtilisateur}
                            options={{
                                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                            }} />
                    <Stack.Screen name="DetailsUtilisateur" component={DetailsUtilisateur}
                            options={{
                                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                            }} />
           
        </Stack.Navigator>
    )
}

export default StackHomeGerant