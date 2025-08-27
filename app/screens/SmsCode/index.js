import React, { useCallback, useRef, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text, Button } from '@components';
import { Text as Txt } from '@common';
import SMSVerifyCode from 'react-native-sms-verifycode';
import { withMask, withLoadingScreen, withProps, compose } from '../../hocs';
import { registerWithPhone_action } from '@state/ducks/registerWithPhone';
import { verifyPhone_action } from '@state/ducks/verifyPhone';
import { genWithCallback, joinErrors } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { Block, ErrorLabel } from '../../commonComponents';
import { signIn_action_success } from '@state/ducks/signIn';
import { verifyPhone_action_reset } from '@state/ducks/verifyPhone';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';

const ScrollViewLoading = withLoadingScreen({})(ScrollView);

const ShowFormattedPhone = withMask(({ value }) => (
  <Text style={{ paddingBottom: 40, fontSize: 20 }}>
    {value}
  </Text>
));

export const SmsCode = ({ navigation, screenProps, route }) => {
  const { params } = route.params;
  const verifycode = useRef(null);
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.verifyPhone);
  useEffect(() => {
    dispatch(verifyPhone_action_reset());
  }, [dispatch]);
  const errors = joinErrors(error);
  const resCode = useCallback(
    res => {
      dispatch(signIn_action_success(res));
      AsyncStorage.setItem('@token', res.token || '').then(() => {
        AsyncStorage.setItem('@user', JSON.stringify(res.user) || '').then(
          () => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [{ name: 'Loading' }],
            });
            navigation.dispatch(resetAction);
          },
        );
      });
    },
    [dispatch, navigation],
  );
  const rejCode = useCallback(res => {
  }, []);

  const onInputCompleted = useCallback(
    text => {
      verifycode.current.reset();
      const verifyPhone_actionC = genWithCallback(
        verifyPhone_action,
        resCode,
        rejCode,
      );
      dispatch(
        verifyPhone_actionC({
          code: text,
          phone: params.phone,
        }),
      );
    },
    [resCode, rejCode, dispatch, params.phone],
  );

  const rej = useCallback(res => {
  }, []);
  const res = useCallback(
    res => {
      screenProps.openModalSuccess({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || 'Beklenmedik Hata Oluştu'}
            </Text>
          </Block>
        ),
      });
    },
    [screenProps],
  );

  const resend = useCallback(() => {
    verifycode.current.reset();
    const registerWithPhone_actionC = genWithCallback(
      registerWithPhone_action,
      res,
      rej,
    );
    dispatch(registerWithPhone_actionC(params));
  }, [dispatch, params, rej, res, verifycode]);
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: 'always' }}>
      <Header
        title="Sms Şifre"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollViewLoading loading={loading}>
        <View
          style={{
            alignItems: 'center',
            padding: 20,
            width: '100%',
          }}>
          <Txt center style={{ paddingBottom: 20, fontSize: 20 }}>
            Doğrulama için size bir kod gönderildi
          </Txt>
          <ShowFormattedPhone value={'+90' + params.phone}>
            +90 {params.phone}
          </ShowFormattedPhone>
          <SMSVerifyCode
            codeViewBorderWidth={3}
            containerPaddingLeft={70}
            containerPaddingRight={70}
            codeColor={'#000000'}
            focusedCodeViewBorderColor={'#f5a623'}
            codeViewBorderRadius={50}
            verifyCodeLength={6} // Set any number as needed, type must be number
            onInputCompleted={onInputCompleted}
            ref={verifycode}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Button
            full
            onPress={resend}
            style={{
              marginTop: 20,
              borderColor: '#ffffff',
              borderWidth: 2,
            }}>
            Kodu Yeniden Gönder
          </Button>
          <ErrorLabel
            error={errors?.glob}
            color={BaseColor.primaryColor}
            center
          />
        </View>
      </ScrollViewLoading>
    </SafeAreaView>
  );
};

export default compose(
  withProps(() => {
    const { loading } = useSelector(state => state.registerWithPhone);
    return {
      loading,
    };
  }),
  withLoadingScreen({}),
)(SmsCode);
