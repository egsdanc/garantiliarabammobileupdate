import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  card: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 20,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  btnContainer: {
    marginTop: 20,
    width: '100%',
  },
  descText: {
    fontSize: 13,
    color: BaseColor.grayColor,
  },
  expText: {
    fontSize: 16,
    fontWeight: '600',
  },
  labelText: {
    width: '100%',
    marginTop: 7,
    fontWeight: '300',
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
  },
  infoText: {
    marginTop: 7,
  },
  selectInput: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  selectInputContent: {
    backgroundColor: '#fff',
    paddingVertical: 0,
    fontSize: 16,
    fontWeight: '600',
  },
});
