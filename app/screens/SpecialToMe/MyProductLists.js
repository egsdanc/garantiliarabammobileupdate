import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Container} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';

export default class MyProductLists extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
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
          title="Listeleme Ürünlerim"
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
        <Container>
          <Text body1>Coming soon...</Text>
        </Container>
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
  colorRed: {color: 'red'},
});
