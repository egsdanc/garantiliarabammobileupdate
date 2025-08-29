import React, { useState } from 'react';
import { Image } from 'react-native';

export const AppImage = ({ url, ...otherProps }) => {
  const [source, setSource] = useState(
    require('../../assets/images/placeholder.png'),
  );
  
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleLoadEnd = () => {
    if (!hasLoaded && url) {
      setSource({ uri: url });
      setHasLoaded(true);
    }
  };

  return (
    <Image
      source={source}
      resizeMode="cover"
      onLoadEnd={handleLoadEnd}
      {...otherProps}
    />
  );
};

export default AppImage;