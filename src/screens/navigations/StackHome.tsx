import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import ListMenu from '../pages/ListMenu';
import DetailsCommande from '../pages/DetailsCommande';
import ListCommande from '../pages/ListCommande';
import ListMesCommande from '../pages/ListeMesCommande';

const Stack = createStackNavigator();

const StackHome = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Home" component={Home}
                            options={{
                                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                            }} />
            <Stack.Screen name="ListMenu" component={ListMenu}
                            options={{
                                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                            }} />
            <Stack.Screen name="DetailsCommande" component={DetailsCommande}
                            options={{
                                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                            }} />

            <Stack.Screen name="ListCommande" component={ListCommande}
                            options={{
                                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                            }} />

            <Stack.Screen name="ListMesCommande" component={ListMesCommande}
                            options={{
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                            }} />



        </Stack.Navigator>
    )
}

export default StackHome