import React, {memo, useState} from 'react';
import {ListItem} from 'react-native-elements';
import {styles} from './styles';
import {Icon} from 'react-native-elements';
import {BaseColor} from '@config';
const SectionItem = memo(({item: {selected = false, value}}) => {
  const [_value, setValue] = useState(selected);
  return (
    <ListItem
      title={value}
      bottomDivider
      onPress={() => setValue(s => !s)}
      containerStyle={styles.sectionItem}
      rightIcon={
        _value ? (
          <Icon name={'circle'} type="feather" color="gray" size={20} />
        ) : (
          <Icon name={'checkcircle'} type="antdesign" color="gray" size={20} />
        )
      }
    />
  );
});

const SectionHeader = memo(({title}) => {
  return (
    <ListItem
      containerStyle={styles.sectionHeader}
      title={title}
      titleStyle={styles.sectionHeaderTitle}
      bottomDivider
    />
  );
});

export {SectionItem, SectionHeader};
