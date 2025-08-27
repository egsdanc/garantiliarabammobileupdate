import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  KeyboardAwareScrollView,
  Button,
} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';
import {Input, Avatar, CheckBox, ListItem} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
const selectData = [
  {
    title: 'Secim 1',
    id: '1',
    checked: true,
  },
  {
    title: 'Secim 2',
    id: '2',
  },
];
const statusList = [
  {
    title: 'Seçiniz',
    id: 0,
    checked: true,
  },
  {
    title: 'Başarılı',
    id: 1,
  },
  {
    title: 'Başarısız',
    id: 2,
  },
];
const productTypeList = [
  {
    title: 'Seçiniz',
    id: 0,
    checked: true,
  },
  {
    title: 'Ekspertiz TTalebi',
    id: 1,
  },
  {
    title: 'İlan Bonusu',
    id: 2,
  },
  {
    title: 'Hediye Paketi',
    id: 3,
  },
];

export default class ChangePhoneNumber extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      max: '',
      min: '',
      startDate: new Date(),
      endDate: new Date(),
      isDatePickerVisible: false,
      statusList: statusList,
      productTypeList: productTypeList,
    };
  }
  hideDatePicker() {
    this.setState({isDatePickerVisible: false});
  }

  handleApplyStatus = list => {
    this.setState({statusList: list});
  };
  handleApplyProductType = list => {
    this.setState({productTypeList: list});
  };

  handleConfirm(state, date) {
    this.setState({
      [state]: date,
    });
    this.hideDatePicker();
  }

  getSelectedStatus = () => {
    let selected = [...this.state.statusList].filter(item => item.checked)[0];
    return selected?.title || 'Seçiniz';
  };
  getSelectedType = () => {
    let selected = [...this.state.productTypeList].filter(
      item => item.checked,
    )[0];
    return selected?.title || 'Seçiniz';
  };
  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={BaseStyle.safeAreaView}>
        <Header
          title="Hesap Hareketlerim"
          renderLeft={() => {
            return (
              <Icon
                name="arrow-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          <Input
            label={'Minimum Tutar	 '}
            autoCorrect={false}
            placeholderTextColor={BaseColor.grayColor}
            labelStyle={styles.inputLabel}
            inputStyle={styles.input}
            placeholder="Minimum Tutar "
            inputContainerStyle={BaseStyle.textInput}
            selectionColor={BaseColor.primaryColor}
            value={this.state.min}
            onChangeText={min => this.setState({min})}
          />
          <Input
            label={'Maksimum Tutar	 '}
            autoCorrect={false}
            placeholderTextColor={BaseColor.grayColor}
            labelStyle={styles.inputLabel}
            inputStyle={styles.input}
            placeholder="Maksimum Tutar"
            inputContainerStyle={BaseStyle.textInput}
            selectionColor={BaseColor.primaryColor}
            value={this.state.max}
            onChangeText={max => this.setState({max})}
          />
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            date={this.state.startDate}
            onConfirm={startDate => this.handleConfirm('startDate', startDate)}
            onCancel={() => this.hideDatePicker()}
            cancelTextIOS="Vazgec"
            maximumDate={new Date()}
            confirmTextIOS="Onayla"
            headerTextIOS="Doğum Tarihi	seçiniz "
            locale="tr_TR" // Use "en_GB" here
          />

          <ListItem
            title={<Text body1>{'Başlangıç Tarihi'}</Text>}
            onPress={() => this.setState({isDatePickerVisible: true})}
            chevron={
              <Icon
                name="angle-right"
                size={18}
                color={BaseColor.primaryColor}
              />
            }
            rightTitle={moment(this.state.startDate).format('DD/MM/YYYY')}
          />

          <ListItem
            title={<Text body1>{'Bitiş Tarihi'}</Text>}
            onPress={() => this.setState({isDatePickerVisible: true})}
            chevron={
              <Icon
                name="angle-right"
                size={18}
                color={BaseColor.primaryColor}
              />
            }
            rightTitle={moment(this.state.endDate).format('DD/MM/YYYY')}
          />
          <ListItem
            title={<Text body1>Durumu</Text>}
            onPress={() =>
              navigation.navigate('ModalPicker', {
                data: this.state.statusList,
                headerTitle: 'Durumu',
                onApply: this.handleApplyStatus,
              })
            }
            chevron={
              <Icon
                name="angle-right"
                size={18}
                color={BaseColor.primaryColor}
              />
            }
            rightTitle={this.getSelectedStatus()}
            rightTitleProps={{numberOfLines: 1}}
          />
          <ListItem
            title={<Text body1>Ürün Tipi </Text>}
            onPress={() =>
              navigation.navigate('ModalPicker', {
                data: productTypeList,
                headerTitle: 'Ürün Tipi	',
                onApply: this.handleApplyProductType,
              })
            }
            chevron={
              <Icon
                name="angle-right"
                size={18}
                color={BaseColor.primaryColor}
              />
            }
            rightTitle={this.getSelectedType()}
            rightTitleProps={{numberOfLines: 1}}
          />
          <View style={styles.btnWrapper}>
            <Button full onPress={() => navigation.goBack()}>
              Filtrele / Arama Yap
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  inputLabel: {
    fontWeight: '300',
    color: 'black',
    fontSize: 16,
    paddingBottom: 10,
  },
  input: {
    fontSize: 18,
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
});
