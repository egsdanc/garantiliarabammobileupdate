import React, { useCallback, useState, useEffect } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
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
import { BaseStyle, BaseColor } from '@config';
import { useSelector, useDispatch } from 'react-redux';
import {
  getEmail_action,
  changeEmail_action,
  dismissChangeEmailError_action,
} from '@state/ducks/changeEmail';
import { Block } from '../../commonComponents';
import { compose, withLoadingScreen } from '@hocs';
import { withProps } from '../../hocs';
import { Input } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function ManuelEkspertizRandevusuAdim3({ navigation, screenProps, route }) {
  const loader = useSelector(state => state.changeEmail?.loader);
  const [expertiseData, setExpertiseData] = useState(null);
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [email, setEmail] = useState('');
  const [selectedMarka, setSelectedMarka] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [saseNo, setSaseNo] = useState('');
  const [motorNo, setMotorNo] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [hours, _] = useState([
    { label: '08:30', value: '1' },
    { label: '09:00', value: '2' },
    { label: '09:30', value: '3' },
    { label: '10:00', value: '4' },
    { label: '10:30', value: '5' },
    { label: '11:00', value: '6' },
    { label: '11:30', value: '7' },
    { label: '12:00', value: '8' },
    { label: '12:30', value: '9' },
    { label: '13:00', value: '10' },
    { label: '13:30', value: '11' },
    { label: '14:00', value: '12' },
    { label: '14:30', value: '13' },
    { label: '15:00', value: '14' },
    { label: '15:30', value: '15' },
    { label: '16:00', value: '16' },
    { label: '16:30', value: '17' },
    { label: '17:00', value: '18' },
    { label: '17:30', value: '19' },
    { label: '18:00', value: '20' },
  ]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
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
        onClose: () => { },
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
    () => dispatch(getEmail_action(res => { }, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  /** */
  const handleUpdate = () => {
    if (ad == '') {
      Alert.alert('Hata', 'Adınızı Giriniz');
    } else if (soyad == '') {
      Alert.alert('Hata', 'Soyadınızı Giriniz');
    } else if (email == '') {
      Alert.alert('Hata', 'Email adresinizi Giriniz');
    } else if (selectedMarka == '') {
      Alert.alert('Hata', 'Aracınızın Markasını Giriniz');
    } else if (selectedModel == '') {
      Alert.alert('Hata', 'Araç Model Yılını Giriniz');
    } else if (saseNo == '') {
      Alert.alert('Hata', 'Araç Şase Numarasını Giriniz');
    } else if (motorNo == '') {
      Alert.alert('Hata', 'Araç Motor Numarasını Giriniz');
    } else if (selectedDate == '') {
      Alert.alert('Hata', 'Randevu Tarihi Seçiniz');
    } else if (selectedHour == '') {
      Alert.alert('Hata', 'Randevu Saati Seçiniz');
    } else {
      navigation.navigate('ManuelEkspertizRandevusuAdim6');
    }
  };
  /** didmount */
  useEffect(() => {
    if (route?.params?.expertiseData) {
      setExpertiseData(route.params.expertiseData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]}>
      <Header
        style={{ backgroundColor: BaseColor.whiteColor }}
        title="Paket Seçiniz"
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
        <View style={{ flex: 1, paddingVertical: 10 }}>
          {/*ad*/}
          <Input
            label={'Ad:'}
            autoCorrect={false}
            placeholderTextColor={BaseColor.grayColor}
            labelStyle={styles.labelHeader}
            inputStyle={[
              styles.input,
              {
                color: '#000',
              },
            ]}
            placeholder="Ad"
            maxLength={100}
            inputContainerStyle={BaseStyle.textInput}
            editable={true}
            selectionColor={BaseColor.primaryColor}
            onChangeText={value => {
              setAd(value);
            }}
          />
          {/*soyad*/}
          <Input
            label={'Soyad:'}
            autoCorrect={false}
            placeholderTextColor={BaseColor.grayColor}
            labelStyle={styles.labelHeader}
            inputStyle={[
              styles.input,
              {
                color: '#000',
              },
            ]}
            placeholder="Soyad"
            maxLength={100}
            inputContainerStyle={BaseStyle.textInput}
            editable={true}
            selectionColor={BaseColor.primaryColor}
            onChangeText={value => {
              setSoyad(value);
            }}
          />
          {/*email*/}
          <Input
            label={'Email:'}
            maxLength={100}
            textContentType={'emailAddress'}
            autoCorrect={false}
            placeholderTextColor={BaseColor.grayColor}
            labelStyle={styles.labelHeader}
            inputStyle={[
              styles.input,
              {
                color: '#000',
              },
            ]}
            placeholder="Email"
            inputContainerStyle={BaseStyle.textInput}
            editable={true}
            selectionColor={BaseColor.primaryColor}
            onChangeText={value => {
              setEmail(value);
            }}
          />
          <View style={styles.sectionHolder}>
            <Text style={styles.labelHeader}>Araç Bilgileri</Text>
          </View>
          {/*marka*/}
          <View>
            <Input
              label={'Marka:'}
              maxLength={100}
              autoCorrect={false}
              placeholderTextColor={BaseColor.grayColor}
              labelStyle={styles.labelHeader}
              inputStyle={[
                styles.input,
                {
                  color: '#000',
                },
              ]}
              placeholder="Marka"
              inputContainerStyle={BaseStyle.textInput}
              editable={true}
              selectionColor={BaseColor.primaryColor}
              onChangeText={value => {
                setSelectedMarka(value);
              }}
            />
          </View>
          {/*model*/}
          <View>
            <Input
              label={'Model Yılı:'}
              autoCorrect={false}
              maxLength={100}
              textContentType={'telephoneNumber'}
              placeholderTextColor={BaseColor.grayColor}
              labelStyle={styles.labelHeader}
              inputStyle={[
                styles.input,
                {
                  color: '#000',
                },
              ]}
              placeholder="Model Yılı"
              inputContainerStyle={BaseStyle.textInput}
              editable={true}
              selectionColor={BaseColor.primaryColor}
              onChangeText={value => {
                setSelectedModel(value);
              }}
            />
          </View>
          {/*sase no*/}
          <Input
            label={'Şase No:'}
            autoCorrect={false}
            maxLength={100}
            placeholderTextColor={BaseColor.grayColor}
            labelStyle={styles.labelHeader}
            inputStyle={[
              styles.input,
              {
                color: '#000',
              },
            ]}
            placeholder="Şase No"
            inputContainerStyle={BaseStyle.textInput}
            editable={true}
            selectionColor={BaseColor.primaryColor}
            onChangeText={value => {
              setSaseNo(value);
            }}
          />
          {/*motor no*/}
          <Input
            label={'Motor No:'}
            autoCorrect={false}
            placeholderTextColor={BaseColor.grayColor}
            labelStyle={styles.labelHeader}
            inputStyle={[
              styles.input,
              {
                color: '#000',
              },
            ]}
            placeholder="Motor No"
            inputContainerStyle={BaseStyle.textInput}
            editable={true}
            selectionColor={BaseColor.primaryColor}
            onChangeText={value => {
              setMotorNo(value);
            }}
          />
          {/*randevu tarihi*/}
          <View style={[styles.sectionHolder, { flexDirection: 'row' }]}>
            <View style={{ flex: 0.7 }}>
              <Text style={[styles.labelHeader]}>Randevu Tarihi Seçiniz:</Text>
              <Text bold>{selectedDate}</Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <Button onPress={() => setIsDatePickerVisible(true)}>Seç</Button>
            </View>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            style={{ heigth: 130, width: 200 }}
            contentContainerStyleIOS={{ alignContent: 'space-between' }}
            isDarkModeEnabled={false}
            mode="date"
            minimumDate={new Date()}
            date={new Date()}
            maximumDate={moment(new Date())
              .add(7, 'days')
              .toDate()}
            onConfirm={value => {
              setSelectedDate(
                moment(value)
                  .format('DD-MM-YYYY')
                  .toString(),
              );
              setIsDatePickerVisible(false);
            }}
            onCancel={() => {
              setIsDatePickerVisible(false);
            }}
            cancelTextIOS="Vazgec"
            confirmTextIOS="Onayla"
            headerTextIOS="Randevu tarihi	seçiniz "
            locale="tr_TR"
            titleIOS={'Tarih Seçiniz'}
          />
          {/* saatler */}
          <View style={styles.sectionHolder}>
            <Text style={styles.labelHeader}>Saat Seç</Text>
            <RNPickerSelect
              doneText="Seç"
              value={selectedDate}
              items={hours}
              onValueChange={(value, index) => {
                setSelectedHour(value);
              }}
              placeholder={{ label: 'Saat Seçiniz', value: null }}
              style={{
                inputIOSContainer: {
                  ...BaseStyle.textInput,
                  fontSize: 14,
                  fontWeight: '200',
                },
                inputAndroidContainer: {
                  ...BaseStyle.textInput,
                  fontSize: 14,
                  fontWeight: '200',
                },
                marginHorizontal: 10,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnWrapper}>
        <Button full loading={loader} onPress={handleUpdate}>
          Devam Et
        </Button>
      </View>
    </SafeAreaView>
  );
}
export default compose(
  withProps(() => {
    const { getLoader } = useSelector(state => state.changeEmail);
    return {
      loading: getLoader,
    };
  }),
  withLoadingScreen({}),
)(ManuelEkspertizRandevusuAdim3);
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
