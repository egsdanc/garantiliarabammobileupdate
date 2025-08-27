import hoistStatics from 'hoist-non-react-statics';
import {BaseColor} from '../config';
import React, {useState} from 'react';
import {TouchableOpacity, Icon} from '../commonComponents';

export const withSecureText = Component => {
  const displayName = `withSecureText(${Component.displayName ||
    Component.name})`;
  const C = React.forwardRef((props, ref) => {
    const [secure, setSecure] = useState(true);
    return (
      <Component
        renderRight={_ => {
          return (
            <TouchableOpacity
              center
              middle
              onPress={() => setSecure(bool => !bool)}>
              <Icon
                name={secure ? 'eye' : 'eye-slash'}
                size={22}
                color={
                  secure ? BaseColor.primaryColor : BaseColor.darkPrimaryColor
                }
              />
            </TouchableOpacity>
          );
        }}
        secureTextEntry={secure}
        ref={ref}
        {...props}
      />
    );
  });
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withSecureText;
