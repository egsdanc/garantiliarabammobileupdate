import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon, Button, Modal, Image } from '@components';
import AsyncStorage from '@react-native-community/async-storage';
import { Block, Text, ErrorLabel } from '../../commonComponents';
import { signIn_action, updateState } from '@state/ducks/signIn';
import styles from './styles';
import { CommonActions } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

export default function SignIn({ navigation, screenProps }) {
  // Redux state'ini güvenli bir şekilde çek
  const signInState = useSelector(state => state.signIn || {});
  const {
    data = {},
    error = {},
    loader = false
  } = signInState;

  const { status } = data;
  const { message = '' } = error;

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState({
    id: true,
    password: true,
  });
  const [inputData, setInputData] = useState({
    secureText: true,
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    let regMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let regPhone = /^(\+91-|\+91|0)?\d{10}$/;

    if (regMail.test(id) === false && regPhone.test(id) === false) {
      Alert.alert('Hata', 'Girilen karakter formatı yanlış. Tekrar deneyiniz.');
      return;
    }
    console.log("11")
    dispatch(
      updateState({
        payload: {
          email: id,
          password: password,
        },

        resolve: data => {
          AsyncStorage.setItem('@token', data?.token || '');
          AsyncStorage.setItem('@user', JSON.stringify(data?.user) || '');
          console.log("11222")

          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Loading' }],
          });
          console.log("222")

          navigation.dispatch(resetAction);
        },
        reject: err => {
          console.log("112333322")

          if (screenProps?.openModalError) {
            console.log("112333322")

            screenProps.openModalError({
              body: () => (
                <Block p4 m4>
                  <Text center middle>
                    {err?.message || 'Beklenmedik Hata Oluştu'}
                  </Text>
                </Block>
              ),
            });
          } else {
            Alert.alert('Hata', err?.message || 'Beklenmedik Hata Oluştu');
          }
        },
      }),
    );
    console.log("33")

  };

  const updateSecureTextEntry = () => {
    setInputData({
      ...inputData,
      secureText: !inputData.secureText,
    });
  };

  // Focus işlevlerini düzelt
  const handleIdFocus = () => {
    setSuccess(prevSuccess => ({
      ...prevSuccess,
      id: true,
    }));
  };

  const handlePasswordFocus = () => {
    setSuccess(prevSuccess => ({
      ...prevSuccess,
      password: true,
    }));
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} forceInset={{ top: 'always' }}>
      <Header
        title="Giriş Yap"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.contain}>
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 5 }]}
            onChangeText={text => setId(text)}
            autoCapitalize="none"
            onFocus={handleIdFocus}
            autoCorrect={false}
            placeholder="Telefon ya da email adresi"
            placeholderTextColor={
              success.id ? BaseColor.grayColor : BaseColor.primaryColor
            }
            value={id}
            selectionColor={BaseColor.primaryColor}
            maxLength={35}
          />
          <View style={{ alignItems: 'center', width: '100%', flexDirection: 'row' }}>
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 10, flex: 1 }]}
              onChangeText={text => setPassword(text)}
              onFocus={handlePasswordFocus}
              autoCorrect={false}
              placeholder="Şifre"
              secureTextEntry={inputData.secureText}
              placeholderTextColor={
                success.password ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={password}
              selectionColor={BaseColor.primaryColor}
              maxLength={30}
            />
            <TouchableOpacity
              style={{ marginTop: 5, marginLeft: -30 }}
              onPress={updateSecureTextEntry}>
              {inputData.secureText ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Button
            full
            loading={loader}
            style={{ marginTop: 20 }}
            onPress={handleSubmit}>
            Giriş Yap
          </Button>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate('ResetPassword')}>
            <Text body1 grayColor>
              Şifreni mi unuttun?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}