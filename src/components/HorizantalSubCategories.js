import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import Metrics from '../styles/Metrics';
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';

const HorizantalSubCategories = ({
  subCategories,
  selectedSubCategory,
  subCategoryOnPress,
}) => {
  const Item = ({item}) => {
    let isSelected = item.id == selectedSubCategory?.id;
    return (
      <TouchableOpacity
        onPress={() => {
          subCategoryOnPress(item);
        }}
        style={isSelected ? styles.selectedCategory : styles.category}>
        <Text
          numberOfLines={1}
          style={isSelected ? styles.selectedTitle : styles.title}>
          {item.categoryName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {subCategories.map(category => {
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
  },
  category: {
    width: Metrics(100),
    height: Metrics(35),
    borderRadius: 100,
    marginHorizontal: Metrics(10),
    backgroundColor: Colors.subCategoryBG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategory: {
    width: Metrics(100),
    height: Metrics(35),
    borderRadius: 100,
    marginHorizontal: Metrics(10),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.size(9),
    color: Colors.categoryCardTitle,
    textAlign: 'center',
  },
  selectedTitle: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.size(9),
    color: Colors.white,
    textAlign: 'center',
  },
});

export default HorizantalSubCategories;
