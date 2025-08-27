import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  //block css
  blockContain: {},
  blockImage: {
    height: Utils.scaleWithPixel(140),
    width: '100%',
  },
  blockRow: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  //list css
  listImage: {
    height: Utils.scaleWithPixel(80),
    width: Utils.scaleWithPixel(120),
  },
  listContent: {
    flexDirection: 'row',
  },
  listContentRight: {
    padding: 10,
    paddingTop: 0,
    flex: 1,
  },
  listContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  listContentService: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginRight: 5,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 10,
  },
  contentPrice: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  //gird css
  girdImage: {
    borderRadius: 8,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    height: Utils.scaleWithPixel(120),
    width: '100%',
  },
  girdContent: {
    flexDirection: 'column',
    flex: 1,
  },
  girdContentRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    alignItems: 'center',
  },
});
