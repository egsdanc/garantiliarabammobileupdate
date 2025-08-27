import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Icon, Text, Button } from '@components';
import { useSelection } from '@common';
import PropTypes from 'prop-types';
import { BaseColor } from '@config';
import Modal from 'react-native-modal';
import { compose, withProps } from '@hocs';
import { find, last, prop, propEq, propOr } from 'ramda';

export const Sort = compose(
  withProps(({ options }) => {
    const result = useSelection(options || []);
    return result;
  }),
)(
  ({
    selectedlist,
    isAllSelected,
    toggleAllSelection,
    toggleSelection,
    isSelected,
    setSelected,
    options,
    value,
    onChange,
  }) => {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
      if (options && value) {
        setSelected([find(propEq('value', value), options)]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <>
        <Modal
          isVisible={modalVisible}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['down']}
          style={styles.bottomModal}>
          <View style={styles.contentFilterBottom}>
            <View style={styles.contentSwipeDown}>
              <View style={styles.lineSwipeDown} />
            </View>
            {(options || []).map((item, index) => (
              <TouchableOpacity
                style={styles.contentActionModalBottom}
                key={item.value}
                onPress={() => {
                  setModalVisible(true);
                  setSelected([item]);
                }}>
                <Text body2 semibold primaryColor={item.checked}>
                  <Icon
                    name={item.icon}
                    size={16}
                    color={BaseColor.grayColor}
                    solid
                    style={{ marginRight: 5 }}
                  />
                  {' ' + item.text}
                </Text>
                {isSelected(item) && (
                  <Icon name="check" size={14} color={BaseColor.primaryColor} />
                )}
              </TouchableOpacity>
            ))}
            <Button
              full
              style={{
                marginTop: 10,
                marginBottom: 20,
              }}
              onPress={() => {
                onChange(prop('value', last(selectedlist || [])));
                setModalVisible(false);
              }}>
              Uygula
            </Button>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => setModalVisible(true)}>
          <Icon
            name={propOr(prop('icon', last(selectedlist || [])), 'icon', value)}
            size={16}
            color={BaseColor.grayColor}
            solid
          />
          <Text headline grayColor style={{ marginLeft: 5 }}>
            {propOr(prop('text', last(selectedlist || [])), 'text', value)}
          </Text>
        </TouchableOpacity>
      </>
    );
  },
);

Sort.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Sort.defaultProps = {
  style: {},
  options: [
    {
      value: 'newDatesFirst',
      icon: 'sort-amount-down',
      text: 'Önce yeni ilanlar',
    },
    {
      value: 'newDatesLast',
      icon: 'sort-amount-up',
      text: 'Önce eski ilanlar',
    },
    {
      value: 'kmLessFirst',
      icon: 'sort-amount-down',
      text: 'Önce Km`si düşük',
    },
    {
      value: 'kmLessLast',
      icon: 'sort-amount-up',
      text: 'Önce Km`si yüksek',
    },
    {
      value: 'priceLowFirst',
      icon: 'sort-amount-down',
      text: 'Önce fiyatı düşük',
    },
    {
      value: 'priceLowLast',
      icon: 'sort-amount-up',
      text: 'Önce fiyatı yüksek',
    },
    {
      value: 'oldModelFirst',
      icon: 'sort-amount-down',
      text: 'Önce Model yılı düşük',
    },
    {
      value: 'oldModelLast',
      icon: 'sort-amount-up',
      text: 'Önce Model yılı yüksek',
    },
  ],
  value: 'newDatesLast',
  onChange: () => { },
};

export default Sort;
