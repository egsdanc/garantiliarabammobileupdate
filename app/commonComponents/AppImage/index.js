import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';

export const AppImage = ({url, ...otherProps}) => {
  const [source, setSource] = useState(
    require('../../assets/images/placeholder.png'),
  );
  return (
    <FastImage
      source={source}
      resizeMode={FastImage.resizeMode.cover}
      onLoadEnd={() => {
        setSource({uri: url});
      }}
      {...otherProps}
    />
  );
};
export default AppImage;
