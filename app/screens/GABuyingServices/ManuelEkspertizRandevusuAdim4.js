import React, {useCallback, useState, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  AddressListItem,
} from '@components';
import {BaseStyle, BaseColor} from '@config';
import {useSelector, useDispatch} from 'react-redux';
import {
  getEmail_action,
  changeEmail_action,
  dismissChangeEmailError_action,
} from '@state/ducks/changeEmail';
import {Block} from '../../commonComponents';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';
import {Input, PricingCard} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function ManuelEkspertizRandevusuAdim4({navigation, screenProps}) {
  const loader = useSelector(state => state.changeEmail?.loader);
  const [fullname, setFullname] = useState('');
  const [ay, setAy] = useState('');
  const [yil, setYil] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const dispatch = useDispatch();
  const resolve = useCallback(
    res => {
      screenProps.openModalSuccess({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || res || 'Başarıyla Güncellendi'}
            </Text>
          </Block>
        ),
        onClose: () => {},
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
          dispatch(dismissChangeEmailError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  /** get config action */
  const getEmail = useCallback(
    () => dispatch(getEmail_action(res => {}, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  /** */
  const handleUpdate = () => {
    navigation.navigate('ManuelEkspertizRandevusuAdim5');
  };
  /** didmount */
  useEffect(() => {
    //getEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, {flex: 1}]}>
      <Header
        style={{backgroundColor: BaseColor.whiteColor}}
        title="Kartla Ödeme"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={{flex: 1, backgroundColor: 'rgb(246,246,246)'}}>
        <View
          style={[
            BaseStyle.bodyPaddingDefault,
            {marginBottom: 20, backgroundColor: 'rgb(246,246,246)'},
          ]}>
          <Text headline semibold style={{marginTop: 20}}>
            Kartla Ödeme
          </Text>
          <TextInput
            style={[
              BaseStyle.textInput,
              {marginTop: 10, backgroundColor: '#fff'},
            ]}
            onChangeText={value => setCardNumber(value)}
            autoCorrect={false}
            placeholder="Kart Numarası"
            keyboardType="numeric"
            value={cardNumber}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1.5}}>
              <TextInput
                style={[BaseStyle.textInput, {backgroundColor: '#fff'}]}
                onChangeText={value => setAy(value)}
                autoCorrect={false}
                placeholder="Ay"
                value={ay}
                maxLength={2}
                keyboardType="numeric"
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={{flex: 1.5, marginLeft: 10}}>
              <TextInput
                style={[BaseStyle.textInput, {backgroundColor: '#fff'}]}
                onChangeText={value => setYil(value)}
                autoCorrect={false}
                maxLength={4}
                placeholder="Yıl"
                keyboardType="numeric"
                value={yil}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={{flex: 3.5, marginLeft: 10}}>
              <TextInput
                style={[BaseStyle.textInput, {backgroundColor: '#fff'}]}
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
              {marginTop: 10, backgroundColor: '#fff'},
            ]}
            onChangeText={value => setFullname(value)}
            autoCorrect={false}
            placeholder="Kart Üzerindeki İsim"
            value={fullname}
            selectionColor={BaseColor.primaryColor}
          />
        </View>
      </ScrollView>
      <View style={styles.btnWrapper}>
        <Button full loading={loader} onPress={handleUpdate}>
          Ödeme Yap
        </Button>
      </View>
    </SafeAreaView>
  );
}
export default compose(
  withProps(() => {
    const {getLoader} = useSelector(state => state.changeEmail);
    return {
      loading: getLoader,
    };
  }),
  withLoadingScreen({}),
)(ManuelEkspertizRandevusuAdim4);
const styles = StyleSheet.create({
  btnWrapper: {
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  labelHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: BaseColor.grayColor,
  },
  sectionHolder: {
    marginHorizontal: 10,
    marginVertical: 7,
  },
});
