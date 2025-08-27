import React, { Component } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from '@components';
import { Divider } from 'react-native-elements';
import styles from './styles';
import PropTypes from 'prop-types';

export default class Header extends Component {
  componentDidMount() {
    StatusBar.setBarStyle(this.props.barStyle, true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  render() {
    const {
      style,
      styleLeft,
      styleCenter,
      styleRight,
      styleRightSecond,
      title,
      subTitle,
      onPressLeft,
      onPressRight,
      white,
      onPressRightSecond,
      subStyle,
      titleStyle,
    } = this.props;

    return (
      <View>
        <View style={[styles.contain, style]}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[styles.contentLeft, styleLeft]}
              onPress={onPressLeft}>
              {this.props.renderLeft()}
            </TouchableOpacity>
          </View>
          <View style={[styles.contentCenter, styleCenter]}>
            <Text style={[titleStyle, white && { color: '#ffffff' }]} headline>
              {title}
            </Text>
            {subTitle != '' && (
              <Text caption2 light style={subStyle}>
                {subTitle}
              </Text>
            )}
          </View>
          <View style={styles.right}>
            <TouchableOpacity
              style={[styles.contentRightSecond, styleRightSecond]}
              onPress={onPressRightSecond}>
              {this.props.renderRightSecond()}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contentRight, styleRight]}
              onPress={onPressRight}>
              {this.props.renderRight()}
            </TouchableOpacity>
          </View>
        </View>
        <Divider style={{ marginBottom: 5 }} />
      </View>
    );
  }
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
};

Header.defaultProps = {
  style: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  styleRightSecond: {},
  renderLeft: () => { },
  renderRight: () => { },
  renderRightSecond: () => { },
  onPressLeft: () => { },
  onPressRight: () => { },
  onPressRightSecond: () => { },
  title: 'Title',
  subTitle: '',
  barStyle: 'dark-content',
};
