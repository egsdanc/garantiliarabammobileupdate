import React from 'react';
import {Switch} from 'react-native';
import {BaseColor} from '@config';

export default function Toggle({scale = 0.7, value = 0, setValue}) {
  return (
    <Switch
      trackColor={{
        false: BaseColor.grayColor,
        true: BaseColor.primaryColor,
      }}
      style={{transform: [{scaleX: scale}, {scaleY: scale}]}}
      thumbColor={'#fff'}
      ios_backgroundColor={BaseColor.fieldColor}
      onValueChange={() => setValue(value === 0 ? 1 : 0)}
      value={value === 1}
    />
  );
}
