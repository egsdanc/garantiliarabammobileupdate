import React, { useState, memo, useCallback } from 'react';
import { Button, Icon, Text } from '@components';
import { View, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { normalize, ListItem, CheckBox } from 'react-native-elements';
import { styles } from './styles';
const CustomModal = memo(
  ({
    visible = false,
    list,
    onSave = () => { },
    onClose = () => { },
    type = 'selectbox',
    title,
    textKey = 'title',
    selectedIndex = 0,
    buttonText = 'Vazgeç',
  }) => {
    const RenderBottomSheet = useCallback(
      ({ item, index }) => (
        <BottomSheet
          item={item}
          index={index}
          onSave={onSave}
          textKey={textKey}
        />
      ),
      [],
    );
    const RenderSelectBox = useCallback(
      ({ item, index }) => (
        <SelectBox
          item={item}
          index={index}
          onSave={onSave}
          textKey={textKey}
        />
      ),
      [],
    );
    const RenderFlatListByType = useCallback(() => {
      switch (type) {
        case 'selectbox':
          return (
            <FlatList
              data={list}
              ListHeaderComponent={
                <ListItem title={<Text body1>{title}</Text>} bottomDivider />
              }
              contentContainerStyle={styles.flatListContainer}
              showsVerticalScrollIndicator={false}
              renderItem={RenderSelectBox}
              keyExtractor={item => item.key}
            />
          );
        case 'bottomSheet':
          return (
            <FlatList
              data={list}
              ListHeaderComponent={
                <ListItem title={<Text body1>{title}</Text>} bottomDivider />
              }
              contentContainerStyle={styles.flatListContainer}
              showsVerticalScrollIndicator={false}
              renderItem={RenderBottomSheet}
              keyExtractor={item => item.id}
            />
          );
      }
    }, []);

    return (
      <Modal
        isVisible={visible}
        onBackdropPress={() => onClose()}
        animationOut="fadeOutDown"
        hideModalContentWhileAnimating={true}
        style={styles.modalContainer}
        useNativeDriver={true}>
        <View style={styles.contentWrapper}>
          <RenderFlatListByType />
          <Button full onPress={() => onClose()}>
            {buttonText}
          </Button>
        </View>
      </Modal>
    );
  },
);
export default CustomModal;

const SelectBox = memo(({ item, index, textKey, onSave }) => {
  const [check, setCheck] = useState(item.isChecked);

  return (
    <ListItem
      title={<Text body1>{item[textKey]}</Text>}
      onPress={() => {
        setCheck(true);
        onSave(index);
      }}
      leftIcon={
        <Icon
          name={check ? 'check-circle' : 'circle'}
          color="red"
          type="feather"
          size={24}
        />
      }
      bottomDivider
    />
  );
});
const BottomSheet = memo(({ item, index, onSave, textKey }) => {
  return (
    <ListItem
      title={<Text body1>{item[textKey]}</Text>}
      onPress={() => onSave(index)}
      leftIcon={
        item.icon ? (
          <Icon
            name={item.icon}
            color="red"
            type={item.iconType || 'feather'}
            size={24}
          />
        ) : null
      }
      bottomDivider
    />
  );
});

const renderMultiSelect = memo((item, index) => {
  return (
    <ListItem
      title={<Text body1>{item?.title || item.name}</Text>}
      leftElement={<CheckBox checked={true} />}
      bottomDivider
    />
  );
});
