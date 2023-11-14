import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import Metrics from '../styles/Metrics';
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useSelector} from 'react-redux';

const ProductList = ({data, productOnPress, onEndReached, addToCart}) => {
  const cart = useSelector(state => state.cart);

  const renderItem = ({item}) => {
    let cartItemStatus = cart.detail.find(x => x.id == item.id);

    return (
      <TouchableOpacity style={styles.product} onPress={productOnPress}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addToCart(item.id);
          }}>
          <Icon
            name={'plus-circle'}
            size={Metrics(25)}
            color={Colors.addButton}
          />
        </TouchableOpacity>
        {cartItemStatus && (
          <TouchableOpacity style={styles.sourButton}>
            <Icon
              name={'minus-circle'}
              size={Metrics(25)}
              color={Colors.addButton}
            />
          </TouchableOpacity>
        )}

        <Image
          source={{uri: item.productImages[0].imagePath}}
          style={styles.image}
        />
        <View style={styles.priceContainer}>
          {item.discountRate != 0 && (
            <Text style={styles.discount}>
              {`${item.listPrice} ${item.currency}  `}
            </Text>
          )}
          <Text style={styles.price}>{`${item.price} ${item.currency}`}</Text>
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {item.stockName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      columnWrapperStyle={styles.columnWrapperStyle}
      numColumns={3}
      onEndReached={onEndReached}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: Metrics(20),
    marginTop: Metrics(10),
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginVertical: Metrics(10),
  },
  product: {
    width: Metrics(111),
    height: Metrics(160),

    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: Metrics(100),
  },
  priceContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  price: {
    fontFamily: Fonts.bold,
    color: Colors.primary,
    fontSize: Fonts.size(10),
    alignItems: 'center',
    textAlign: 'center',
  },
  discount: {
    fontFamily: Fonts.bold,
    color: Colors.categoryCardTitle,
    fontSize: Fonts.size(9),
    textAlign: 'center',
    textDecorationLine: 'line-through',
  },
  title: {
    fontFamily: Fonts.light,
    color: Colors.productTitle,
    fontSize: Fonts.size(9),
    alignItems: 'center',
    textAlign: 'center',
    marginTop: Metrics(5),
  },
  addButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
  sourButton: {
    position: 'absolute',
    right: 0,
    top: Metrics(70),
    zIndex: 2,
  },
});

export default ProductList;
