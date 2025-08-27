import React, { useCallback, useState, useEffect } from 'react';
import {
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

function AddNewAddress({ navigation, screenProps, route }) {
  const loader = useSelector(state => state.changeEmail?.loader);
  const [adressTypes, _] = useState([
    { label: 'Ev Adresi', value: 'ev' },
    { label: 'İş Adresi', value: 'is' },
  ]);
  const [iller, setIller] = useState([
    { label: 'Ankara', value: 'ankara' },
    { label: 'Istanbul', value: 'istanbul' },
  ]);
  const [ilceler, setIlceker] = useState([
    { label: 'Yenimahalle', value: 'yenimahalle' },
  ]);
  const [mahalleler, setMahalleler] = useState([
    { label: 'Mehmet Akif Ersoy Mahallesi', value: 'mehmetakifersoy' },
  ]);
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
    //dispatch(changeEmail_action(payload, resolve, reject));
  };
  /** didmount */
  useEffect(() => {
    //getEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]}>
      <Header
        style={{ backgroundColor: BaseColor.whiteColor }}
        title="Adres Ekle/Düzenle"
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
          {/*adres basligi*/}
          <Input
            label={'Adres Başlığı:'}
            autoCorrect={false}
            placeholderTextColor={BaseColor.grayColor}
            labelStyle={styles.labelHeader}
            inputStyle={[
              styles.input,
              {
                color: '#000',
              },
            ]}
            placeholder="Adres Başlığı"
            inputContainerStyle={BaseStyle.textInput}
            editable={true}
            selectionColor={BaseColor.primaryColor}
            onChangeText={value => { }}
          />
          {/*adres turu*/}
          <View style={styles.sectionHolder}>
            <Text style={styles.labelHeader}>Adres Türü</Text>
            <RNPickerSelect
              doneText="Seç"
              value={'ev'}
              items={adressTypes}
              onValueChange={(value, index) => { }}
              placeholder={{ label: 'Adres Türü Seçiniz', value: null }}
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
          {/*il*/}
          <View style={styles.sectionHolder}>
            <Text style={styles.labelHeader}>İli</Text>
            <RNPickerSelect
              doneText="Seç"
              value={'ankara'}
              items={iller}
              onValueChange={(value, index) => { }}
              placeholder={{ label: 'İl Seçiniz', value: null }}
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
          {/*ilce*/}
          <View style={styles.sectionHolder}>
            <Text style={styles.labelHeader}>İlçesi</Text>
            <RNPickerSelect
              doneText="Seç"
              value={'yenimahalle'}
              items={ilceler}
              onValueChange={(value, index) => { }}
              placeholder={{ label: 'İlçe Seçiniz', value: null }}
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
          {/*semt*/}
          <View style={styles.sectionHolder}>
            <Text style={styles.labelHeader}>Semti</Text>
            <RNPickerSelect
              doneText="Seç"
              value={'yenimahalle'}
              items={ilceler}
              onValueChange={(value, index) => { }}
              placeholder={{ label: 'Semt Seçiniz', value: null }}
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
          {/*mahalle*/}
          <View style={styles.sectionHolder}>
            <Text style={styles.labelHeader}>Mahallesi</Text>
            <RNPickerSelect
              doneText="Seç"
              value={'mehmetakifersoy'}
              items={mahalleler}
              onValueChange={(value, index) => { }}
              placeholder={{ label: 'Semt Seçiniz', value: null }}
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
          {/*sokak bulvar*/}
          <View>
            <Text style={[styles.labelHeader, styles.sectionHolder]}>
              Sokak / Bulvar
            </Text>
            <Input
              autoCorrect={false}
              placeholderTextColor={BaseColor.grayColor}
              labelStyle={styles.labelHeader}
              inputStyle={[
                styles.input,
                {
                  color: '#000',
                },
              ]}
              placeholder="Sokak, Bulvar"
              inputContainerStyle={BaseStyle.textInput}
              editable={true}
              selectionColor={BaseColor.primaryColor}
              onChangeText={value => { }}
            />
          </View>
          {/*kapi numarasi bina numarasi*/}
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 0.5 }}>
              <Input
                label={'Bina Numarası'}
                autoCorrect={false}
                placeholderTextColor={BaseColor.grayColor}
                labelStyle={styles.labelHeader}
                inputStyle={[
                  styles.input,
                  {
                    color: '#000',
                  },
                ]}
                placeholder="Bina No"
                inputContainerStyle={BaseStyle.textInput}
                editable={true}
                selectionColor={BaseColor.primaryColor}
                onChangeText={value => { }}
              />
            </View>
            <View style={{ flex: 0.5 }}>
              <Input
                label={'Kapı Numarası'}
                autoCorrect={false}
                placeholderTextColor={BaseColor.grayColor}
                labelStyle={styles.labelHeader}
                inputStyle={[
                  styles.input,
                  {
                    color: '#000',
                  },
                ]}
                placeholder="Kapı No"
                inputContainerStyle={BaseStyle.textInput}
                editable={true}
                selectionColor={BaseColor.primaryColor}
                onChangeText={value => { }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnWrapper}>
        {route?.params?.data != undefined ? (
          <View style={{ flexDirection: 'row' }}>
            <Button
              style={{
                flex: 0.5,
                marginHorizontal: 5,
                backgroundColor: BaseColor.grayColor,
              }}
              loading={loader}
              onPress={handleUpdate}>
              Sil
            </Button>
            <Button
              style={{ flex: 0.5, marginHorizontals: 5 }}
              loading={loader}
              onPress={handleUpdate}>
              Kaydet
            </Button>
          </View>
        ) : (
          <Button full loading={loader} onPress={handleUpdate}>
            Kaydet
          </Button>
        )}
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
)(AddNewAddress);
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
  input: {
    fontSize: 15,
  }
});
