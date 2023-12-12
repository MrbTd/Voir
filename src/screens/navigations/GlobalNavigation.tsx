import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StackLogin from './StackLogin';
import StackHome from './StackHome';
import DrawerNavigation from './DrawerNavigation';
import {useAuth} from '../../hooks/AuthProvider';
import {asyncGetToken} from '../../services/asyncStorage';
import {
  actionReducer,
  actionTypeReducer,
} from '../../contexts/reducers/actionReducer';
import LoadingScreen from '../../components/LoadingScreen';
import {userRole} from '../../utils/data';

const Stack = createStackNavigator();

const GlobalNavigation = () => {
  const {auhtContext, dispatchAuhtContext} = useAuth();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let user;
      try {
        user = await asyncGetToken();
      } catch (e) {}

      dispatchAuhtContext(
        actionReducer(actionTypeReducer.RESTORE_TOKEN, {
          role: user?.role,
          token: user?.token,
        }),
      );
    };

    bootstrapAsync();
  }, []);

  if (auhtContext.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {auhtContext.data.token == null ? (
        <Stack.Screen name="StackLogin" component={StackLogin} />
      ) : (
        <>
          {auhtContext.data.role == userRole.ADMIN ||
          auhtContext.data.role == userRole.GERANT ? (
            <Stack.Screen
              name="DrawerNavigation"
              component={DrawerNavigation}
            />
          ) : (
            <Stack.Screen name="StackHome" component={StackHome} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default GlobalNavigation;
