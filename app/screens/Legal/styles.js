import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  linkButton: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: BaseColor.grayColor,
  },
  linkButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: BaseColor.primaryColor,
  },
});
