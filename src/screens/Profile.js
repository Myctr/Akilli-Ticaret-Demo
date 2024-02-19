import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Colors from '../styles/Colors';
import Metrics from '../styles/Metrics';
import Fonts from '../styles/Fonts';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios';
import {GUID, URLS} from '../networks';
import {setUser, setCart} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [secure, setSecure] = useState(true);

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const passwordRef = useRef();
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address.')
      .required('Email address is required.'),
    password: Yup.string().required('Password field cannot be empty.'),
  });
  const eyeIconOnPress = () => {
    setSecure(!secure);
  };
  const onSubmitEditing = () => {
    passwordRef.current.focus();
  };
  const onSubmit = async values => {
    await axios
      .post(
        URLS.login,
        {
          username: values.email,
          password: values.password,
        },
        {
          headers: {
            GUID: GUID,
          },
        },
      )
      .then(({data}) => {
        console.log(data);
        dispatch(
          setUser({
            firstName: 'Akıllı',
            lastName: 'Ticaret',
            email: values.email,
            isLoggedIn: true,
          }),
        );
        getCart(data.data.token);
        AsyncStorage.setItem('token', data.data.token);
        AsyncStorage.setItem('expiration', data.data.expiration);
        AsyncStorage.setItem('refreshToken', data.data.refreshToken);
      });
  };
  const getCart = token => {
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
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Akıllı Ticaret</Text>
      </View>
      {user.isLoggedIn ? (
        <View>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({values, handleChange, handleSubmit, errors}) => (
            <View style={styles.form}>
              <TextInput
                style={[styles.input, errors.email && {borderColor: 'red'}]}
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Email*"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={onSubmitEditing}
              />
              <View>
                <TextInput
                  ref={passwordRef}
                  style={[
                    styles.input,
                    errors.password && {borderColor: 'red'},
                  ]}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Password*"
                  secureTextEntry={secure}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
                <TouchableOpacity style={styles.icon} onPress={eyeIconOnPress}>
                  <Icon
                    name={secure ? 'eye-slash' : 'eye'}
                    size={Metrics(20)}
                    color={Colors.black}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {alignItems: 'center'},
  input: {
    width: Metrics(320),
    height: Metrics(50),
    backgroundColor: Colors.categoryBorder,
    marginBottom: Metrics(10),
    borderRadius: 10,
    paddingHorizontal: Metrics(10),
    fontFamily: Fonts.regular,
    borderWidth: 1,
    borderColor: Colors.categoryBorder,
  },
  button: {
    width: Metrics(100),
    height: Metrics(50),
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics(20),
  },
  buttonText: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    fontSize: Fonts.size(14),
  },
  logoContainer: {
    backgroundColor: Colors.primary,
    padding: Metrics(10),
    borderRadius: 10,
    marginBottom: Metrics(50),
  },
  logo: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    fontSize: Fonts.size(30),
  },
  icon: {position: 'absolute', right: Metrics(10), top: Metrics(15)},
  email: {fontFamily: Fonts.regular},
});

export default Profile;
