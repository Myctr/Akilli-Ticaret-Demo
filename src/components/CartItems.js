import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Fonts from '../styles/Fonts';
import Metrics from '../styles/Metrics';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const CartItems = ({detail, addItemToCart}) => {
  const Item = ({item}) => {
    return (
      <View style={styles.item}>
        <Image style={styles.image} source={{uri: item.productImage}} />
        <View style={styles.itemDetails}>
          <Text numberOfLines={1} style={styles.itemName}>
            {item.stockName}
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button}>
              <Icon name={'minus'} size={Metrics(15)} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.qty}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                addItemToCart(item.id);
              }}>
              <Icon name={'plus'} size={Metrics(15)} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightColon}>
          <TouchableOpacity>
            <Icon name={'trash-o'} size={Metrics(25)} color={Colors.bell} />
          </TouchableOpacity>
          <Text
            style={styles.price}>{`${item.totalPrice} ${item.currency}`}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sepet</Text>

      <View style={styles.items}>
        {detail.map(item => {
          return <Item key={item.id} item={item} />;
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginTop: Metrics(20), marginHorizontal: Metrics(20)},
  items: {
    borderTopWidth: 1,
    borderColor: Colors.seperator,
    marginTop: Metrics(20),
  },
  title: {
    textAlign: 'center',
    fontFamily: Fonts.regular,
    fontSize: Fonts.size(20),
    color: Colors.productTitle,
  },
  item: {
    width: '100%',
    height: Metrics(100),
    borderBottomWidth: 1,
    borderColor: Colors.seperator,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: Metrics(99),
    height: Metrics(99),
    backgroundColor: 'red',
  },
  itemDetails: {
    paddingVertical: Metrics(20),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Metrics(150),
  },
  itemName: {
    fontFamily: Fonts.regular,
    color: Colors.productTitle,
    fontSize: Fonts.size(10),
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Metrics(20),
  },
  button: {
    width: Metrics(30),
    height: Metrics(30),
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: Colors.seperator,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {fontFamily: Fonts.regular, color: Colors.productTitle},
  rightColon: {
    paddingVertical: Metrics(20),
    alignItems: 'flex-end',
    marginRight: Metrics(10),
    height: '100%',
    justifyContent: 'space-between',
    width: Metrics(70),
  },
  price: {fontFamily: Fonts.bold, color: Colors.primary},
});

export default CartItems;
