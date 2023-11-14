import React from 'react';
import {SafeAreaView, ScrollView, Text, StyleSheet} from 'react-native';
import TopBar from '../components/TopBar';
import {useSelector, useDispatch} from 'react-redux';
import CartItems from '../components/CartItems';
import Colors from '../styles/Colors';
import axios from 'axios';
import {URLS} from '../networks';
import {GUID} from '../networks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setCart} from '../redux/actions';

const Cart = ({navigation}) => {
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const toCategories = () => {
    if (user.isLoggedIn) {
      navigation.navigate('CategoriesScreen');
    } else {
      navigation.navigate('ProfileStacks');
    }
  };
  const addItemToCart = async id => {
    let token = await AsyncStorage.getItem('token');
    axios
      .post(
        URLS.addItem,
        {
          productId: id,
          amount: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            GUID: GUID,
          },
        },
      )
      .then(() => {
        getCart(token);
      })
      .catch(err => {
        console.warn('Add Item', err);
      });
  };
  const getCart = async token => {
    axios
      .get(URLS.cart, {
        headers: {
          GUID: GUID,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({data}) => {
        dispatch(setCart(data.data));
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopBar menuButtonOnPress={toCategories} />
      <ScrollView>
        <CartItems detail={cart.detail} addItemToCart={addItemToCart} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Cart;
