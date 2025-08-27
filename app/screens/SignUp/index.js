import React, { useEffect } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon } from '@components';
import { XForm, TextInput, Button } from '@common';
import styles from './styles';
import { compose, withLoadingScreen, withSecureText } from '@hocs';
import { withProps, withMask } from '../../hocs';
import { useSelector, useDispatch } from 'react-redux';
import { registerWithPhone_action } from '../../state/ducks/registerWithPhone';
import { Block, Text, ErrorLabel, CheckBox, Label } from '../../commonComponents';
import { joinErrors, genWithCallback } from '../../utils';
import { registerWithPhone_action_reset } from '../../state/ducks/registerWithPhone';
const TextInputPhone = withMask(TextInput);
const SecuredTextInput = withSecureText(TextInput);
class SignUp extends XForm {
  resolve = () => {
    this.props.navigation.navigate('SmsCode', { params: this.state.values });
  };
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
    console.log("this.state.values", data)

    if (data.company_name != undefined) {
      data.registerType = 'corporate';
    } else {
      data.registerType = 'individual';
    }
    if (data.legalContract != true) {
      Alert.alert(
        'Uyarı',
        'Üyelik sözleşmesini ve gizlilik koşullarını kabul etmeniz gerekiyor.',
      );
    } else {
      const registerWithPhone_actionC = genWithCallback(
        registerWithPhone_action,
        this.resolve,
        this.reject,
      );
      this.props.dispatch(
        registerWithPhone_actionC({
          ...data,
          phone: data.phone,
        }),
      );
    }
  };
  onSignUp = () => this.postdata(this.state.values);

  getError4 = key => !!this.state.errors[key];
  render() {
    const { navigation, loading, route } = this.props;
    const loginType = route?.params?.loginType || {};
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{ top: 'always' }}>
        <Header
          title={loginType == 'individual' ? 'Kaydol' : 'Kurumsal Kaydol'}
          renderLeft={() => (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          )}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={styles.contain}>
            {loginType == 'corporate' && (
              <TextInput
                {...this.bindTextInput('company_name', { required: true })}
                style={[BaseStyle.textInput, { marginTop: 5 }]}
                autoCorrect={false}
                placeholder="Ticari Unvan"
                label=""
                placeholderTextColor={
                  this.getError4('name')
                    ? BaseColor.grayColor
                    : BaseColor.primaryColor
                }
              />
            )}
            <TextInput
              {...this.bindTextInput('name', { required: true })}
              style={[BaseStyle.textInput, { marginTop: 5 }]}
              autoCorrect={false}
              maxLength={30}
              placeholder={loginType == 'corporate' ? 'Yetkili Adı' : 'Ad'}
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
              maxLength={30}
              placeholder={
                loginType == 'corporate' ? 'Yetkili Soyadı' : 'Soyad'
              }
              label=""
              placeholderTextColor={
                this.getError4('surname')
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
            />

            <TextInputPhone
              {...this.bindTextInput('phone', {
                required: true,
                parentKey: 'email',
                onParentChange: this._resetMe,
                length: { is: 15 },
              })}
              disabled={!!this.state.values.email}
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              autoCorrect={false}
              // placeholder="Telefon"
              mask="(999) 999 99 99"
              getFormattedValue={true}
              placeholder="(555) 555 55 55"
              keyboardType="phone-pad"
              label=""
              placeholderTextColor={
                this.getError4('phone')
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
          </View>
          <Block margin={[10, 20, 10, 10]} color="transparent">
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
          <View style={{ marginHorizontal: 20 }}>
            <ErrorLabel error={this.props.errors?.glob} color="white" />
            <Button
              style={{ height: 50, backgroundColor: BaseColor.primaryColor }}

              full
              margin={[20, 0, 0, 0]}
              loading={loading}
              {...this.bindOnSubmitButton('onSignUp')}>
              Kaydol
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default compose(
  withProps(() => {
    const { loading, error } = useSelector(state => state.registerWithPhone);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(registerWithPhone_action_reset());
    }, [dispatch]);
    return {
      dispatch,
      loading,
      errors: joinErrors(error),
    };
  }),
  withLoadingScreen({}),
)(SignUp);
