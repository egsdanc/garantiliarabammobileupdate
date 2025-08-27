import {StyleSheet} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 10,
    flexGrow: 1,
  },
  avatarWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  inputLabel: {
    fontWeight: '300',
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 14,
    fontWeight: '200',
  },
  selectInput: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    minHeight: 40,
  },
  dateButtonContainer: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    marginTop: 5,
    borderColor: BaseColor.grayColor,
  },
  calendar: {paddingLeft: 10, fontWeight: '300', fontSize: 16},
  dateTitleStyle: {color: '#000', fontWeight: '300', fontSize: 16},
  radioWrapper: {flexDirection: 'row'},
  switchWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  switchContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  switch: {
    padding: 5,
  },
});
