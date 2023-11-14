import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import Metrics from '../styles/Metrics';
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';

const HorizantalCategories = ({
  categories,
  selectedCategory,
  categoryOnPress,
}) => {
  const Item = ({item}) => {
    let isSelected = item.id == selectedCategory?.id;
    return (
      <TouchableOpacity
        onPress={() => {
          categoryOnPress(item);
        }}
        style={styles.category}>
        <View
          style={
            isSelected ? styles.selectedImageContainer : styles.imageContainer
          }>
          <Image
            style={styles.image}
            source={{uri: item.imagePath.imagePath}}
          />
        </View>

        <Text
          numberOfLines={2}
          style={isSelected ? styles.selectedTitle : styles.title}>
          {item.categoryName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category => {
          return <Item key={category.id} item={category} />;
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: Metrics(10),
    paddingHorizontal: Metrics(10),
    height: Metrics(110),
  },
  category: {
    width: Metrics(75),
    marginHorizontal: Metrics(10),
    paddingTop: Metrics(10),
    alignItems: 'center',
  },
  selectedImageContainer: {
    width: Metrics(60),
    height: Metrics(60),
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 10,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    width: Metrics(60),
    height: Metrics(60),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.size(9),
    color: Colors.categoryCardTitle,
    textAlign: 'center',
    marginTop: Metrics(10),
  },
  selectedTitle: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.size(9),
    color: Colors.logoText,
    textAlign: 'center',
    marginTop: Metrics(10),
  },
});

export default HorizantalCategories;
