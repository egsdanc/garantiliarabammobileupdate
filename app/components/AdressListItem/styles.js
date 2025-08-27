import {StyleSheet} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';

export const styles = StyleSheet.create({
  addressNameHolder: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressTitle: {
    color: BaseColor.darkPrimaryColor,
  },
  list: {},
  subGroupWrapper: {marginTop: 10},
});
