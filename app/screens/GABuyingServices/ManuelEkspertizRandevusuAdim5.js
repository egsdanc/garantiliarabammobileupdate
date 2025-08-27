import React, { useCallback, useState } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text, Button, Container } from '@components';
import { Block } from '../../commonComponents';
import {
  sendPaymentRequest_action,
  dismissEkspertizTalepError_action,
} from '@state/ducks/ekspertizTalep';
import { useDispatch } from 'react-redux';
import WebView from 'react-native-webview';

const ManuelEkspertizRandevusuAdim5 = ({ navigation, screenProps, route }) => {
  //credit_card : {fullname, ay,yil, cvc and card number}
  const [fullname, setFullname] = useState('');
  const [ay, setAy] = useState('');
  const [yil, setYil] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState(
    route.params.data != undefined ? route.params.data.htmlContent : '',
  );

  const dispatch = useDispatch();
  const resolve = useCallback(
    res => {
      setLoading(false);
      if (res.status === 'OK') {
        navigation.navigate('EkspertizRandevuOdemeSonuc');
      } else {
        screenProps.openModalError({
          body: () => (
            <Block p4 m4>
              <Text center middle>
                {res?.message || res || 'Beklenmedik Hata Oluştu'}
              </Text>
            </Block>
          ),
          onClose: () => { },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  const reject = useCallback(
    res => {
      setLoading(false);
      screenProps.openModalError({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || res || 'Beklenmedik Hata Oluştu'}
            </Text>
          </Block>
        ),
        onClose: () => {
          dispatch(dismissEkspertizTalepError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );

  const urlListener = navState => {
    if (navState.title === 'success') {
      navigation.navigate('EkspertizRandevuOdemeSonuc');
    }
    if (navState.title === 'error') {
      alert('error');
    }
  };

  /** action */
  const sendRequest = useCallback(
    data => dispatch(sendPaymentRequest_action(data, resolve, reject)),
    [dispatch, reject, resolve],
  );
  const onSubmit = () => {
    let errorMessage =
      fullname === ''
        ? 'Kredi kartı üzerindeki ad ve soyad bilgisini giriniz.'
        : ay === ''
          ? 'Kredi kartı üzerindeki ay bilgisini giriniz.'
          : yil === ''
            ? 'Kredi kartı üzerindeki yıl bilgisini giriniz.'
            : cvc === ''
              ? 'Kredi kartı üzerindeki cvc bilgisini giriniz.'
              : cardNumber === ''
                ? 'Kredi kartı üzerindeki kart numarası bilgisini giriniz.'
                : '';
    if (errorMessage !== '') {
      screenProps.openModalError({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {errorMessage}
            </Text>
          </Block>
        ),
        onClose: () => {
          errorMessage = '';
        },
      });
    } else {
      let { data } = route?.params;
      data = {
        ...data,
        credit_card: {
          fullname,
          ay,
          yil,
          cvc,
          cardNumber,
        },
      };
      setLoading(true);
      sendRequest(data);
    }
  };
  return (
    <SafeAreaView
      style={{ ...BaseStyle.safeAreaView, backgroundColor: 'rgb(246,246,246)' }}
      forceInset={{ top: 'always' }}>
      <Header
        title="Ödeme Doğrulama"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <WebView
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: '#cc0033',
        }}
        startInLoadingState={true}
        onNavigationStateChange={urlListener}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        source={{ html: htmlContent }}
      />
    </SafeAreaView>
  );
};

export default ManuelEkspertizRandevusuAdim5;
