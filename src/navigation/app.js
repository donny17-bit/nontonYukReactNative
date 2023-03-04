import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent';
import Icon from 'react-native-vector-icons/Feather';

// screen
import Header from '../components/Header';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import ListMovie from '../screen/ListMovie';
import DetailMovie from '../screen/DetailMovie';
import Payment from '../screen/Payment';
import Order from '../screen/Order';
import Midtrans from '../screen/Midtrans';
import Ticket from '../screen/Ticket';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
// import HomeScreen from '../screen/Home';

function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // screenOptions={({route}) => {
      //   console.log(route);
      // }}
    >
      <Stack.Screen
        component={Home}
        name="Home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ListMovie}
        name="ListMovie"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailMovie}
        name="DetailMovie"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Payment}
        name="Payment"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Order}
        name="Order"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Midtrans}
        name="Midtrans"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        component={Profile}
        name="Profile"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Ticket}
        name="Ticket"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ListMovieNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ListMovie}
        name="ListMovie"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        component={HomeNavigator}
        name="HomeNavigator"
        options={{
          title: 'Home',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={ProfileNavigator}
        name="ProfileNavigator"
        options={{
          title: 'Profile',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={ListMovieNavigator}
        name="ListMovieNavigator"
        options={{
          title: 'List Movie',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="film" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
