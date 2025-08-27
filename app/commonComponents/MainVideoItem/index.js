import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, Button, Icon } from '../index';
import AppImage from '../AppImage';
import { BaseColor } from '../../config';
// import YouTube from "react-native-youtube";

export const MainVideoItem = ({ videoId }) => {
  return (
    <Block
      color="#F2F3F5"
      center
      paddingBottom={16}
      paddingTop={16}
      flex={1}
      style={{ backgroundColor: BaseColor.whiteColor }}>
      <Block noflex row padding>
        {/* <YouTube
              videoId={videoId} // The YouTube video ID
              play={false} // control playback of video with true/false
              fullscreen={false} // control whether the video should play in fullscreen or inline
              loop={false} // control whether the video should loop when ended
              onReady={e => {}}
              onChangeState={e => {}}
              onChangeQuality={e => {}}
              onError={e => {
              }}
              style={{ width: '100%', alignSelf: 'stretch', height: 300 }}
              apiKey={"AIzaSyBVtBIWGJtHcsdbbuS2ARAtGyUHOJ1Q1F4"}/> */}
      </Block>
    </Block>
  );
};

export default MainVideoItem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
});
