import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Block, Text, Button, Icon} from '../index';
import AppImage from '../AppImage';
import {BaseColor} from '../../config';

export const MainSliderItem = ({image, onPress, title, subTitle}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Block
        color="#F2F3F5"
        center
        paddingBottom={16}
        paddingTop={16}
        flex={1}
        style={{backgroundColor: BaseColor.whiteColor}}>
        <Block noflex row padding>
          <AppImage style={styles.image} url={image} />
        </Block>
        <Block
          padding={5}
          height={25}
          width={'100%'}
          marginTop={-22}
          style={{backgroundColor: '#2196F3'}}>
          <Text style={{textAlign: 'center', width: '100%'}} whiteColor>
            Hatasız
          </Text>
        </Block>
        <Text
          size={20}
          style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}
          color={BaseColor.black}
          bold
          numberOfLines={1}
          marginTop>
          {title}
        </Text>
        <Text title4 color={BaseColor.grayColor}>
          {subTitle}
        </Text>
      </Block>
    </TouchableWithoutFeedback>
  );
};

export default MainSliderItem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
});
