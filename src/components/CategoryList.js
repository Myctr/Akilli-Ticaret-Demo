import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Metrics from '../styles/Metrics';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const CategoryList = ({categories, categoryItemOnPress}) => {
  const Category = ({category}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          categoryItemOnPress(category.id);
        }}
        style={styles.category}>
        <Text>{category.categoryName}</Text>
        <Icon
          name={'angle-right'}
          size={Metrics(20)}
          color={Colors.categoryExpand}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {categories.map(category => {
        return <Category key={category.id} category={category} />;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderBottomWidth: 0,
    marginHorizontal: Metrics(10),
    marginTop: Metrics(20),
    borderColor: Colors.categoryBorder,
  },
  category: {
    width: '100%',
    height: Metrics(40),
    borderBottomWidth: 1,
    paddingHorizontal: Metrics(20),
    justifyContent: 'space-between',
    borderColor: Colors.categoryBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CategoryList;
