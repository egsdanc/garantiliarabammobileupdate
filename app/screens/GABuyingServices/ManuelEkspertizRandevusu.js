import React, {useCallback, useState, useEffect} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import {BaseStyle, BaseColor} from '@config';
import {useSelector, useDispatch} from 'react-redux';
import {
  getIller_action,
  getBayiler_action,
  dismissError_action,
} from '@state/ducks/getIlIlceler';
import {Block} from '../../commonComponents';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';
import {Input} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

function ManuelEkspertizRandevusu({navigation, screenProps}) {
  const loader = useSelector(state => state.changeEmail?.loader);
  const [plaka, setPlaka] = useState('');
  const [telefon, setTelefon] = useState('');
  const [iller, setIller] = useState([]);
  const [selectedIl, setSelectedIl] = useState('');
  const [bayiler, setBayiler] = useState([]);
  const [selectedBayi, setSelectedBayi] = useState('');
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const resolve = useCallback(
    res => {
      if (res && res.datas) {
        res.datas = res.datas.map(value => {
          return {
            value: value.value,
            label: value.text,
          };
        });
        setIller(res.datas);
        setBayiler([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  const resolveDealers = useCallback(
    res => {
      if (res && res.datas) {
        res.datas = res.datas.map(value => {
          return {
            value: value.BAYII_KOD,
            label: value.BAYII_ADI,
          };
        });
        if (res.datas.length > 0) {
          setBayiler(res.datas);
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      }
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
          dispatch(dismissError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  const getCities = useCallback(
    () => dispatch(getIller_action(resolve, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  /** get config action */
  const getDealers = useCallback(
    payload => dispatch(getBayiler_action(payload, resolveDealers, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  /** */
  const handleUpdate = () => {
    if (plaka == '') {
      Alert.alert('Hata', 'Plakayı Yazınız');
    } else if (telefon == '') {
      Alert.alert('Hata', 'Telefon Yazınız');
    } else if (selectedBayi == '') {
      Alert.alert('Hata', 'Bayi Seçiniz');
    } else {
      let regPlaka = /^([0-9]{2})([A-Z]{1,3})([0-9]{2,4})$/;
      if (regPlaka.test(plaka.toUpperCase()) === false) {
        Alert.alert('Hata', 'Plakayı doğru yazınız.');
      } else {
        let expertiseData = {plaka, telefon, bayi: selectedBayi};
        navigation.navigate('ManuelEkspertizRandevusuAdim2', {expertiseData});
      }
    }
  };
  /** didmount */
  useEffect(() => {
    getCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, {flex: 1}]}>
      <Header
        style={{backgroundColor: BaseColor.whiteColor}}
        title="Ekspertiz Randevusu"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return <Icon name="home" size={20} color={BaseColor.primaryColor} />;
        }}
        onPressRight={() => {
          navigation.navigate('OurService');
        }}
      />
      <ScrollView>
        <View style={{flex: 1, paddingVertical: 10}}>
          {/*plaka*/}
          <Input
            label={'Plaka:'}
            autoCorrect={false}
            maxLength={20}
            placeholderTextColor={BaseColor.grayColor}
            labelStyle={styles.labelHeader}
            inputStyle={[
              styles.input,
              {
                color: '#000',
              },
            ]}
            placeholder="06ABC123"
            inputContainerStyle={BaseStyle.textInput}
            editable={true}
            selectionColor={BaseColor.primaryColor}
            onChangeText={value => {
              setPlaka(value);
            }}
          />
          {/*telefon*/}
          <Input
            label={'Telefon'}
            autoCorrect={false}
            placeholderTextColor={BaseColor.grayColor}
            labelStyle={styles.labelHeader}
            maxLength={11}
            keyboardType="numeric"
            textContentType={'telephoneNumber'}
            inputStyle={[
              styles.input,
              {
                color: '#000',
              },
            ]}
            placeholder="05556667788"
            inputContainerStyle={BaseStyle.textInput}
            editable={true}
            selectionColor={BaseColor.primaryColor}
            onChangeText={value => {
              setTelefon(value);
            }}
          />
          {/*il*/}
          <View style={styles.sectionHolder}>
            <Text style={styles.labelHeader}>İli</Text>
            <RNPickerSelect
              doneText="Seç"
              value={selectedIl}
              items={iller}
              onValueChange={(value, index) => {
                setSelectedIl(value);
                if (value > 0) {
                  let data = {selected_city: value};
                  getDealers(data);
                }
              }}
              placeholder={{label: 'İl Seçiniz', value: null}}
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
          {/*bayi listesi*/}
          <View style={styles.sectionHolder}>
            <Text style={styles.labelHeader}>Bayi Listesi</Text>
            <RNPickerSelect
              doneText="Seç"
              value={selectedBayi}
              items={bayiler}
              onValueChange={(value, index) => {
                setSelectedBayi(value);
              }}
              placeholder={{label: 'Bayi Listesi', value: null}}
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
        <Button
          disabled={disabled}
          full
          loading={loader}
          onPress={handleUpdate}>
          Devam Et
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
)(ManuelEkspertizRandevusu);
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
    marginVertical: 10,
  },
  input: {
    fontSize: 15,
  },
});
