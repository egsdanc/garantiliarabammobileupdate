import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text, Button, Container } from '@components';
import styles from './styles';
import { getPackagesList_action } from '@state/ducks/getDealersList';
import { Block } from '../../commonComponents';
import { withLoadingScreen, withProps } from '../../hocs';
import { compose } from 'redux';

const PackageList = ({ selected, paket, onPress = () => { } }) => {
  return selected ? (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.selectedCard}>
      <View style={styles.cardHeader}>
        <Text title1 whiteColor>
          {paket?.paket_adi} {paket?.fiyat}₺
        </Text>
      </View>
      <View style={styles.list}>
        <View style={styles.dotWhite} />
        <Text whiteColor>{paket?.aciklama} </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text title1>
          {paket?.paket_adi} {paket?.fiyat}₺
        </Text>
      </View>
      <View style={styles.list}>
        <View style={styles.dot} />
        <Text>{paket?.aciklama} </Text>
      </View>
    </TouchableOpacity>
  );
};

const EkspertizRandevuPaketSec = ({ navigation, screenProps }, _) => {
  const { packagesList } = useSelector(state => state.getDealersList);
  const dispatch = useDispatch();
  const { data } = route?.params || {}; // params olabilir veya olmayabilir, güvenlik için boş obje
  /** action */
  const getData = useCallback(
    bayiId => dispatch(getPackagesList_action(bayiId)),
    [dispatch],
  );
  /** action */
  const onSubmit = () => {
    if (paketId) {
      navigation.navigate('EkspertizRandevuOdeme', {
        data: {
          ...data,
          package_code: paketId,
          package_name: paketAdi,
          package_price: paketFiyat,
        },
      });
    } else {
      screenProps.openModalError({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {'Paket seçiniz.'}
            </Text>
          </Block>
        ),
        onClose: () => { },
      });
    }
  };
  /** didmount */
  useEffect(() => {
    getData(data?.dealer_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [paketId, setPaketId] = useState(null);
  const [paketAdi, setPaketAdi] = useState(null);
  const [paketFiyat, setPaketFiyat] = useState(null);
  return (
    <SafeAreaView
      style={{ ...BaseStyle.safeAreaView, backgroundColor: 'rgb(246,246,246)' }}
      forceInset={{ top: 'always' }}>
      <Header
        title="Ekspertiz Paketi Seç"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {packagesList.map(item => (
          <PackageList
            key={Math.random()}
            paket={item}
            selected={item.paket_kodu === paketId}
            onPress={() => {
              setPaketId(item.paket_kodu);
              setPaketAdi(item.paket_adi);
              setPaketFiyat(item.fiyat);
            }}
          />
        ))}
      </ScrollView>
      <Container>
        <Button full onPress={onSubmit}>
          Ekspertiz Talep Et
        </Button>
      </Container>
    </SafeAreaView>
  );
};
export default compose(
  withProps(() => {
    const { loader } = useSelector(state => state.getDealersList);
    return {
      loading: loader,
    };
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(EkspertizRandevuPaketSec);
