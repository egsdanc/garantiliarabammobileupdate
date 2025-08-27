import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Images, BaseColor } from '@config';
import SplashScreen from 'react-native-splash-screen';
import { Text, Button } from '@components';
import { Image } from '../../components/Image';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Block, ErrorLabel } from '../../commonComponents';
import { setToken } from '../../state/ducks/signIn';
import { checkToken_action } from '../../state/ducks/checkToken';
import { CommonActions } from '@react-navigation/native';

export default function Loading({ navigation, route }) {
  console.log("iiiii", Images.logo)
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();

    const initializeApp = async () => {
      try {
        const token = await AsyncStorage.getItem('@token');
        console.log("tokentoken", token)

        if (token) {
          console.log("tokenchecj", token)
          dispatch(setToken(token));
          dispatch(
            checkToken_action({
              resolve: data => {
                // Token geçerli, ana sayfaya yönlendir
                // navigation.navigate('Home');
                console.log("ensonburayagirdi", data)
                navigation.navigate('Main');

              },
              reject: err => {
                // Token geçersiz, tüm verileri temizle
                AsyncStorage.getAllKeys()
                  .then(keys => AsyncStorage.multiRemove(keys))
                  .then(() => {
                    // navigation.navigate('SignIn');
                    navigation.navigate('MainStack', {
                      screen: 'SignIn' // Drawer içindeki Home screen'ine direkt git
                    })
                  });
              },
            }),
          );
        } else {
          console.log("wwww", Images.logo)

          // Token yok, walkthrough kontrolü yap
          const walkthrough = await AsyncStorage.getItem('@walkthrough');

          if (walkthrough) {
            console.log("rrrr", Images.logo)

            // Walkthrough daha önce görülmüş, ana navigator'a git
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'StackNavigator', // Bu route adının navigation yapınızda tanımlı olduğundan emin olun
                  },
                ],
              })
            );
          } else {
            console.log("sssss", Images.logo)
            navigation.navigate('Main');

            // İlk kez açılıyor, walkthrough'a git
            // navigation.navigate('Walkthrough')

          }
        }
      } catch (error) {
        console.error('Loading screen error:', error);
        // Hata durumunda varsayılan olarak walkthrough'a yönlendir
        navigation.navigate('Main', { screen: 'Walkthrough' });
        // navigation.navigate('Walkthrough')
      }
    };

    initializeApp();
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <Image source={Images.logo} style={styles.logo} resizeMode="cover" />
      <View style={styles.wrapper}>
        <ActivityIndicator
          size="large"
          color={BaseColor.whiteColor}
          style={styles.indicator}
        />
      </View>
    </View>
  );
}