import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Tables from '../../pages/gerants/tables/Tables';
import DetailsTables from '../../pages/gerants/tables/DetailsTables';
const Stack = createStackNavigator();

const StackTables = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tables" component={Tables} />

      <Stack.Screen
        name="DetailsTables"
        component={DetailsTables}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default StackTables;
