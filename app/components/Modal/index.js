import {Overlay, Icon, Divider} from 'react-native-elements';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {PureComponent} from 'react';
import Text from '../Text';
import PropTypes from 'prop-types';
// import {appLockControll} from '@assets/Variable';
import {BaseStyle, BaseColor} from '@config';

export const responseType = {
  success: 'success',
  error: 'error',
};

export default class CustomModal extends PureComponent {
  render() {
    const {
      visible,
      type,
      describe,
      subtitle,
      onBackdropPress,
      onPress,
      buttonText,
    } = this.props;

    return (
      <Overlay
        isVisible={visible}
        overlayBackgroundColor="white"
        borderRadius={12}
        width="auto"
        overlayStyle={styles.overlayStyle}
        onBackdropPress={() => onBackdropPress}
        height="auto"
        children={1}>
        <View>
          <View style={styles.iconWrapper}>
            <Icon
              raised
              name={type === responseType.success ? 'check' : 'times'}
              type="font-awesome"
              color={
                type === responseType.success
                  ? BaseColor.primaryColor
                  : BaseColor.error
              }
              reverse
              reverseColor={'#fff'}
              size={30}
              containerStyle={styles.iconStyle}
              // underlayColor={'green'}
            />
          </View>
          <View style={styles.overlayWrapper}>
            <View style={styles.space} />
            <Text>{describe}</Text>

            <View style={styles.space} />
          </View>
          <View style={styles.btn}>
            <Divider style={styles.divider} />
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={() => onPress()}>
              <Text>{buttonText || 'Got it'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  overlayWrapper: {
    textAlign: 'center',
    // backgroundColor: 'green',
    padding: 10,
    minWidth: 250,
    alignItems: 'center',
  },
  iconStyle: {
    position: 'absolute',
    top: -36,
  },
  overlayStyle: {
    //backgroundColor: 'green',
    margin: 10,
    padding: 0,
  },
  divider: {
    backgroundColor: BaseColor.grayColor,
  },
  iconWrapper: {
    alignItems: 'center',
    padding: 10,
  },
  padding: {
    padding: 10,
  },
  space: {
    padding: 5,
    backgroundColor: 'transparent',
  },
});
CustomModal.propTypes = {
  visible: PropTypes.bool,
  type: PropTypes.string,
  describe: PropTypes.string,
  buttonText: PropTypes.string,
  onBackdropPress: PropTypes.func,
  onPress: PropTypes.func,
};
