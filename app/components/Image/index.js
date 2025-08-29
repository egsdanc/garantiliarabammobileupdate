// components/Image/index.js
import React, { memo, useCallback } from 'react';
import { Image as RNImage } from 'react-native';

export const Image = memo(({
  style,
  resizeMode = 'cover',
  fallbackSource,
  onError,
  onLoad,
  onLoadStart,
  onLoadEnd,
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

  // Source validation
  if (!source) {
    if (__DEV__) {
      console.warn('Image: source prop is required');
    }
    
    // Fallback source varsa onu kullan
    if (fallbackSource) {
      return (
        <RNImage
          style={style}
          source={fallbackSource}
          resizeMode={resizeMode}
          onError={handleError}
          onLoad={handleLoad}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          {...rest}
        />
      );
    }
    
    return null;
  }

  return (
    <RNImage
      style={style}
      source={source}
      resizeMode={resizeMode}
      onError={handleError}
      onLoad={handleLoad}
      onLoadStart={handleLoadStart}
      onLoadEnd={handleLoadEnd}
      {...rest}
    />
  );
});

Image.displayName = 'Image';

export default Image;