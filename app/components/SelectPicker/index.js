import React, {useState, useCallback, useEffect} from 'react';
import {Keyboard} from 'react-native';
import ActionSheet from './actionSheet';
import ModalSheet from './modal';
import {ListItem} from 'react-native-elements';
import {BaseStyle, BaseColor} from '@config';

import {Icon, Text} from '@components';
import {styles} from './styles';
export default function SelectPicker({
  title,
  subtitle,
  rightTitle = 'Seciniz',
  selectIndex = 0,
  onChange,
  textKey = 'title',
  list = [],
}) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    list.map(l => (l.isChecked = false));
    //clear the old checked
  }, [list]);
  const openActionSheet = () => {
    Keyboard.dismiss();
    setVisible(true);
  };
  const onSave = useCallback(
    choseIndex => {
      setVisible(false);
      list.map(l => (l.isChecked = false));
      list[choseIndex].isChecked = true;
      setSelected(list[choseIndex][textKey]);
      onChange(choseIndex);
    },
    [setVisible, setSelected, onChange, list, textKey],
  );
  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  return (
    <>
      <ListItem
        title={title}
        bottomDivider
        onPress={() => openActionSheet()}
        chevron={
          <Icon name="angle-right" size={18} color={BaseColor.primaryColor} />
        }
        subtitle={selected}
        subtitleStyle={styles.subtitleStyle}
        rightTitle={!selected ? rightTitle : ''}
      />

      <ActionSheet
        visible={visible}
        textKey={textKey}
        list={list}
        title={title}
        onClose={onClose}
        onSave={onSave}
      />
    </>
  );
}
