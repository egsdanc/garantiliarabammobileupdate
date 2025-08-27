import React from 'react';
import {View, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function index(props) {
  return (
    <KeyboardAwareScrollView
      scrollEnabled={true}
      extraScrollHeight={-64}
      keyboardShouldPersistTaps="handled"
      accessible={false}
      enableAutoAutomaticScroll={false}
      enableOnAndroid={true}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      {...props}>
      {props.children}
    </KeyboardAwareScrollView>
  );
}
