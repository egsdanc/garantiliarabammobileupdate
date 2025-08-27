import React, { Component } from 'react';
import styles from './styles';
import { compose, withLoadingScreen } from '@hocs';
import { Images } from '@config';
// import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import { View } from 'react-native';

class Walkthrough extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  /**
   * @description Simple authentication without call any APIs
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  authentication() {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.props.actions.authentication(true, response => {
          if (response.success) {
            this.props.navigation.navigate('Loading');
          } else {
            this.setState({
              loading: false,
            });
          }
        });
      },
    );
  }
  onIndexChanged(index) {
  }

  render() {
    console.log("asdasdasdasd")
    const { navigation } = this.props;

    navigation.navigate('Loading');
    return (
      // <Video
      //   repeat={false}
      //   source={Images.backgroundVideo}
      //   ref={ref => {
      //     this.player = ref;
      //   }}
      //   ignoreSilentSwitch={'ignore'}
      //   rate={1.0}
      //   resizeMode={'cover'}
      //   style={styles.backgroundVideo}
      //   onEnd={() => {
      //     setTimeout(() => {
      //       AsyncStorage.setItem('@walkthrough', 'yes').then(() => {
      //         const resetAction = CommonActions.reset({
      //           index: 0,
      //           routes: [{ name: 'Loading' }],
      //         });
      //         navigation.dispatch(resetAction);
      //       });
      //     }, 2000);
      //   }}
      // />
      <View></View>
    );
  }
}

export default compose(withLoadingScreen({}))(Walkthrough);
