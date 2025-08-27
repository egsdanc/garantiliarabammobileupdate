import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {packages_action} from '@state/ducks/IlanVer/packages';
import {Header, SafeAreaView} from '@components';
import {BaseColor, BaseStyle} from '@config';
import {Icon} from '@common';
import {SectionList, Text} from 'react-native';
import {Block, Button, StepProgress} from '@common';
import {ListItem} from 'react-native-elements';
const {data: DATA} = require('./data.json');
import {SectionHeader, SectionItem} from './item';
import {styles} from './styles';
export default function Packages({navigation}) {
  const {data, error, loading} = useSelector(state => state.packages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(packages_action());
  }, []);
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Vitaminler"
        subTitle="Ücretsiz İlan ver"
        renderLeft={() => (
          <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <SectionList
        sections={DATA}
        contentContainerStyle={styles.container}
        keyExtractor={(item, index) => item.key}
        renderItem={({item}) => <SectionItem item={item} />}
        renderSectionHeader={({section: {title}}) => (
          <SectionHeader title={title} />
        )}
      />
      <Block margin={[10, 20]} row space="between" flex={false}>
        <StepProgress step={5} />
        <Button onPress={() => navigation.navigate('IlanEkleSonucSayfasi')}>
          Tamamla
        </Button>
      </Block>
    </SafeAreaView>
  );
}
