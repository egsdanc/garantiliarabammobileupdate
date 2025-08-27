import React, {useState, useCallback, memo} from 'react';
import {ListItem} from 'react-native-elements';
import {styles} from './styles';
import {BaseColor} from '@config';
import {Icon, Text as Txt, Block, TouchableOpacity} from '@common';
import {ActionSheet} from '@components';

import {packageImages} from '@assets/images/packages/export';
const SectionItem = memo(
  ({item: {selected = false, title, avatar, subtitle, actionData}}) => {
    const [visible, setVisible] = useState(false);
    const [_subtıtle, setSubtitle] = useState(subtitle);

    const onClose = useCallback(() => setVisible(false), [setVisible]);
    const onSelect = useCallback(
      selectIndex => {
        setVisible(false);
        setSubtitle(actionData[selectIndex].title);
      },
      [setSubtitle, actionData, setVisible],
    );
    return (
      <>
        <ListItem
          title={title}
          subtitle={_subtıtle}
          bottomDivider
          onPress={() => setVisible(v => !v)}
          leftAvatar={{
            source: packageImages[avatar],
          }}
          subtitleStyle={{color: 'gray'}}
          containerStyle={styles.sectionItem}
          chevron={
            <Icon name="angle-right" size={18} color={BaseColor.primaryColor} />
          }
        />
        <ActionSheet
          visible={visible}
          onClose={onClose}
          title="Paket Seçiniz"
          onSave={onSelect}
          list={actionData}
          type="bottomSheet"
        />
      </>
    );
  },
);

const SectionHeader = memo(({title}) => {
  return (
    <ListItem
      containerStyle={styles.sectionHeader}
      title={title}
      titleStyle={styles.sectionHeaderTitle}
      rightIcon={
        <Icon
          name="help-circle"
          color={BaseColor.primaryColor}
          type="feather"
          size={24}
        />
      }
    />
  );
});

export {SectionItem, SectionHeader};
