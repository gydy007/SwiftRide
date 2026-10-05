import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RideRequestScreen } from '../screens/RideRequestScreen';
import { TabNavigator } from './TabNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={TabNavigator} name="MainTabs" />
        <Stack.Screen component={RideRequestScreen} name="RideRequest" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
