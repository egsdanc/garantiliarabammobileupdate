import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Switch} from 'react-native';
import {Header, SafeAreaView, Button, Icon, Text, Container} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';
import {Card, ListItem} from 'react-native-elements';
import {
  getElectronicNotificationPermissions_action,
  setElectronicNotificationPermissions_action,
  dismissElectronicNotificationPermissionsError_action,
} from '@state/ducks/electronicNotificationPermissions';
import {useSelector, useDispatch} from 'react-redux';
import {Block} from '../../commonComponents';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';

const ElectronicNotificationPermissions = ({navigation, screenProps}) => {
  const [data, setData] = useState({});
  const resolve = useCallback(res => {
    setData(res);
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
          dispatch(dismissElectronicNotificationPermissionsError_action);
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
    setData({
      ...data,
      [key]: value ? 1 : 0,
    });
    dispatch(
      setElectronicNotificationPermissions_action(payload, resolve, reject),
    );
  };
  const dispatch = useDispatch();
  /** get notification permissinos action */
  const getElectronicNotificationPermissions = useCallback(
    () =>
      dispatch(getElectronicNotificationPermissions_action(resolve, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  /** didmount */
  useEffect(() => {
    getElectronicNotificationPermissions();
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
        <Card>
          <View style={styles.contentWrapper}>
            <Text body1>
              Bana özel kampanya, teklif ve tanıtımlardan haberdar olmak
              istiyorum.
            </Text>
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
                  onValueChange={value => {
                    setNotificationPermissions('elektronik_eposta', value);
                  }}
                  value={data?.elektronik_eposta === 1 ? true : false}
                />
                <Text style={styles.switch} footnote>
                  E Posta
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
                  onValueChange={value => {
                    setNotificationPermissions('elektronik_telefon', value);
                  }}
                  value={data?.elektronik_telefon === 1 ? true : false}
                />
                <Text style={styles.switch} footnote>
                  Telefon
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
                  onValueChange={value => {
                    setNotificationPermissions('elektronik_sms', value);
                  }}
                  value={data?.elektronik_sms === 1 ? true : false}
                />
                <Text style={styles.switch} footnote>
                  Sms
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default compose(
  withProps(() => {
    const {loader} = useSelector(
      state => state.electronicNotificationPermissions,
    );
    return {
      loading: loader,
    };
  }),
  withLoadingScreen({}),
)(ElectronicNotificationPermissions);

const styles = StyleSheet.create({
  switchContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  switch: {
    padding: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
