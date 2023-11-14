import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../styles/Colors';

const Search = () => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Search;
