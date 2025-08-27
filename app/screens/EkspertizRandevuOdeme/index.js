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

const EkspertizRandevuOdeme = ({ navigation, screenProps, route }) => {
  //credit_card : {fullname, ay,yil, cvc and card number}
  const [fullname, setFullname] = useState('');
  const [ay, setAy] = useState('');
  const [yil, setYil] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const resolve = useCallback(
    res => {
      setLoading(false);
      if (res.result === true) {
        navigation.navigate('EkspertizRandevuOdeme3D', { data: res });
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
      /*
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
       */
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );

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
      let { data } = route.params
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
        title="Ekspertiz Randevu İşlemi"
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
        <View
          style={[
            BaseStyle.bodyPaddingDefault,
            { marginBottom: 20, backgroundColor: 'rgb(246,246,246)' },
          ]}>
          <Text headline semibold style={{ marginTop: 20 }}>
            Kartla Ödeme
          </Text>
          <TextInput
            style={[
              BaseStyle.textInput,
              { marginTop: 10, backgroundColor: '#fff' },
            ]}
            onChangeText={value => setCardNumber(value)}
            autoCorrect={false}
            placeholder="Kart Numarası"
            keyboardType="numeric"
            value={cardNumber}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 1.5 }}>
              <TextInput
                style={[BaseStyle.textInput, { backgroundColor: '#fff' }]}
                onChangeText={value => setAy(value)}
                autoCorrect={false}
                placeholder="Ay"
                value={ay}
                maxLength={2}
                keyboardType="numeric"
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={{ flex: 1.5, marginLeft: 10 }}>
              <TextInput
                style={[BaseStyle.textInput, { backgroundColor: '#fff' }]}
                onChangeText={value => setYil(value)}
                autoCorrect={false}
                maxLength={4}
                placeholder="Yıl"
                keyboardType="numeric"
                value={yil}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={{ flex: 3.5, marginLeft: 10 }}>
              <TextInput
                style={[BaseStyle.textInput, { backgroundColor: '#fff' }]}
                onChangeText={value => setCvc(value)}
                autoCorrect={false}
                maxLength={3}
                placeholder="CVC"
                keyboardType="numeric"
                value={cvc}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
          </View>
          <TextInput
            style={[
              BaseStyle.textInput,
              { marginTop: 10, backgroundColor: '#fff' },
            ]}
            onChangeText={value => setFullname(value)}
            autoCorrect={false}
            placeholder="Kart Üzerindeki İsim"
            value={fullname}
            selectionColor={BaseColor.primaryColor}
          />
        </View>
      </ScrollView>
      <Container>
        <Button full onPress={onSubmit} loading={loading}>
          Ekspertiz Talep Et
        </Button>
      </Container>
    </SafeAreaView>
  );
};

export default EkspertizRandevuOdeme;
