import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  card: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  selectedCard: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#d92b2b',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 2.5,
    backgroundColor: '#000',
    marginRight: 7,
  },
  dotWhite: {
    height: 5,
    width: 5,
    borderRadius: 2.5,
    backgroundColor: '#fff',
    marginRight: 7,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
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
});
