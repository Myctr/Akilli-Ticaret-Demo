import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Colors from '../styles/Colors';
import TopBar from '../components/TopBar';
import HorizantalCategories from '../components/HorizantalCategories';
import HorizantalSubCategories from '../components/HorizantalSubCategories';
import ProductList from '../components/ProductList';
import axios from 'axios';
import {URLS, GUID} from '../networks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setCart} from '../redux/actions';
import {useDispatch} from 'react-redux';

const Products = ({navigation, route}) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  let pageNumber = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    getCategories(route.params.id);
  }, [route.params.id]);

  useEffect(() => {
    if (selectedCategory) {
      getSubCategories(selectedCategory.id);
    }
  }, [selectedCategory]);
  useEffect(() => {
    if (selectedSubCategory) {
      getProducts(selectedSubCategory.id);
    }
  }, [selectedSubCategory, page]);

  const getCategories = async id => {
    await axios
      .get(`${URLS.categories}?parentId=${id}`, {
        headers: {
          GUID: GUID,
        },
      })
      .then(({data}) => {
        if (data.data.categories.length > 0) {
          setCategories(data.data.categories);
          setSelectedCategory(data.data.categories[0]);
        }
      })
      .catch(err => {
        console.warn('get Categories', err);
      });
  };
  const getSubCategories = async id => {
    await axios
      .get(`${URLS.categories}?parentId=${id}`, {
        headers: {
          GUID: GUID,
        },
      })
      .then(({data}) => {
        if (data.data.categories.length > 0) {
          setSubCategories(data.data.categories);
          setSelectedSubCategory(data.data.categories[0]);
        } else {
          setSelectedSubCategory(selectedCategory);
        }
      })
      .catch(err => {
        console.warn('get Sub Categories', err);
      });
  };

  const getProducts = async id => {
    await axios
      .get(
        `${URLS.products}?Id=${id}&PageNumber=${page}&PageSize=${pageNumber}`,
        {
          headers: {
            GUID: GUID,
          },
        },
      )
      .then(({data}) => {
        if (data.data.length > 0) {
          setProducts([...products, ...data.data]);
        }
      })
      .catch(err => {
        console.warn('get Categories', err);
      });
  };
  const categoryOnPress = category => {
    setSelectedCategory(category);
    getSubCategories(category.id);
    setPage(1);
    setProducts([]);
  };
  const subCategoryOnPress = category => {
    setSelectedSubCategory(category);
    setPage(1);
    setProducts([]);
  };

  const productOnPress = () => {
    alert('Product On Press');
  };
  const toCategories = () => {
    navigation.goBack();
  };
  const onEndReached = () => {
    setPage(page + 1);
  };

  const addToCart = async id => {
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
      <HorizantalCategories
        categories={categories}
        selectedCategory={selectedCategory}
        categoryOnPress={categoryOnPress}
      />
      <HorizantalSubCategories
        subCategories={subCategories}
        selectedSubCategory={selectedSubCategory}
        subCategoryOnPress={subCategoryOnPress}
      />
      <ProductList
        data={products}
        productOnPress={productOnPress}
        onEndReached={onEndReached}
        addToCart={addToCart}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});

export default Products;
