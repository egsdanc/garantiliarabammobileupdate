import {StyleSheet} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

    paddingHorizontal: 10,
    paddingTop: 10,
    marginVertical: 5,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    height: 95,
    paddingTop: 10,
  },
  image: {height: 85, maxWidth: 150},
  title: {
    color: BaseColor.primaryColor,
    paddingVertical: 3,
    textTransform: 'capitalize',
  },
  carTitle: {paddingVertical: 3},
  contentRight: {
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
  },
  rightText: {
    paddingLeft: 5,
  },
  footer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  footerText: {textAlign: 'right'},
  footerIconWrapper: {
    flexDirection: 'row',
  },
  footerIcon: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  ticketWrapper: {position: 'absolute', left: 0, right: 0, paddingVertical: 5},
  ticket: {color: 'white', textAlign: 'center'},
  iconText: {
    paddingHorizontal: 4,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
