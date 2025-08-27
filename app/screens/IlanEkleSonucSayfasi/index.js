import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { packages_action } from '@state/ducks/IlanVer/packages';
import { Header, SafeAreaView, Button, Text } from '@components';
import { BaseColor, BaseStyle } from '@config';
import { Icon } from '@common';
export default function IlanEkleSonucSayfasi({ navigation }) {
  const { data, error, loading } = useSelector(state => state.packages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(packages_action());
  }, []);
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="İlanınız Yayınlandı"
        subTitle=""
      />
      <Block paddingTop={50}>
        <Text>İlanınız sisteme kaydedildi. Yönetici onayından sonra yayınlanacaktır.</Text>
        <Button onPress={() => {
          // navigation.navigate('Home');
          navigation.navigate('BottomTabNavigator', {
            screen: 'Home' // Drawer içindeki Home screen'ine direkt git
          })
        }}>
          Anasayfaya Git
        </Button>
      </Block>
    </SafeAreaView>
  );
}
