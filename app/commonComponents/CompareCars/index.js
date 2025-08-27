import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { BaseColor } from '../../config';
import { compose, withProps } from '../../hocs';
import { Image } from '@components';
import * as Utils from '@utils';
import { useCompareCars } from '../../state/ducks/CompareCars';
import Block from '../Block';
import { TouchableOpacity } from '../TouchableOpacity';
import { Icon } from '../Icon';
import Text from '../Text';
import { head, split } from 'ramda';
const getImageUrl = thumb =>
  thumb &&
  `https://image.garantiliarabam.com/upload/${head(
    split('---', thumb),
  )}/thumb/${thumb}`;
export const CompareCarsPop = compose(
  withProps(useCompareCars),
  React.forwardRef,
)(
  (
    {
      dismissError,
      compareCars,
      addCar,
      removeCar,
      clearComparecar,
      data,
      loading,
      error,
      cars,
      canCompare,
      canAdd,
      canShow,
      navigation,
    },
    ref,
  ) => {
    const remove = useCallback(
      item => () => {
        removeCar(item);
      },
      [removeCar],
    );
    return canShow ? (
      <>
        <Block
          margin={[90, 0]}
          color="transparent"
          flex={false}
          style={{ backgroundColor: 'transparent' }}
        />
        <View style={styles.container}>
          {cars.map((item, index) => {
            return (
              <TouchableOpacity
                center
                key={index + 'k'}
                middle
                m1
                smallCard
                color="white"
                style={styles.item}
                onPress={remove(item)}>
                <Icon
                  name="ios-close-circle-outline"
                  type="ionicon"
                  style={styles.iconClose}
                  size={20}
                  color={BaseColor.primaryColor}
                />
                <Image
                  source={{ uri: getImageUrl(item.thumb) }}
                  style={styles.listImage}
                  resizeMode="contain"
                />
                <Text>{item.ad_title}</Text>
              </TouchableOpacity>
            );
          })}
          {canAdd && (
            <Block m1 center middle smallCard style={styles.item} color="white">
              <TouchableOpacity
                center
                middle
                // onPress={() => navigation.navigate('Home')}
                onPress={() => navigation.navigate('BottomTabNavigator', {
                  screen: 'Home' // Drawer içindeki Home screen'ine direkt git
                })}
              >
                <Icon
                  name="ios-add-circle-outline"
                  type="ionicon"
                  size={50}
                  color={BaseColor.primaryColor}
                />
              </TouchableOpacity>
            </Block>
          )}
          {canCompare && (
            <Block m1 center middle smallCard style={styles.item} color="white">
              <TouchableOpacity
                center
                middle
                onPress={() => navigation.navigate('CompareCars')}>
                <Icon
                  name="ios-repeat-sharp"
                  type="ionicon"
                  size={50}
                  color={BaseColor.primaryColor}
                />
              </TouchableOpacity>
            </Block>
          )}
        </View>
      </>
    ) : null;
  },
);

export default CompareCarsPop;

const styles = StyleSheet.create({
  listImage: {
    minHeight: Utils.scaleWithPixel(60),
    minWidth: Utils.scaleWithPixel(80),
    width: '65%',
    height: '65%',
    flex: 1,
  },
  container: {
    position: 'absolute',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    padding: 5,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'transparent',
    display: 'flex',
  },
  item: {
    ...Utils.elevationShadowStyle(),
    padding: 5,
  },
  iconClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
});
