import React, {PureComponent} from 'react';
import {StyleSheet, View, ScrollView, Switch} from 'react-native';
import {Header, SafeAreaView, Button, Icon, Text, Container} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';
import {Card, ListItem} from 'react-native-elements';

const notificationData = [
  {
    title: 'İLAN BİLDİRİMLERİ',
    data: [
      {
        title: 'İlan onay beklerken haber ver.',
        inWebpage: true,
        ePosta: false,
      },
      {
        title: 'İlan tarihi güncellendiğinde haber ver.	        ',
        inWebpage: true,
        ePosta: false,
      },
    ],
  },
  {
    title: 'KULLANICI BİLDİRİMLERİ',
    data: [
      {
        title: 'Son aramamla ilgili haber ver.',

        inWebpage: true,
        ePosta: false,
      },
    ],
  },
  {
    title: 'FAVORİ BİLDİRİMLERİ	',
    data: [
      {
        title: 'Favori ilanımın fiyatı düştüğünde haber ver ',
        inWebpage: true,
        ePosta: false,
      },
      {
        title: 'Favori arama sonuçlarımla ilgili haber ver.	        ',
        inWebpage: true,
        ePosta: false,
      },
      {
        title: 'Favori satıcı sonuçlarımla ilgili haber ver.',
        inWebpage: true,
        ePosta: false,
      },
    ],
  },
];
export default class HasarSorgulama extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ePosta: false,
      phone: true,
      sms: false,
    };
  }
  select(objIndex, dataIndex, value, key) {
    const newData = this.state.data;
    const selected = newData[objIndex].data[dataIndex];
    selected[key] = !value;
    newData[objIndex].data[dataIndex] = selected;
    this.setState({
      data: [...newData],
    });
  }
  render() {
    const {navigation} = this.props;
    const {ePosta, phone, sms} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView}>
        <Header
          title="Hasar Sorgulama"
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
          <Card>
            <View style={styles.contentWrapper}>
              <Text body1>
               Hasar Sorgulama hizmeti çok yakında sizlerle...
              </Text>
              </View>
          </Card>
        </ScrollView>
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
  switchContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  switch: {
    padding: 5,
  },
  switchContainer: {
    flexDirection: 'row',
  },
  cardTitle: {
    color: BaseColor.webBlue,
    fontSize: 16,
  },
});
