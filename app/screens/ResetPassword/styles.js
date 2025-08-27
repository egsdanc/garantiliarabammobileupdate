import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 65,
    padding: 10,
    width: '100%',
  },
  contain: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  wrapper: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColor.black,
  },
  logo: {
    marginTop: 10,
    marginBottom: 10,
    width: Utils.getWidthDevice() - 150,
    height: (Utils.getWidthDevice() - 150) / 2.6,
  },
  errorTxt: {
    color: BaseColor.primaryColor,
    marginTop: 10,
    width: '100%',
  },
});
