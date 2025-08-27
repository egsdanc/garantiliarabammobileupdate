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
  topContent: {
    alignItems: 'center',
  },
  topContentText: {
    flex: 1,
    padding: 10,
  },
  image: {
    height: 80,
    width: 80,
  },
  input: {
    paddingTop: 15,
    margin: 0,
    fontWeight: '300',

    flex: 1,
  },
  block: {
    borderBottomWidth: 2,
    borderBottomColor: BaseColor.fieldColor,
  },
  helpWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    paddingRight: 10,
  },
});
