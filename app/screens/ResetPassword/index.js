import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, View, ScrollView, TextInput, Image } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon, Button, Text } from '@components';
import {
  forgotPassword_action,
  dismissForgotPasswordError_action,
} from '@state/ducks/forgotPassword';

import styles from './styles';

export default function ResetPassword({ navigation }) {
  const { message, error, loader, actionType, phone } = useSelector(
    state => state.forgotPassword,
  );
  const [id, setId] = useState('');
  const [success, setSuccess] = useState({
    id: true,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      dispatch(dismissForgotPasswordError_action());
      if (actionType == 'phone') {
        navigation.navigate('ResetPasswordPinCode', { phone: phone });
      } else {
        Alert.alert(
          message,
          '',
          [
            {
              text: 'Tamam',
              onPress: () => {
                navigation.goBack();
              },
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      }
    }
  }, [message, navigation, dispatch, actionType, phone]);

  const onChange = () => {
    const payload = {
      emailorpass: id,
    };
    console.log("aaaaa")
    dispatch(forgotPassword_action(payload));
    console.log("bbb")

  };
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: 'always' }}>
      <Header
        title="Şifremi Unuttum"
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
        {/* <View style={styles.wrapper}>
          <Image source={Images.logo} style={styles.logo} />
        </View> */}
        <View style={styles.contain}>
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 5 }]}
            onChangeText={text => setId(text)}
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
            placeholder="Telefon ya da email adresi"
            placeholderTextColor={
              success.id ? BaseColor.grayColor : BaseColor.primaryColor
            }
            value={id}
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
            Şifreyi Sıfırla
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
