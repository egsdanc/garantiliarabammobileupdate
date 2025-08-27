import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Header, SafeAreaView, Icon, Text} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';
import {ListItem} from 'react-native-elements';

import {styles} from './styles';

const list = [
  {
    title: 'Üyelik Bilgilerim',
    subData: [
      {
        title: 'Kişisel Bilgiler',
        key: 'personalInformation',
        screen: 'PersonalInfo',
      },
      {title: 'Adreslerim', key: 'adres', screen: 'AddressList'},
      {title: 'E-Posta', key: 'ePosta', screen: 'EPosta'},
      {title: 'Cep Telefonu', key: 'phone', screen: 'ChangePhoneNumber'},
      {title: 'Güvenlik', key: 'security', screen: 'Security'},
      {
        title: 'Aktif Oturumlarım',
        key: 'activeSession',
        screen: 'ActiveSession',
      },
      {
        title: 'Şifre Değişikliği',
        key: 'changePassword',
        screen: 'ChangePassword',
      },
      {title: 'TCKN Doğrulama', key: 'tckn', screen: 'TCKN'},
      {
        title: 'Üyelik İptali',
        key: 'membershipCancellation',
        screen: 'MembershipCancellation',
      },
    ],
    screen: 'MembershipInfo',
  },
  {
    title: 'Hesap Hareketlerim',
    subData: [],
    screen: 'Transactions',
  },
  {
    title: 'Engellediğim Üyeler',
    subData: [],
    screen: 'BlockUsers',
  },
  {
    title: 'Bildirim İzinlerim',
    subData: [],
    screen: 'Notifications',
  },
  {
    title: 'Elektronik İleti İzinlerim',
    subData: [],
    screen: 'ElectronicNotification',
  },
  {
    title: 'Engellediğim İlanlar',
    subData: [],
    screen: 'adBlock',
  }
];
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView>
        <Header
          title="Bana Özel"
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
        <View style={styles.container}>
          {list.map((item, i) => (
            <ListItem
              key={i}
              title={<Text body1>{item.title}</Text>}
              bottomDivider
              onPress={() =>
                navigation.navigate(item.screen, {data: item.subData})
              }
              chevron={
                item.subData ? (
                  <Icon
                    name="angle-right"
                    size={18}
                    color={BaseColor.primaryColor}
                  />
                ) : (
                  false
                )
              }
            />
          ))}
        </View>
      </SafeAreaView>
    );
  }
}
