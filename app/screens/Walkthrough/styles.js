import { StyleSheet } from 'react-native';
import * as Utils from '@utils';
import { BaseColor } from '../../config';

export default StyleSheet.create({
  contain: {
    paddingHorizontal: 10,
    marginVertical: 20,
    backgroundColor: BaseColor.textPrimaryColor,
  },
  mainContainer: {
    backgroundColor: BaseColor.textPrimaryColor,
  },
  wrapper: {
    width: '100%',
    height: Utils.getHeightDevice(),
  },
  contentPage: {
    bottom: 50,
  },
  contentActionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  img: {
    width: Utils.getWidthDevice(),
    height: Utils.getHeightDevice(),
  },
  skip: {
    position: 'absolute',
    top: 60,
    right: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  skipText: {
    fontSize: 15,
    fontWeight: '700',
    color: BaseColor.whiteColor,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textSlide: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 100,
  },
  textSlideTxt: {
    textAlign: 'center',
    color: BaseColor.whiteColor,
  },
  textSlideHeader: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
    marginBottom: 20,
    color: BaseColor.whiteColor,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
