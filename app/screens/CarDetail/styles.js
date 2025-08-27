import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    height: Utils.scaleWithPixel(220),
    justifyContent: 'flex-end',
  },
  contentPage: {
    bottom: 0,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  tabbar: {
    backgroundColor: '#F9F9F9',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.textSecondaryColor,
  },
  tab: {
    minWidth: 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    backgroundColor: BaseColor.primaryColor,
    height: 3,
    width: '80%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 2,
  },
  line: {
    height: 1,
    backgroundColor: BaseColor.textSecondaryColor,
    marginTop: 5,
    marginBottom: 5,
  },
  contentActionBottom: {
    padding: 8,
    flexDirection: 'row',
  },
  itemAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentFilterBottom: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: BaseColor.whiteColor,
  },
  contentSwipeDown: {
    paddingTop: 10,
    alignItems: 'center',
  },
  lineSwipeDown: {
    width: 30,
    height: 2.5,
    backgroundColor: BaseColor.dividerColor,
  },
  contentActionModalBottom: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
  },
  suspencionBackground: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentButtonBottom: {
    borderTopColor: BaseColor.textSecondaryColor,
    borderTopWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allCarsBtn: {
    marginRight: 10,
  },
  reportBtn: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  noExpertiseDataWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  actionItem: {
    flex: 1,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    padding: 3,
    paddingTop: 5,
    borderRadius: 5,
    borderColor: BaseColor.primaryColor,
  },
  buttonItem: {
    alignSelf: 'center',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
});
