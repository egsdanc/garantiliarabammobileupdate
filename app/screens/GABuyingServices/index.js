import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Header, SafeAreaView, Icon, Text} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';
import {ListItem} from 'react-native-elements';

import {styles} from './styles';

const list = [
  {
    title: 'Ekspertiz Randevusu',
    key: 'ekspertizrandevusu',
    screen: 'ManuelEkspertizRandevusu',
  },
  {title: 'Hasar Sorgulama', key: 'hasarsorgulama', screen: 'HasarSorgulama'},
  {
    title: 'Ekspertiz Sorgulama (Bize Özel)',
    key: 'carexpertise',
    screen: 'CarExpertise',
  },
  {title: 'Araç karşılaştırma', key: 'carcompare', screen: 'CarCompare'},
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
          title="Garantili Hizmetler"
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
              onPress={() => navigation.navigate(item.screen)}
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
