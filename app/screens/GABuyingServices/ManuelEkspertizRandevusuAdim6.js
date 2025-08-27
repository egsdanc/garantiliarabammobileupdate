import React, { useCallback, useState } from 'react';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text, Button, Container } from '@components';
import { Block } from '../../commonComponents';
import {
  sendPaymentRequest_action,
  dismissEkspertizTalepError_action,
} from '@state/ducks/ekspertizTalep';
import { useDispatch } from 'react-redux';
import WebView from 'react-native-webview';

const ManuelEkspertizRandevusuAdim6 = ({ navigation, screenProps }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const resolve = useCallback(
    res => {
      setLoading(false);
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

  return (
    <SafeAreaView
      style={{ ...BaseStyle.safeAreaView, backgroundColor: 'rgb(246,246,246)' }}
      forceInset={{ top: 'always' }}>
      <Header title="İşlem Sonucu" />
      <Block center paddingTop={30}>
        <Text>
          Randevu talebiniz başarıyla alınmıştır. Randevu tarih ve saatiniz cep
          telefonunuza iletilmiştir.
        </Text>
        <Block marginTop={20}>
          <Button
            onPress={() => {
              // navigation.navigate('Home');
              navigation.navigate('BottomTabNavigator', {
                screen: 'Home' // Drawer içindeki Home screen'ine direkt git
              })
            }}>
            Anasayfaya Dön
          </Button>
        </Block>
      </Block>
    </SafeAreaView>
  );
};

export default ManuelEkspertizRandevusuAdim6;
