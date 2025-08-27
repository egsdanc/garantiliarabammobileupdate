import React from 'react';
import * as Progress from 'react-native-progress';
import {Block} from "../Block"
import {Text} from "../Text"
import { BaseColor } from '../../config';

export const StepProgress = ({
  totalStep = 5,
  step = 1,
  width = 150,
  height = 8,
  color = BaseColor.darkPrimaryColor,
  borderWidth = 4,
  unfilledColor = '#303030',
  borderColor = '#4B4B4B',
  useNativeDriver = true,
  borderRadius = 50,
  ...rest
}) => {
  return (
    <Block {...rest}>
      <Text my1 mx3 middle >
        İlan Detaylar <Text bold color={color}>{step}</Text>/{totalStep}
      </Text>
      <Progress.Bar
        color={color}
        height={height}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
        unfilledColor={unfilledColor}
        borderColor={borderColor}
        useNativeDriver={useNativeDriver}
        progress={step / totalStep}
        width={width}
      />
    </Block>
  );
};

export default StepProgress;