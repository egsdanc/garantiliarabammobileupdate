import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import { curry, merge } from 'ramda';
import { Text, Image } from '@components';

const defaultProps = {
  size: 'large',
  color: 'red',
  backgroundColor: '#00000080',
  zIndex: 1000,
  loading: 'loading',
};

// withLoadingScreen:: Object -> Component -> Component
export const withLoadingScreen = curry((extraProps, Component) => {
  const { size, color, backgroundColor, zIndex, loading } = merge(
    defaultProps,
    extraProps || {},
  );

  const displayName = `withLoadingScreen(${Component.displayName ||
    Component.name ||
    'Component'})`;

  const WrappedComponent = React.forwardRef((props, ref) => {
    const innerRef = React.useRef(null);

    const attachRef = React.useCallback((el) => {
      innerRef.current = el;
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    }, [ref]);

    const isLoading = props[loading];

    return (
      <>
        {isLoading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor,
              zIndex,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Image
                style={{
                  width: 100,
                  height: 70,
                }}
                source={{
                  uri:
                    'https://www.garantiliarabam.com.tr/storage/2021/03/garantili-arabam-site-logo-300x138.png',
                }}
                resizeMode="contain"
              />
              <ActivityIndicator
                size={size}
                color={color}
              />
            </View>
          </View>
        )}
        <Component {...props} ref={attachRef} />
      </>
    );
  });

  WrappedComponent.displayName = displayName;
  WrappedComponent.WrappedComponent = Component;

  return hoistStatics(WrappedComponent, Component);
});

export default withLoadingScreen;
