import {StyleSheet} from 'react-native';
import {BaseColor} from './color';

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
  },
  bodyPaddingDefault: {
    paddingHorizontal: 20,
  },
  bodyMarginDefault: {
    marginHorizontal: 20,
  },
  textInput: {
    height: 46,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BaseColor.grayColor,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: BaseColor.whiteColor,
  },
});
