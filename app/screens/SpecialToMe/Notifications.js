import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Switch} from 'react-native';
import {Header, SafeAreaView, Button, Icon, Text, Container} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';
import {Card, ListItem} from 'react-native-elements';
import {
  getNotificationPermissions_action,
  setNotificationPermissions_action,
  dismissNotificationPermissionsError_action,
} from '@state/ducks/notificationPermissions';
import {useSelector, useDispatch} from 'react-redux';
import {Block} from '../../commonComponents';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';

const notificationData = [
  {
    title: 'İLAN BİLDİRİMLERİ',
    data: [
      {
        title: 'İlan onay beklerken haber ver.',
        inWebpage: 'bildirimler_ilan_onay_beklerken_site',
        ePosta: 'bildirimler_ilan_onay_beklerken_mail',
      },
      {
        title: 'İlan tarihi güncellendiğinde haber ver.	        ',
        inWebpage: 'bildirimler_ilan_tarih_guncellendiginde_site',
        ePosta: 'bildirimler_ilan_tarih_guncellendiginde_mail',
      },
    ],
  },
  {
    title: 'KULLANICI BİLDİRİMLERİ',
    data: [
      {
        title: 'Son aramamla ilgili haber ver.',

        inWebpage: 'bildirimler_kullanici_son_arama_site',
        ePosta: 'bildirimler_kullanici_son_arama_mail',
      },
    ],
  },
  {
    title: 'FAVORİ BİLDİRİMLERİ	',
    data: [
      {
        title: 'Favori ilanımın fiyatı düştüğünde haber ver ',
        inWebpage: 'bildirimler_favori_favilan_fiyat_dusmesi_site',
        ePosta: 'bildirimler_favori_favilan_fiyat_dusmesi_mail',
      },
      {
        title: 'Favori arama sonuçlarımla ilgili haber ver.	        ',
        inWebpage: 'bildirimler_favori_arama_sonuclari_site',
        ePosta: 'bildirimler_favori_arama_sonuclari_mail',
      },
      {
        title: 'Favori satıcı sonuçlarımla ilgili haber ver.',
        inWebpage: 'bildirimler_favori_satici_sonuclari_site',
        ePosta: 'bildirimler_favori_satici_sonuclari_mail',
      },
    ],
  },
];

const NotificationPermissions = ({navigation, screenProps}) => {
  const [list, setList] = useState({});
  const resolve = useCallback(res => {
    setList(res);
  }, []);
  const reject = useCallback(
    res => {
      screenProps.openModalError({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || 'Beklenmedik Hata Oluştu'}
            </Text>
          </Block>
        ),
        onClose: () => {
          dispatch(dismissNotificationPermissionsError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );

  const setNotificationPermissions = (key, value) => {
    const payload = {
      parameter: key,
      value,
    };
    setList({
      ...list,
      [key]: value ? 1 : 0,
    });
    dispatch(setNotificationPermissions_action(payload, resolve, reject));
  };
  const dispatch = useDispatch();
  /** get notification permissinos action */
  const getNotificationPermissions = useCallback(
    () => dispatch(getNotificationPermissions_action(resolve, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  /** didmount */
  useEffect(() => {
    getNotificationPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Bildirim İzinlerim"
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
        {notificationData.map((d, i) => {
          return (
            <Card
              title={d.title}
              key={Math.random()}
              titleStyle={styles.cardTitle}>
              <View key={i} style={styles.user}>
                {d.data.map((item, index) => (
                  <View style={styles.contentWrapper}>
                    <Text body1>{item.title}</Text>
                    <View style={styles.switchContainer}>
                      <View style={styles.switchContent}>
                        <Switch
                          trackColor={{
                            false: BaseColor.grayColor,
                            true: BaseColor.primaryColor,
                          }}
                          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                          thumbColor={'#fff'}
                          ios_backgroundColor={BaseColor.fieldColor}
                          onValueChange={value =>
                            setNotificationPermissions(item.inWebpage, value)
                          }
                          value={
                            list[item.inWebpage]
                              ? list[item.inWebpage] === 1
                              : false
                          }
                        />
                        <Text style={styles.switch} footnote>
                          Site Ici
                        </Text>
                      </View>
                      <View style={styles.switchContent}>
                        <Switch
                          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                          trackColor={{
                            false: BaseColor.grayColor,
                            true: BaseColor.primaryColor,
                          }}
                          thumbColor={'#fff'}
                          ios_backgroundColor={BaseColor.fieldColor}
                          onValueChange={value =>
                            setNotificationPermissions(item.ePosta, value)
                          }
                          value={
                            list[item.ePosta] ? list[item.ePosta] === 1 : false
                          }
                        />
                        <Text style={styles.switch} footnote>
                          E posta
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default compose(
  withProps(() => {
    const {loader} = useSelector(state => state.notificationPermissions);
    return {
      loading: loader,
    };
  }),
  withLoadingScreen({}),
)(NotificationPermissions);

const styles = StyleSheet.create({
  switchContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  switch: {
    padding: 10,
  },
  switchContainer: {
    flexDirection: 'row',
  },
  cardTitle: {
    color: BaseColor.webBlue,
    fontSize: 16,
  },
});
