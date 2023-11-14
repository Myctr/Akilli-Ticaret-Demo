import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import HomeStacks from './HomeStacks';
import Cart from '../screens/Cart';
import Search from '../screens/Search';
import Campaigns from '../screens/Campaigns';
import Profile from '../screens/Profile';
import Colors from '../styles/Colors';
import Metrics from '../styles/Metrics';
import Fonts from '../styles/Fonts';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const cart = useSelector(state => state.cart);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.iconInactiveTint,
        tabBarIcon: ({color, size, focused}) => {
          switch (route.name) {
            case 'Home':
              return <Icon name={'home'} size={size} color={color} />;
            case 'Search':
              return <Icon name={'search'} size={size} color={color} />;
            case 'Cart':
              return (
                <View style={styles.icon}>
                  <Text
                    style={
                      styles.amount
                    }>{`${cart.basket.totalPrice} TL`}</Text>
                  <Icon name={'shopping-basket'} size={size} color={color} />
                </View>
              );
            case 'Campaigns':
              return <Icon name={'ticket'} size={size} color={color} />;
            case 'Profile':
              return <Icon name={'user'} size={size} color={color} />;
            default:
              break;
          }
        },
      })}>
      <Tab.Screen name="Home" component={HomeStacks} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Campaigns" component={Campaigns} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.primary,
    paddingTop: Metrics(15),
  },
  icon: {
    alignItems: 'center',
  },
  amount: {
    position: 'absolute',
    top: Metrics(-15),
    fontFamily: Fonts.regular,
    fontSize: Fonts.size(9),
    textAlign: 'center',
    color: Colors.white,
  },
});
export default BottomTabs;
