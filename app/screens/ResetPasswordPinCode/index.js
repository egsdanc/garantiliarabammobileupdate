import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, View, ScrollView, TextInput, Image } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon, Button, Text } from '@components';
import {
  pinConfirm_action,
  dismissForgotPasswordError_action,
} from '@state/ducks/forgotPassword';

import styles from './styles';

export default function ResetPasswordPinCode({ navigation, route }) {
  const { messageForPinCode, error, loader, phone } = useSelector(
    state => state.forgotPassword,
  );
  const [pinCode, setPinCode] = useState('');
  const [success, setSuccess] = useState({
    id: true,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (messageForPinCode) {
      dispatch(dismissForgotPasswordError_action());
      navigation.navigate('ResetPasswordSetNewPassword', {
        phone: phone,
        pinCode: pinCode,
      });
    }
  }, [messageForPinCode, navigation, dispatch, phone, pinCode]);

  const onChange = () => {
    const payload = {
      pinCode: pinCode,
      phone: route.params.phone,
    };
    dispatch(pinConfirm_action(payload));
  };
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { backgroundColor: '#000000' }]}
      forceInset={{ top: 'always' }}>
      <Header
        white
        title="Pin Kodunu Girin"
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
            onChangeText={text => setPinCode(text)}
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
            placeholder="Pin Kodu"
            placeholderTextColor={
              success.id ? BaseColor.grayColor : BaseColor.primaryColor
            }
            value={pinCode}
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
            Doğrula
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
