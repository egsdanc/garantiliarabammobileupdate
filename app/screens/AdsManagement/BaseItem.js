import React, { PureComponent } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';

import { Header, SafeAreaView, Icon, IlanListItem } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
const list = [
  {
    title: 'Sahibinden Temiz Araç',
    carTitle: 'Toyota Corolla 1.6 Elegant MMT',
    location: 'Ankara / Yenimahalle / Mehmet Akif Ersoy Mah.',
    date: '19.08.2020',
    avatar_url: Images.car01,
    visitorCount: '0',
    favoriteCount: '5',
    amount: '120.000$',
    ticket: 'Sahibinden',
    ticketBackground: 'brown',
  },
  {
    title: 'temiz araç',
    carTitle: 'TOYOTA Corolla 1.6 Dream',
    location: 'Ankara / Yenimahalle / Mehmet Akif Ersoy Mah.',
    date: '19.08.2020',
    avatar_url: Images.car02,
    visitorCount: '5',
    favoriteCount: '3',
    amount: '19.000$',
    ticket: 'ARABAMA GÜVENİYORUM',
    ticketBackground: 'green',
  },
  {
    title: 'Sahibinden Temiz Araç',
    carTitle: 'Toyota Corolla 1.6 Elegant MMT',
    location: 'Ankara / Yenimahalle / Mehmet Akif Ersoy Mah.',
    date: '19.08.2020',
    avatar_url: Images.car01,
    visitorCount: '0',
    favoriteCount: '5',
    amount: '120.000$',
    ticket: 'Sahibinden',
    ticketBackground: 'brown',
  },
  {
    title: 'temiz araç',
    carTitle: 'TOYOTA Corolla 1.6 Dream',
    location: 'Ankara / Yenimahalle / Mehmet Akif Ersoy Mah.',
    date: '19.08.2020',
    avatar_url: Images.car02,
    visitorCount: '5',
    favoriteCount: '3',
    amount: '19.000$',
    ticket: 'ARABAMA GÜVENİYORUM',
    ticketBackground: 'green',
  },
];
export default function OnlineAds({ navigation, route }) {
  const { title } = route.params;
  const onSelect = data => {
    const selectData = [
      {
        title: 'Düzenle',
        id: '1',
        checked: true,
      },
      {
        title: 'İlanı Kaldır',
        id: '2',
      },
      {
        title: 'Görüntülenme Raporu',
        id: '3',
      },
    ];
    navigation.navigate('ModalPicker', {
      data: selectData,
      headerTitle: data.title,
    });
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title={title}
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: BaseColor.fieldColor,
        }}>
        {list.map((l, i) => (
          <IlanListItem data={l} key={i} onSelect={_data => onSelect(_data)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
