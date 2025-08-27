// components/Image/index.js
import React, { memo, useCallback } from 'react';
import FastImage from 'react-native-fast-image';

const resizeModeMap = {
  cover: FastImage.resizeMode.cover,
  contain: FastImage.resizeMode.contain,
  stretch: FastImage.resizeMode.stretch,
  center: FastImage.resizeMode.center,
};

export const Image = memo(({
  style,
  resizeMode = 'cover',
  fallbackSource,
  onError,
  onLoad,
  onLoadStart,
  onLoadEnd,
  onProgress,
  source,
  ...rest
}) => {
  const handleError = useCallback((error) => {
    if (__DEV__) {
      console.warn('Image load error:', error);
    }
    onError?.(error);
  }, [onError]);

  const handleLoad = useCallback((event) => {
    onLoad?.(event);
  }, [onLoad]);

  const handleLoadStart = useCallback(() => {
    onLoadStart?.();
  }, [onLoadStart]);

  const handleLoadEnd = useCallback(() => {
    onLoadEnd?.();
  }, [onLoadEnd]);

  const handleProgress = useCallback((event) => {
    onProgress?.(event);
  }, [onProgress]);

  // Source validation
  if (!source) {
    if (__DEV__) {
      console.warn('Image: source prop is required');
    }
    return null;
  }

  return (
    <FastImage
      style={style}
      source={source}
      fallback={fallbackSource}
      resizeMode={resizeModeMap[resizeMode] || FastImage.resizeMode.cover}
      onError={handleError}
      onLoad={handleLoad}
      onLoadStart={handleLoadStart}
      onLoadEnd={handleLoadEnd}
      onProgress={handleProgress}
      {...rest}
    />
  );
});

Image.displayName = 'Image';

// Default props
Image.defaultProps = {
  resizeMode: 'cover',
};

export default Image;