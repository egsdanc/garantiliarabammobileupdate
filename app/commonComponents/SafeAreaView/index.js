import React from 'react';
import {SafeAreaView as SafeAreaViewRN} from 'react-native';
export const SafeAreaView = rest => (
  <SafeAreaViewRN {...rest} style={[{flex: 1}, rest.style]} />
);
export default SafeAreaView;
