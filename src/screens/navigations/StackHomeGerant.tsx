import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import ListUtilisateur from '../pages/gerants/users/ListUtilisateur';
import DetailsUtilisateur from '../pages/gerants/users/DetailsUtilisateur';
import CategoriePlat from '../pages/gerants/categories_plats/CategoriePlat';
import DetailsCategoriePlat from '../pages/gerants/categories_plats/DetailsCategoriePlat';

const Stack = createStackNavigator();

const StackHomeGerant = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="CategoriePlat" component={CategoriePlat}
                    options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,}} />

            <Stack.Screen name="DetailsCategoriePlat" component={DetailsCategoriePlat}
                   options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,}} />
          
            <Stack.Screen name="ListUtilisateur" component={ListUtilisateur}
                    
                    options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,}} />
            <Stack.Screen name="DetailsUtilisateur" component={DetailsUtilisateur}
                                                        options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,}} />


           
        </Stack.Navigator>
    )
}

export default StackHomeGerant