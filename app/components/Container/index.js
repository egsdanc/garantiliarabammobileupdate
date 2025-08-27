import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const index = ({children, row, center}) => {
  return (
    <View
      style={[
        styles.container,
        row && {flexDirection: 'row'},
        center && {alignItems: 'center'},
      ]}>
      {children}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
