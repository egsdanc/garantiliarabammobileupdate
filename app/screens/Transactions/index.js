import React, {PureComponent} from 'react';
import {Header, SafeAreaView, Icon} from '@components';
import {BaseStyle, BaseColor} from '@config';

export default class Transactions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      max: '',
      min: '',
      startDate: new Date(),
      endDate: new Date(),

      isDatePickerVisible: false,
    };
  }
  hideDatePicker() {
    this.setState({isDatePickerVisible: false});
  }

  handleConfirm(date) {
    this.setState({
      birthDate: date,
    });
    this.hideDatePicker();
  }
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
          renderRight={() => {
            return (
              <Icon name="filter" size={20} color={BaseColor.primaryColor} />
            );
          }}
          onPressRight={() => navigation.navigate('TransactionFilter')}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </SafeAreaView>
    );
  }
}
