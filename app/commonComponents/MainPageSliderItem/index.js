import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions, View} from 'react-native';
import Popup, {Block, Text} from '../index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppImage from '../AppImage';
import {BaseColor} from '../../config';

const sizes = Dimensions.get('window');

export const MainPageSliderItem = ({image, title, onPress, isFavorite}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Block width={sizes.width / 2 - 20} margin>
        <Block noflex>
          <AppImage style={styles.image} url={image} />
        </Block>
        <Block
          padding={5}
          height={25}
          borderBottomLeftRadius={5}
          borderBottomRightRadius={5}
          marginRight={9}
          marginTop={-22}
          style={{backgroundColor: '#2196F3'}}>
          <Text style={{textAlign: 'center', width: '100%'}} whiteColor>
            Hatasız
          </Text>
        </Block>
        <Block center row marginTop={10}>
          <Block>
            <Text
              noflex
              color={BaseColor.black}
              size={15}
              numberOfLines={2}
              bold>
              {title}
            </Text>
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};
export default MainPageSliderItem;

const styles = StyleSheet.create({
  image: {
    width: sizes.width / 2 - 30,
    height: sizes.width / 2 - 30,
    borderRadius: 4,
    shadowColor: BaseColor.black,
    shadowOffset: {width: 0, height: 9},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  favIcon: {
    position: 'absolute',
    right: 0,
    margin: 6,
    marginRight: 12,
  },
});
