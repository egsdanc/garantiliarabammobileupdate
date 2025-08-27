import React, { useState, useCallback } from 'react';
import { ScrollView, Image, Alert } from 'react-native';
import { Images, BaseColor } from '@config';
import { Header, Icon, Text, Button as Btn } from '@components';
import {
  Block,
  Button,
  StepProgress,
  SafeAreaView,
  Text as Txt
} from '@common';

import styles from './styles';
import MapView from './mapView';
import AddressForm from './addressForm';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
export default ({ navigation }) => {
  const [isVisibleModal, setIsVisibleModal] = useState(true);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mahalleId, setMahalleId] = useState(null);
  const [location, setLocation] = useState(null);

  const openMap = () => {
    setIsVisibleModal(false);
    setType("map")
  }

  const selectAddress = () => {
    setIsVisibleModal(false);
    setType("form")
  }

  const resetPage = () => {
    setIsVisibleModal(true)
    setType(null)
    setMahalleId(null)
  }

  const onSubmit = useCallback(() => {
    if (mahalleId || location) {
      navigation.navigate('Iletisim')
    } else {
      Alert.alert('Hata', "Konum için seçiminizi yapınız", [{text: 'Tamam'}]);
    }
  }, [mahalleId, location])


  return (
    <SafeAreaView>
      <Header
        title="Ücretsiz İlan ver"
        subTitle="Konum için seçim yapınız."
        subStyle={{ textAlign: 'center', margin: 0, padding: 0 }}
        titleStyle={{ textAlign: 'center', margin: 0, padding: 0 }}
        styleCenter={{ marginBottom: 0, paddingBottom: 0 }}
        renderLeft={() => (
          <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <View style={{ flex: 1 }}>
        {isVisibleModal ? (
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={openMap}
                style={styles.modalBtn}>
                <Text>Şuanki Konumunu Kullan</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={selectAddress} style={styles.modalBtn}>
                <Text>Konum İşaretlemeden Devam Et</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : type === "map" ?
          <MapView setLocation={setLocation} resetPage={resetPage} />
          : <AddressForm mahalleId={mahalleId} setMahalleId={setMahalleId} />
        }
      </View>
      {!isVisibleModal && (
        <ListItem
          title="Diger Secenekler"
          onPress={resetPage}
          bottomDivider
          rightIcon={{ name: 'chevrons-up', type: 'feather' }}
        />
      )}
      <Block style={{ backgroundColor: '#fff' }} flex={false}>
        <Block margin={[20, 20]} row space="between" flex={false}>
          <StepProgress step={3} />
          {
            (!isVisibleModal && (type === "map" || (type === "form" && mahalleId !== null))) &&
            (<Button onPress={onSubmit}>
              Devam Et
            </Button>)
          }
        </Block>
      </Block>
    </SafeAreaView>
  );
};
