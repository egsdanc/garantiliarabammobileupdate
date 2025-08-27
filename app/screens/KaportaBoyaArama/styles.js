import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor, BaseStyle} from '@config';

export default StyleSheet.create({
  contentButtonBottom: {
    borderTopColor: BaseColor.textSecondaryColor,
    borderTopWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  blockView: {
    paddingVertical: 10,
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
  },
  roundedView: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#cc0033',
    borderRadius: 10,
  },
  roundedView2: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#cc0033',
    borderWidth: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  roundedViewText: {
    color: '#ffffff',
    fontSize: 12,
  },
  roundedViewText2: {
    color: '#cc0033',
    fontSize: 12,
  },
  roundedViewColored: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#cc0033',
    borderRadius: 10,
    borderColor: '#cc0033',
    borderWidth: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  roundedViewColoredText: {
    color: '#fff',
    fontSize: 12,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
});
