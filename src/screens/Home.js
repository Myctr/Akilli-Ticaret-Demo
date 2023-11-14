import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import TopBar from '../components/TopBar';
import BannerSlider from '../components/BannerSlider';
import CategoryCards from '../components/CategoryCards';
import axios from 'axios';
import {GUID, URLS} from '../networks';
import Colors from '../styles/Colors';
import {useSelector} from 'react-redux';

const Home = ({navigation}) => {
  const [categories, setCategories] = useState([]);

  const user = useSelector(state => state.user);

  useEffect(() => {
    getCategories();
  }, []);

  const toCategories = () => {
    if (user.isLoggedIn) {
      navigation.navigate('CategoriesScreen');
    } else {
      navigation.navigate('Profile');
    }
  };
  const toCategory = id => {
    navigation.push('ProductsScreen', {
      id: id,
    });
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
  return (
    <SafeAreaView style={styles.container}>
      <TopBar menuButtonOnPress={toCategories} />
      <ScrollView>
        <BannerSlider />
        <CategoryCards
          categories={categories}
          categoryItemOnPress={toCategory}
        />
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

export default Home;
