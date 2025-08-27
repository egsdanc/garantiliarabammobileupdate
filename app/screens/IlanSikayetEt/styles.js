import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  labelText: {
    marginVertical: 20,
  },
  checkBox: {
    paddingHorizontal: 10,
    width: '100%',
    marginLeft: 0,
  },
  checked: {
    borderColor: '#d92b2b',
    color: '#d92b2b',
  },
  checkedText: {
    color: '#d92b2b',
  },
  input: {
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 5,
    padding: 15,
    paddingVertical: 20,
    width: '100%',
    borderBottomWidth: 0,
    marginTop: 20,
    minHeight: 46,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
