import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  navigationItemActive: {
    backgroundColor: BaseColor.black,
    height: 30,
    borderRadius: 10,
    marginLeft: 20,
  },
  navigationItem: {
    color: '#ffffff',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 15,
    marginTop: 5,
  },
});
