import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Metrics from '../styles/Metrics';
import Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const TopBar = ({menuButtonOnPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.columns}>
        <TouchableOpacity onPress={menuButtonOnPress}>
          <Icon name={'bars'} size={Metrics(30)} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Akıllı Ticaret</Text>
        </View>
      </View>
      <View style={styles.columns}>
        <Text style={styles.location}>Bayraklı</Text>
        <Icon
          name={'location-arrow'}
          size={Metrics(20)}
          color={Colors.locationIcon}
        />
        <View style={styles.seperator} />
        <View style={styles.bell}>
          <Icon name={'bell-o'} size={Metrics(20)} color={Colors.bell} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Metrics(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics(20),
  },
  columns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginLeft: Metrics(15),
    backgroundColor: Colors.logoBG,
    padding: Metrics(10),
    borderRadius: 10,
    borderWidth: 0.5,
  },
  logoText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.size(15),
    color: Colors.logoText,
  },
  location: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.size(10),
    color: Colors.logoText,
    marginRight: Metrics(5),
  },
  seperator: {
    width: Metrics(2),
    height: Metrics(25),
    borderRadius: 100,
    backgroundColor: Colors.seperator,
    marginHorizontal: Metrics(10),
  },
  bell: {},
  badge: {
    position: 'absolute',
    right: Metrics(-3),
    top: Metrics(-3),
    width: Metrics(12),
    height: Metrics(12),
    backgroundColor: Colors.badge,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.size(7),
    color: Colors.white,
    textAlign: 'center',
  },
});

export default TopBar;
