import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, ScrollView, Switch, TextInput, Alert } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ExpertiseDatePicker,
} from '@components';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';
import { getDealersList_action } from '@state/ducks/getDealersList';
import {
  checkUserForExpertise_action,
  dismissEkspertizTalepError_action,
} from '@state/ducks/ekspertizTalep';
import { Block } from '../../commonComponents';
import moment from 'moment';
import { withLoadingScreen, withProps } from '../../hocs';
import { compose } from 'redux';

const EkspertizRandevu = ({ navigation, screenProps, route }) => {
  const [bayiId, setBayiId] = useState(null);
  const [bayiAdi, setBayiAdi] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [email, setEmail] = useState('');
  const [contract, setContract] = useState(false);
  const { list } = useSelector(state => state.getDealersList);
  const { loader } = useSelector(state => state.ekspertizTalep);
  const dispatch = useDispatch();
  const { data } = route?.params || {}; // params olabilir veya olmayabilir, güvenlik için boş obje
  const resolve = useCallback(
    res => {
      if (res.status === 'OK') {
        let data = {
          ad_code: data.ad_code,
          dealer_id: bayiId,
          dealer_name: bayiAdi,
          start_date: moment().format('YYYY-MM-DD'),
          end_date: endDate,
          expertise_email: email,
        };
        navigation.navigate('EkspertizRandevuPaketSec', { data });
      } else if (res.status === 'ERROR') {
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
      } else if (res.status === 'NEEDUPDATE') {
        Alert.alert(
          'Uyarı',
          res?.message,
          [
            {
              text: 'İptal',
              onPress: () => { },
              style: 'cancel',
            },
            { text: 'Dogrula', onPress: () => navigation.navigate('TCKN') },
          ],
          { cancelable: false },
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps, bayiId, endDate, email],
  );
  const reject = useCallback(
    res => {
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

  /** action */
  const getData = useCallback(() => dispatch(getDealersList_action()), [
    dispatch,
  ]);
  /** action */
  const sendRequest = useCallback(
    data => dispatch(checkUserForExpertise_action(data, resolve, reject)),
    [dispatch, reject, resolve],
  );
  /** didmount */
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = () => {
    let errorMessage =
      bayiId === null
        ? 'Bayi seçiniz.'
        : endDate === null
          ? 'Son  tarihi seçiniz.'
          : email === ''
            ? 'Email alanını doldurunuz'
            : !contract
              ? 'Sözleşmeyi onaylayınız.'
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
      let data = {
        bayi_id: bayiId,
        start_date: moment().format('YYYY-MM-DD'),
        end_date: endDate,
      };
      sendRequest(data);
    }
  };
  return (
    <SafeAreaView
      style={{ ...BaseStyle.safeAreaView, backgroundColor: 'rgb(246,246,246)' }}
      forceInset={{ top: 'always' }}>
      <Header
        title="Ekspertiz Randevu"
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
        <View style={{ alignItems: 'center', padding: 20 }}>
          <View style={styles.card}>
            <Text caption2 light style={{ marginBottom: 5 }}>
              Ilan no
            </Text>
            <Text style={styles.expText}>
              {data?.ad_code}
            </Text>
          </View>
          <View style={styles.card}>
            <Text caption2 light style={{ marginBottom: 5 }}>
              Araç Sahibinin Adı Soyadı
            </Text>
            <Text style={styles.expText}>
              {data.owner?.name +
                ' ' +
                data.owner?.surname}
            </Text>
          </View>
          <View style={styles.selectInput}>
            <Text caption2 light style={{ marginBottom: 5 }}>
              Bayi Seçiniz
            </Text>
            <RNPickerSelect
              ref={picker => {
                //this._selectPicker = picker;
              }}
              doneText="Seç"
              value={bayiId}
              items={(list || []).map(item => ({
                value: item.BAYII_KOD,
                label: item.BAYII_ADI,
              }))}
              onValueChange={value => {
                setBayiId(value);
                let selectedName = list.filter(item => {
                  return item.BAYII_KOD == value;
                });
                setBayiAdi(selectedName[0].BAYII_ADI);
              }}
              placeholder={{ label: '', value: null }}
              style={{
                inputIOSContainer: styles.selectInputContent,
                inputAndroidContainer: styles.selectInputContent,
                inputIOS: styles.expText,
                inputAndroid: styles.expText,
              }}
            />
          </View>
          <View style={styles.input}>
            <Text>Ekspertize Gidilecek En Geç Tarih</Text>
            <ExpertiseDatePicker
              checkOutTime={endDate}
              onChange={date => setEndDate(date)}
            />
            <Text caption1 light>
              İlan sahibi bugün ile seçeceğiniz son tarih arasındaki bir günü
              seçerek randevu yaptıracak ve randevu zamanında aracını ekspertize
              götürecektir.
            </Text>
          </View>
          <View style={styles.input}>
            <Text style={{ marginBottom: 8 }}>Talep Eden Eposta Adresi</Text>
            <TextInput
              style={{ ...BaseStyle.textInput, backgroundColor: '#fff' }}
              onChangeText={value => setEmail(value)}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder=""
              placeholderTextColor={BaseColor.grayColor}
              value={email}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={{ marginBottom: 8, width: '80%' }}>
              <Text onPress={() => { }} primaryColor>
                Ön Bilgilendirme Formunu{' '}
              </Text>
              ve
              <Text primaryColor> Mesafeli Sözleşmeyi </Text> kabul ediyorum.
            </Text>
            <Switch
              trackColor={{
                false: BaseColor.grayColor,
                true: BaseColor.primaryColor,
              }}
              style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
              thumbColor={'#fff'}
              ios_backgroundColor={BaseColor.fieldColor}
              onValueChange={() => {
                setContract(!contract);
              }}
              value={contract}
            />
          </View>

          <View style={styles.btnContainer}>
            <Button onPress={onSubmit} style={{ width: '100%' }} loading={loader}>
              Ekspertiz Talep Et
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default compose(
  withProps(() => {
    const { loader } = useSelector(state => state.getDealersList);
    return {
      loading: loader,
    };
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(EkspertizRandevu);
