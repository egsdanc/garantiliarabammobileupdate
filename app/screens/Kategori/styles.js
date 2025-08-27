import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    flex: 1,
  },
  navigationItemActive: {
    backgroundColor: BaseColor.black,
    height: 30,
    borderRadius: 10,
  },
  navigationItem: {
    color: '#ffffff',
    marginLeft: 15,
    marginRight: 15,
    fontWeight: '600',
    fontSize: 15,
    marginTop: 5,
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.fieldColor,
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
});
