import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, View, ScrollView, TextInput, Image } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon, Button, Text } from '@components';
import {
  resetPassword_action,
  dismissForgotPasswordError_action,
} from '@state/ducks/forgotPassword';

import styles from './styles';

export default function ResetPasswordSetNewPassword({ navigation, route }) {
  const { messageForPassword, error, loader, phone } = useSelector(state => state.forgotPassword);
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [success, setSuccess] = useState({
    id: true,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (messageForPassword) {
      Alert.alert(
        messageForPassword,
        '',
        [
          {
            text: 'Tamam',
            onPress: () => {
              dispatch(dismissForgotPasswordError_action());
              navigation.navigate("SignIn");
            },
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
  }, [messageForPassword, navigation, dispatch]);

  const onChange = () => {
    if (password === "" || (passwordAgain !== password)) {
      Alert.alert(
        'Hata',
        'Şifreleri kontrol ediniz',
        [
          {
            text: 'Tamam',
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    } else {
      const payload = {
        password: password,
        phone: route.params.phone,
        pinCode: route.params.pinCode
      };
      dispatch(resetPassword_action(payload));
    }
  };
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { backgroundColor: '#000000' }]}
      forceInset={{ top: 'always' }}>
      <Header
        white
        title="Yeni Şifreyi Gir"
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
          <View style={styles.wrapper}>
            <Image source={Images.logo} style={styles.logo} />
          </View>
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 65 }]}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            onFocus={() => {
              if (error) {
                dispatch(dismissForgotPasswordError_action());
              }
              setSuccess({
                success: {
                  id: true,
                },
              });
            }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Şifre"
            placeholderTextColor={
              success.id ? BaseColor.grayColor : BaseColor.primaryColor
            }
            value={password}
            selectionColor={BaseColor.primaryColor}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 15 }]}
            secureTextEntry={true}
            onChangeText={text => setPasswordAgain(text)}
            onFocus={() => {
              if (error) {
                dispatch(dismissForgotPasswordError_action());
              }
              setSuccess({
                success: {
                  id: true,
                },
              });
            }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Şifre (Yeniden)"
            placeholderTextColor={
              success.id ? BaseColor.grayColor : BaseColor.primaryColor
            }
            value={passwordAgain}
            selectionColor={BaseColor.primaryColor}
          />
          <Text style={styles.errorTxt} redColor>
            {error}
          </Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Button
            full
            loading={loader}
            style={{ marginTop: 20 }}
            onPress={() => {
              onChange();
            }}>
            Kaydet
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
