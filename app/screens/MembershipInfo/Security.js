import React, {useCallback, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, Switch} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import {BaseStyle, BaseColor} from '@config';
import {Block} from '../../commonComponents';
import {
  getConfig_action,
  setConfig_action,
  dismissConfigError_action,
} from '@state/ducks/config';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';

const Guvenlik = ({navigation, screenProps}) => {
  const {value, loader} = useSelector(state => state.config);
  const [stateValue, setValue] = useState(parseInt(value));
  const dispatch = useDispatch();

  const resolve = useCallback(
    res => {
      screenProps.openModalSuccess({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || 'Başarıyla Güncellendi'}
            </Text>
          </Block>
        ),
      });
    },
    [screenProps],
  );
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
          dispatch(dismissConfigError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  //set config action
  const handleSubmit = () => {
    const payload = {
      configKey: 'verification',
      value: stateValue.toString(),
    };
    dispatch(setConfig_action(payload, resolve, reject));
  };
  /** get config action */
  const getConfigData = useCallback(
    payload =>
      dispatch(getConfig_action(payload, res => setValue(res), reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  /** didmount */
  useEffect(() => {
    getConfigData({configKey: 'verification'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Güvenlik"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.content}>
        <View style={styles.textWrapper}>
          <Text body1>
            Yeni bir cihazdan Üye Girişi yaptığımda, şifreme ek olarak cep
            telefonuma veya e-posta adresime doğrulama kodu gönderilmesini
            istiyorum.
          </Text>
        </View>
        <Switch
          trackColor={{
            false: BaseColor.grayColor,
            true: BaseColor.primaryColor,
          }}
          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
          thumbColor={'#fff'}
          ios_backgroundColor={BaseColor.fieldColor}
          onValueChange={() => setValue(stateValue === 0 ? 1 : 0)}
          value={stateValue === 1}
        />
      </View>

      <View style={styles.btnWrapper}>
        <Button loading={loader} full onPress={handleSubmit}>
          Kaydet
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default compose(
  withProps(() => {
    const {getLoader} = useSelector(state => state.config);
    return {
      loading: getLoader,
    };
  }),
  withLoadingScreen({}),
)(Guvenlik);

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  textWrapper: {flex: 1, paddingHorizontal: 10},
});
