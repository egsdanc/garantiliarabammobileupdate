import React, {useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Header, SafeAreaView, Icon, Button, Text} from '@components';
import {BaseStyle, BaseColor} from '@config';
import {CheckBox} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {
  membershipCancellation_action,
  dismissMembershipCancellationError_action,
} from '@state/ducks/membershipCancellation';
import {Block} from '../../commonComponents';
import AsyncStorage from '@react-native-community/async-storage';

function ConfirmMembershipCancellation({navigation, screenProps}) {
  const loader = useSelector(state => state.membershipCancellation?.loader);
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
  const resolve = useCallback(
    res => {
      let timer = setTimeout(async () => {
        await AsyncStorage.removeItem('@token');
        navigation.navigate('ChooseLoginType');
      }, 2000);
      screenProps.openModalSuccess({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || res || 'Başarıyla Güncellendi'}
            </Text>
          </Block>
        ),
        onClose: async () => {
          clearTimeout(timer);
          await AsyncStorage.removeItem('@token');
          navigation.navigate('ChooseLoginType');
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          dispatch(dismissMembershipCancellationError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  const handleCancellation = () => {
    const payload = {
      reason: value,
    };
    if (value !== '') {
      dispatch(membershipCancellation_action(payload, resolve, reject));
    } else {
      screenProps.openModalError({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              Lütfen profil kapatma sebebini seçiniz.
            </Text>
          </Block>
        ),
        onClose: () => {},
      });
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Üyelik İptali"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <CheckBox
          title="Uygulamayi ilan aramak icin yeterli bulmadim"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={value === 1}
          onPress={() => setValue(value === 1 ? '' : 1)}
        />
        <CheckBox
          title="Kisisel bilgilerimin tehlikede oldugunu dusunuyorum"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={value === 2}
          onPress={() => setValue(value === 2 ? '' : 2)}
        />
        <CheckBox
          title="Bu uygulamanin bana uygun olmadigini dusunuyorum"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={value === 3}
          onPress={() => setValue(value === 3 ? '' : 3)}
        />
        <CheckBox
          title="Diger"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={value === 4}
          onPress={() => setValue(value === 4 ? '' : 4)}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Button full loading={loader} onPress={handleCancellation}>
          Üyeliğimi İptal Et
        </Button>
      </View>
    </SafeAreaView>
  );
}
export default ConfirmMembershipCancellation;
const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
});
