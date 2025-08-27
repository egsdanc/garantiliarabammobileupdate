import React, {useEffect} from 'react';
import {SectionList} from 'react-native';
import {Header, SafeAreaView} from '@components';
import {BaseColor, BaseStyle} from '@config';
import {Icon} from '@common';
import {Block, Button, StepProgress} from '@common';
import {SectionHeader, SectionItem} from './item';
import {specification_action} from '@state/ducks/IlanVer/ozellikler';
import {useSelector, useDispatch} from 'react-redux';
import {withLoadingScreen} from '@hocs';
const SectionListL = withLoadingScreen({})(SectionList);

import {styles} from './styles';

const Ozellikler = ({navigation}) => {
  const {
    data = [],
    error: {message = ''},
    loading,
  } = useSelector(state => state.specification);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(specification_action({id: 13}));
  }, []);
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Ozellikler"
        subTitle="Ücretsiz İlan ver"
        renderLeft={() => (
          <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SectionListL
        loading={loading}
        sections={data}
        contentContainerStyle={styles.container}
        keyExtractor={(item, index) => item.key}
        renderItem={({item}) => <SectionItem item={item} />}
        renderSectionHeader={({section: {title}}) => (
          <SectionHeader title={title} />
        )}
      />
      <Block margin={[10, 20]} row space="between" flex={false}>
        <StepProgress step={5} />
        <Button onPress={() => navigation.navigate('Packages')}>
          Devam Et
        </Button>
      </Block>
    </SafeAreaView>
  );
};

export default Ozellikler;
