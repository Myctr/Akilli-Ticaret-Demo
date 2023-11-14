import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import Metrics from '../styles/Metrics';
import Fonts from '../styles/Fonts';

const CategoryCards = ({categories, categoryItemOnPress}) => {
  const Item = ({category}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          categoryItemOnPress(category.id);
        }}
        style={styles.category}>
        <Image
          style={styles.image}
          source={{uri: 'https://source.unsplash.com/1024x768/?vegetables'}}
        />
        <Text numberOfLines={2} style={styles.title}>
          {category.categoryName}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {categories.map(category => {
        return <Item key={category.id} category={category} />;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: Metrics(17.5),
    marginTop: Metrics(20),
    justifyContent: 'space-between',
  },
  category: {
    width: Metrics(84.5),
    height: Metrics(100),

    marginBottom: Metrics(5),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: Metrics(65),
    height: Metrics(65),
    borderRadius: 100,
  },
  title: {
    fontFamily: Fonts.regular,
    color: Colors.categoryCardTitle,
    fontSize: Fonts.size(8),
    textAlign: 'center',
  },
});

export default CategoryCards;
