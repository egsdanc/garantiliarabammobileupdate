import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '../../config';

export default StyleSheet.create({
  contain: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  wrapper: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColor.black,
  },
  contentPage: {
    bottom: 0,
  },
  contentActionBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  img: {
    width: Utils.scaleWithPixel(200),
    height: Utils.scaleWithPixel(200),
    borderRadius: Utils.scaleWithPixel(200) / 2,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    marginTop: 10,
    marginBottom: 10,
    width: Utils.getWidthDevice() - 210,
    height: (Utils.getWidthDevice() - 210) / 2.6,
  },
  textSlide: {
    textAlign: 'center',
    marginTop: 30,
  },
  container: {
    flex: 1,
    // paddingLeft: 30,
    // paddingRight: 30,
  },
  gradient: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
