import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const guidelineBaseWidth = 393;

const Metrics = size => {
  return (windowWidth / guidelineBaseWidth) * size;
};

export default Metrics;
