import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {ImageSlider} from 'react-native-image-slider-banner';
import Metrics from '../styles/Metrics';
import Colors from '../styles/Colors';

const BannerSlider = () => {
  const bannerImages = [
    {img: 'https://source.unsplash.com/1024x768/?ad'},
    {img: 'https://source.unsplash.com/1024x768/?ad'},
    {img: 'https://source.unsplash.com/1024x768/?ad'},
    {img: 'https://source.unsplash.com/1024x768/?ad'},
  ];

  return (
    <View style={styles.container}>
      <ImageSlider
        data={bannerImages}
        autoPlay={false}
        showHeader={false}
        onClick={undefined}
        preview={false}
        closeIconColor="#fff"
        indicatorContainerStyle={styles.indicatorContainerStyle}
        caroselImageStyle={styles.caroselImageStyle}
        caroselImageContainerStyle={styles.caroselImageContainerStyle}
        activeIndicatorStyle={styles.activeIndicatorStyle}
        inActiveIndicatorStyle={styles.inActiveIndicatorStyle}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: Metrics(10),
    width: '100%',
    height: Metrics(200),
    alignSelf: 'center',
  },
  indicatorContainerStyle: {
    bottom: Metrics(-15),
  },
  caroselImageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  caroselImageContainerStyle: {
    borderRadius: 10,
    width: Metrics(373),
    height: Metrics(200),
    marginHorizontal: Metrics(10),
  },
  activeIndicatorStyle: {
    backgroundColor: Colors.primary,
    width: Metrics(7),
    height: Metrics(7),
    borderRadius: 100,
    margin: Metrics(2),
  },
  inActiveIndicatorStyle: {
    backgroundColor: Colors.inactiveIndicator,
    width: Metrics(7),
    height: Metrics(7),
    borderRadius: 100,
    margin: Metrics(3),
    borderWidth: 0.2,
    borderColor: Colors.black,
  },
});

export default BannerSlider;
