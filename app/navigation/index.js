import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerMenu from '../components/DrawerMenu/DrawerMenu';
import Loading from '../screens/Loading';
import Main from './main';
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerMenu {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 300, // İstediğin genişliği ayarlayabilirsin
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      {/* Diğer drawer ekranlarını buraya ekleyebilirsin */}
    </Drawer.Navigator>
  );
}

export default function NavigateApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Main" component={Main} />

        {/* <Stack.Screen name="DrawerMenu" component={DrawerNavigator} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}