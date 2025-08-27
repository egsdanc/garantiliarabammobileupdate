import React, {useCallback, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, ScrollView, TextInput, StyleSheet} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import {Block} from '../../commonComponents';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';

import {getConfig_action, dismissConfigError_action} from '@state/ducks/config';
import {
  verifyTCKN_action,
  dismissVerifyTCKNError_action,
} from '@state/ducks/verifyTCKN';

function TCKNDogrulama({navigation, screenProps}) {
  const btnLoader = useSelector(state => state.verifyTCKN.loader);
  const [tcno, setTCNO] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [value, setValue] = useState(0);
  const [stateError, setError] = useState('');
  const dispatch = useDispatch();
  const showErrorMessage = useCallback(
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
          dispatch(dismissVerifyTCKNError_action);
          dispatch(dismissConfigError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  const onSubmit = () => {
    setError('');
    if (birthdate && tcno) {
      const payload = {
        birthdate,
        tcno,
      };
      dispatch(
        verifyTCKN_action(
          payload,
          res => {
            screenProps.openModalSuccess({
              body: () => (
                <Block p4 m4>
                  <Text center middle>
                    {res?.message || 'Başarıyla kimliğiniz dogrulandı.'}
                  </Text>
                </Block>
              ),
              onClose: () => {
                setValue(1);
              },
            });
          },
          res => setError(res?.message || 'Beklenmedik Hata Oluştu.'),
        ),
      );
    } else {
      setError('TC kimlik bilgilerinizi giriniz.');
    }
  };
  /** action */
  const getConfigData = useCallback(
    payload =>
      dispatch(
        getConfig_action(
          payload,
          res => setValue(parseInt(res)),
          showErrorMessage,
        ),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  /** didmount */
  useEffect(() => {
    getConfigData({configKey: 'tckn'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title="TCKN Doğrulama"
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
        {value === 0 ? (
          <View style={styles.contain}>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                TCKN
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => setTCNO(text)}
              autoCorrect={false}
              placeholder="TCKN"
              placeholderTextColor={BaseColor.grayColor}
              value={tcno}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Doğum Yılı (Sadece Yıl, Örn: 1997, 2001, 1984)
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => setBirthdate(text)}
              autoCorrect={false}
              placeholder="Doğum Yılı"
              placeholderTextColor={BaseColor.grayColor}
              value={birthdate}
              selectionColor={BaseColor.primaryColor}
            />

            <View style={styles.textWrapper}>
              <Text body1>
                *TC kimlik numaranız kimse ile paylaşılmaz. İlanınızda 'TCKN
                doğrulandı' olarak gösterilir. Bu sayede daha güven veren bir
                profil oluşturabilir ve satıcılar arasında bir adım öne
                geçebilirsiniz.
              </Text>
            </View>
            <View style={styles.textWrapper}>
              <Text body1 primaryColor>
                {stateError}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.contain}>
            <View style={styles.textWrapper}>
              <Text body1>*TC kimlik numaranız onaylı.</Text>
            </View>
          </View>
        )}
      </ScrollView>
      {value === 0 && (
        <View style={{padding: 20}}>
          <Button loading={btnLoader} full onPress={onSubmit}>
            TCKN Doğrula
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentTitle: {
    alignItems: 'flex-start',
    width: '100%',
    height: 32,
    justifyContent: 'center',
  },
  contain: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  textWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default compose(
  withProps(() => {
    const {getLoader} = useSelector(state => state.config);
    return {
      loading: getLoader,
    };
  }),
  withLoadingScreen({}),
)(TCKNDogrulama);
