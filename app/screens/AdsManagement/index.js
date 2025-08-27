import React, {PureComponent} from 'react';
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import {Header, SafeAreaView, Icon, Text, Container} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';
import {ListItem} from 'react-native-elements';

const data = [
  {
    title: 'Yayında Olan İlanlar',
    subtitle: '',
    screen: 'SubIlan',
  },
  {
    title: 'Yayında Olmayan İlanlar',
    subtitle: '',
    screen: 'SubIlan',
  },
  {
    title: 'Ekspertizli Olan',
    subtitle: '',
    screen: 'SubIlan',
  },
  {
    title: 'Ekspertizsiz Olan',
    subtitle: '(Aracıma Güveniyorum)',
    screen: 'SubIlan',
  },
];
export default class BlockUsers extends PureComponent {
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
          title="İlan Yönetimi"
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
        <ScrollView>
          {data.map((item, i) => (
            <ListItem
              key={i}
              title={<Text body1>{item.title}</Text>}
              subtitle={
                item.subtitle ? <Text subtitle>{item?.subtitle}</Text> : null
              }
              bottomDivider
              onPress={() =>
                Alert.alert('Çok Yakında', 'İlanlarınızı çok yakında mobilden yönetebileceksiniz')
                //navigation.navigate(item.screen, {title: item.title})
              }
              chevron={
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                />
              }
              rightTitle={item.length}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({});
