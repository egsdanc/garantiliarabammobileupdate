import {StyleSheet} from 'react-native';
import {BaseColor, PinkColor} from '@config';
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  sectionHeader: {
    backgroundColor: BaseColor.fieldColor,
    padding: 8,
  },
  sectionItem: {
    paddingVertical: 10,
  },
  sectionHeaderTitle: {
    color: BaseColor.darkPrimaryColor,
  },
});
