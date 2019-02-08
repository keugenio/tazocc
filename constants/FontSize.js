import {Dimensions} from 'react-native';

const {width, height}=Dimensions.get('window');

const aspectRatio = height/width;
if (aspectRatio > 1.6){
  FONTSIZE = 17;
  FONTSIZE_STR = '17';
} else {
  FONTSIZE = 50;
  FONTSIZE_STR = '50';
}

export default {
  FONTSIZE
}