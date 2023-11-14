import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import TopBar from '../components/TopBar';
import Colors from '../styles/Colors';
import CategoryList from '../components/CategoryList';
import axios from 'axios';
import {GUID, URLS} from '../networks';

const Categories = ({navigation}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);
  const backFromCategories = () => {
    navigation.goBack();
  };
  const getCategories = async () => {
    await axios
      .get(URLS.categories, {
        headers: {
          GUID: GUID,
        },
      })
      .then(({data}) => {
        setCategories(data.data.categories);
      })
      .catch(err => {
        console.warn('get Categories', err);
      });
  };
  const toCategory = id => {
    navigation.push('ProductsScreen', {
      id: id,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopBar menuButtonOnPress={backFromCategories} />
      <CategoryList categories={categories} categoryItemOnPress={toCategory} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Categories;
