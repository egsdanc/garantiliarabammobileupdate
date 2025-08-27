import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, StyleSheet, ScrollView} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Icon, Table} from '@common';
import {Header} from '@components';
import {compose, withProps, withLoadingScreen} from '@hocs';
import {useCompareCars} from '../../state/ducks/CompareCars';
import * as Utils from '@utils';
import {Image} from '@components';
export const CompareCars = compose(
  withProps(useCompareCars),
  withLoadingScreen({}),
  React.forwardRef,
)(({navigation, compareCars, clearComparecar, data, cars, canCompare}, _) => {
  /** watcher */
  const [carArray, setCarArray] = useState([]);
  const [img1, setImageUrlFirst] = useState('');
  const [img2, setImageUrlSecond] = useState('');

  useEffect(() => {
    if (canCompare === false) {
      navigation.goBack();
    }
  }, [canCompare, navigation]);

  useEffect(() => {
    setTableData();
  }, []);

  const setTableData = () => {
    let newobj = {};
    let newArr = [];
    for (let i = 0; i < cars?.length; i++) {
      newobj.Başlık = cars[i].ad_title;
      newobj.Renk = cars[i].ad_color;
      newobj.Km = cars[i].ad_km;
      newobj.Fiyat = cars[i].ad_price;
      newobj.KasaTipi = cars[i].code_of_body;
      newobj.Takas = cars[i].ad_swap;
      newobj.AracDurumu = cars[i].carStatus;
      newobj.Marka = cars[i].car_brand;
      newobj.MotorHacmi = cars[i].car_cc;
      newobj.Yıl = cars[i].car_year;
      newobj.Sehir = cars[i].city;
      newobj.Yakıt = cars[i].code_of_fuel;
      newobj.Vites = cars[i].code_of_gear;
      newArr[i] = newobj;
      newobj = {};
      if (i === 0) {
        setImageUrlFirst(
          'https://image.garantiliarabam.com/upload/' + cars[i].thumb,
        );
      } else if (i === 1) {
        setImageUrlSecond(
          'https://image.garantiliarabam.com/upload/' + cars[i].thumb,
        );
      }
    }
    setCarArray(newArr);
  };
  /** didmount */

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title="Araba Karşılaştır"
        renderLeft={() => (
          <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => (
          <Icon
            name="notification-clear-all"
            type="material-community"
            size={20}
            color={BaseColor.primaryColor}
          />
        )}
        onPressRight={clearComparecar}
      />
      {carArray.length > 0 ? (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flex: 1,
            }}>
            <Image
              source={{uri: img1}}
              style={styles.listImage}
              resizeMode="contain"
            />

            <Image
              source={{uri: img2}}
              style={styles.listImage}
              resizeMode="contain"
            />
          </View>

          <Table data={carArray} />
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  listImage: {
    minHeight: Utils.scaleWithPixel(60),
    minWidth: Utils.scaleWithPixel(80),
    width: 120,
    height: 120,
    flex: 1,
    borderRadius:30,
    marginBottom:15,
  },
});

export default CompareCars;
