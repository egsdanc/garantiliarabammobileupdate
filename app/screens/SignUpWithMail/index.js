import React, { useEffect, useCallback } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon } from '@components';
import { XForm, TextInput, Button } from '@common';
import styles from './styles';
import { compose, withLoadingScreen, withSecureText } from '@hocs';
import { withProps } from '../../hocs';
import { useSelector, useDispatch } from 'react-redux';
import { registerWithMail_action } from '@state/ducks/registerWithMail';
import { ifElse, propEq, pipe, lensProp, set } from 'ramda';
import { Block, CheckBox, Label, Text, ErrorLabel } from '../../commonComponents';
import { joinErrors, genWithCallback } from '../../utils';
import { registerWithMail_action_reset } from '../../state/ducks/registerWithMail';
import { signIn_action_success } from '@state/ducks/signIn';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
const SecuredTextInput = withSecureText(TextInput);
const ScrollViewWithLoding = withLoadingScreen({})(ScrollView);
class SignUpWithMail extends XForm {
  reject = res => {
    this.props.screenProps.openModalError({
      body: () => (
        <Block p4 m4>
          <Text center middle>
            {res?.message || 'Beklenmedik Hata Oluştu'}
          </Text>
        </Block>
      ),
    });
  };
  postdata = data => {
    if (data.legalContract != true) {
      Alert.alert(
        'Uyarı',
        'Üyelik sözleşmesini ve gizlilik koşullarını kabul etmeniz gerekiyor.',
      );
    } else {
      const registerWithMail_actionC = genWithCallback(
        registerWithMail_action,
        this.props.resCode,
        this.reject,
      );
      this.props.dispatch(registerWithMail_actionC(data));
    }
  };
  onSignUpWithMail = () =>
    pipe(
      ifElse(
        propEq('advertisingContract', true),
        set(lensProp('advertisingContract'), '1'),
        set(lensProp('advertisingContract'), '0'),
      ),
      this.postdata,
    )(this.state.values);
  getError4 = key => !!this.state.errors[key];
  render() {
    const { navigation, loading } = this.props;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{ top: 'always' }}>
        <Header
          title="Kaydol"
          renderLeft={() => (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          )}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollViewWithLoding loading={this.props.loading}>
          <View style={styles.contain}>
            {/*
                  <View style={styles.wrapper}>
              <Image source={Images.logo} style={styles.logo} />
            </View>
                   */}
            <TextInput
              {...this.bindTextInput('name', { required: true })}
              style={[BaseStyle.textInput, { marginTop: 5 }]}
              autoCorrect={false}
              placeholder="Ad"
              label=""
              placeholderTextColor={
                this.getError4('name')
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
            />
            <TextInput
              {...this.bindTextInput('surname', { required: true })}
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              autoCorrect={false}
              placeholder="Soyad"
              label=""
              placeholderTextColor={
                this.getError4('surname')
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
            />
            <TextInput
              {...this.bindTextInput('email', {
                required: true,
                email: true,
              })}
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              autoCorrect={false}
              placeholder="Email"
              keyboardType="email-address"
              label=""
              placeholderTextColor={
                this.getError4('email')
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
            />
            <SecuredTextInput
              {...this.bindTextInput('password', { required: true })}
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              autoCorrect={false}
              placeholder="Şifre"
              label=""
              placeholderTextColor={
                this.getError4('password')
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
            />
            <Block
              style={[
                { width: '100%' },
                !!this.state.values.phone && { display: 'none' },
              ]}
              margin={[10, 0]}
              color="transparent">
              <Block row color="transparent">
                <CheckBox
                  {...this.bindCheckBox('legalContract', {
                    defaultValue: false,
                  })}
                  m3
                />
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Legal');
                  }}>
                  <Label
                    label="Üyelik Sözleşmesi'ni ve Gizlilik Politikası'nı kabul ediyorum."
                    margin={[0, 30, 0, 0]}
                  />
                </TouchableOpacity>
              </Block>
              <Block row color="transparent">
                <CheckBox
                  {...this.bindCheckBox('advertisingContract', {
                    hidden: !!this.state.values.phone,
                    defaultValue: false,
                  })}
                  m3
                />
                <Label
                  label="Bilgilerime kampanya, tanıtım ve reklam içerikli ticari elektronik ileti gönderilmesine, bu amaçla kişisel verilerimin işlenmesine ve tedarikçilerinizle paylaşılmasına izin veriyorum"
                  margin={[0, 30, 0, 0]}
                />
              </Block>
            </Block>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <ErrorLabel error={this.props.errors?.glob} color="white" />
            <Button
              full
              margin={[20, 0, 0, 0]}
              loading={loading}
              {...this.bindOnSubmitButton('onSignUpWithMail')}>
              Kaydol
            </Button>
          </View>
        </ScrollViewWithLoding>
      </SafeAreaView>
    );
  }
}

export default compose(
  withProps(({ navigation }) => {
    const { loading, error } = useSelector(state => state.registerWithMail);
    const dispatch = useDispatch();
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
    useEffect(() => {
      dispatch(registerWithMail_action_reset());
    }, [dispatch]);
    return {
      dispatch,
      loading,
      errors: joinErrors(error),
      resCode,
    };
  }),
)(SignUpWithMail);
