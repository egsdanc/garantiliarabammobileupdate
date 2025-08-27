import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { selectCategory_action } from '@state/ducks/selectCategory';
import { selectModel_action } from '@state/ducks/selectModel';
import { setModel_action } from '@state/ducks/IlanVer';
import { styles } from './styles';
import { Header, SafeAreaView, Text, Icon } from '@components';
import { BaseStyle, BaseColor } from '@config';
import { ListItem, Divider } from 'react-native-elements';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { values } from 'ramda';
import { Text as Txt, Block } from '@common';

import { withLoadingScreen } from '@hocs';

const LView = withLoadingScreen({})(ScrollView);
export default function SelectCategory({ navigation, screenProps, route }) {
  // const {data, error, loading} = useSelector(state => state.selectCategory);
  const { data, loading } = useSelector(
    state => ({
      data: state.selectCategory.data,
      loading: state.selectModel.loading || state.selectCategory.loading,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();
  const { ids } = route?.params
  useEffect(() => {
    const payload = {
      ids,
      reject: err => reject(err),
    };
    dispatch(selectCategory_action(payload));
  }, []);
  const reject = err => {
    screenProps.openModalError({
      body: () => (
        <Block p4 m4>
          <Text center middle>
            {err?.message || err.msg || 'Beklenmedik Hata Oluştu'}
          </Text>
        </Block>
      ),
    });
  };
  const select = (parameter, _id) => {
    const payload = {
      data: { [parameter]: ids },
      reject: err => reject(err),
      resolve: _data => {
        navigation.navigate('IlanDetay', { data: _data });
      },
    };
    dispatch(selectModel_action(payload));
    dispatch(setModel_action({ [parameter]: ids }));
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Kategori Seçimi"
        onPressLeft={() => navigation.goBack()}
        renderLeft={() => {
          return (
            <Icon name="angle-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        renderRight={() => {
          return (
            <Icon name="home" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressRight={() => {
          // navigation.navigate('Home');
          navigation.navigate('BottomTabNavigator', {
            screen: 'Home' // Drawer içindeki Home screen'ine direkt git
          })
        }}
      />
      <LView loading={loading}>
        {data &&
          data.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.wrapper}
                onPress={() => select('id', item.id)}>
                <Text
                  body1
                  bold
                  accentColor
                  center
                  style={{ textAlign: 'center', padding: 10 }}>
                  {item.model}
                </Text>
                <View style={styles.textWrapper}>
                  {values(item).map(
                    (i, idx) =>
                      i.length > 1 &&
                      typeof i === 'object' && (
                        <View style={styles.row} key={idx}>
                          <Text primaryColor bold>
                            {' '}
                            *{' '}
                          </Text>
                          <Text>
                            {i[0]}
                            <Text primaryColor> : </Text>
                            {i[1]}
                          </Text>
                        </View>
                      ),
                  )}
                  <View style={styles.row}>
                    <Text primaryColor bold>
                      {' '}
                      *{' '}
                    </Text>
                    <Text>
                      {item.startYear}
                      <Text primaryColor> - </Text>
                      {item.endYear}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text primaryColor bold>
                      {' '}
                      *{' '}
                    </Text>
                    <Text>
                      Motor gücü
                      <Text primaryColor> : </Text>
                      {item.hp} HP
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text primaryColor bold>
                      {' '}
                      *{' '}
                    </Text>
                    <Text>
                      Motor Hacmi
                      <Text primaryColor> : </Text>
                      {item.cc} CC
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <Divider />
            </View>
          ))}

        <ListItem
          title={<Text body1>Arabamı Bulamadım</Text>}
          bottomDivider
          onPress={() => select('type', null)}
          chevron={
            <Icon name="angle-right" size={18} color={BaseColor.primaryColor} />
          }
        />
      </LView>
    </SafeAreaView>
  );
}
