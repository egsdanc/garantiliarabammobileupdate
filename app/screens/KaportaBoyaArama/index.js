import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text, Image } from '@components';
import RNPickerSelect from 'react-native-picker-select';
import Swiper from 'react-native-swiper';
import styles from './styles';
import {
  carTypes,
  staticTypes,
  staticPartTypes,
  staticPartTypesObject,
  defaultKaportaSearchState,
} from '@data';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { withLoadingScreen, withProps } from '../../hocs';
import {
  getCarCategoryList_action,
  dismissKaportaBoyaError_action,
} from '@state/ducks/kaportaBoya';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const KaportaBoyaArama = ({ navigation, carCatTypes, carCatTypeImages }, _) => {
  let _viewPager = null;
  let _selectPicker = null;
  const [carTypeKey, setCarTypeKey] = useState('sedan');
  const [selectedPart, setSelectedPart] = useState({});
  const [position, setPosition] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(
    defaultKaportaSearchState,
  );
  const [coloredPresses, setColoredPressed] = useState(false);
  const [faultlessPressed, setFaultlessPressed] = useState(false);
  const onSearch = () => {
    let filtering = { ...selectedFilter };
    //delete null values  from filter
    Object.keys(filtering).forEach(
      key => filtering[key] == null && delete filtering[key],
    );

    navigation.navigate('SearchResults', {
      sorting: 'newDatesFirst',
      filtering: {
        kaportaBoya: {
          vehicleType: carTypeKey,
          specs: filtering,
        },
      },
      modelIds: '1',
    });
  };
  const dispatch = useDispatch();
  /** action */
  const getData = useCallback(
    () => dispatch(getCarCategoryList_action()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  /** didmount */
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="Kaporta Boya Arama"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return (
            <Icon name="search" size={20} color={BaseColor.primaryColor} />
          );
        }}
        renderRightSecond={() => {
          return <Icon name="redo" size={20} color={BaseColor.primaryColor} />;
        }}
        onPressRight={onSearch}
        onPressRightSecond={() => {
          setCarTypeKey('sedan');
          setSelectedFilter(defaultKaportaSearchState);
          _viewPager && _viewPager.scrollTo(0);
        }}
      />
      <RNPickerSelect
        ref={picker => {
          _selectPicker = picker;
        }}
        doneText="Seç"
        value={selectedFilter[selectedPart] || null}
        items={staticPartTypes}
        onValueChange={(value, index) => {
          let updatedValue = { ...selectedFilter, [selectedPart]: value };
          setSelectedFilter(updatedValue);
        }}
        placeholder={{ label: 'Aşağdakilerden birini seçiniz.', value: null }}
        style={{
          inputIOSContainer: {
            display: 'none',
          },
          inputAndroidContainer: {
            display: 'none',
          },
        }}
      />
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.blockView}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 0.8 }}>
                <View
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 20,
                    marginTop: 10,
                  }}>
                  <Text body1>{'Araç Türü Seçin'}</Text>
                  <RNPickerSelect
                    doneText="Seç"
                    value={carTypeKey}
                    items={carCatTypes}
                    onValueChange={(value, index) => {
                      setCarTypeKey(value);
                    }}
                    placeholder={{ label: 'Arac Modeli Seçiniz', value: null }}
                    style={{
                      inputIOSContainer: {
                        ...BaseStyle.textInput,
                        fontSize: 14,
                        fontWeight: '200',
                      },
                      inputAndroidContainer: {
                        ...BaseStyle.textInput,
                        fontSize: 14,
                        fontWeight: '200',
                      },
                    }}
                  />
                </View>
              </View>
              <View style={{ flex: 0.2 }}>
                <Image
                  style={{ width: '100%', height: 80, marginTop: 10 }}
                  resizeMode={'contain'}
                  source={{ uri: carCatTypeImages[carTypeKey]?.topRightButton }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 4 }}>
          <View style={{ flex: 1, width: '100%', marginBottom: 30 }}>
            <Swiper
              ref={viewPager => {
                _viewPager = viewPager;
              }}
              style={{ flex: 1, justifyContent: 'flex-start' }}
              index={0}
              onIndexChanged={index => {
                setPosition(index);
              }}
              loop={false}
              showsPagination={false}>
              <View key="1" style={styles.tabContent}>
                <Image
                  source={{ uri: carCatTypeImages[carTypeKey]?.uri1 }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={'contain'}
                />
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('bagaj');
                  }}
                  style={[styles.roundedView, { position: 'absolute', top: 10 }]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.bagaj
                      ? staticPartTypesObject[selectedFilter.bagaj]
                      : 'Bagaj'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('tavan');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '40%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.tavan
                      ? staticPartTypesObject[selectedFilter.tavan]
                      : 'Tavan'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('kaput');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '80%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.kaput
                      ? staticPartTypesObject[selectedFilter.kaput]
                      : 'Kaput'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('solsaseucu');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '85%', left: '23%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.solsaseucu
                      ? staticPartTypesObject[selectedFilter.solsaseucu]
                      : 'Sol Şase'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('sagsaseucu');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '85%', left: '65%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.sagsaseucu
                      ? staticPartTypesObject[selectedFilter.sagsaseucu]
                      : 'Sağ Şase'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View key="2" style={styles.tabContent}>
                <Image
                  source={{ uri: carCatTypeImages[carTypeKey]?.uri2 }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={'contain'}
                />
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('onpanel');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '40%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.onpanel
                      ? staticPartTypesObject[selectedFilter.onpanel]
                      : 'Ön Panel'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('ontampon');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '60%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.ontampon
                      ? staticPartTypesObject[selectedFilter.ontampon]
                      : 'Ön Tampon'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View key="3" style={styles.tabContent}>
                <Image
                  source={{ uri: carCatTypeImages[carTypeKey]?.uri3 }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={'contain'}
                />
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('arkapanel');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '40%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.arkapanel
                      ? staticPartTypesObject[selectedFilter.arkapanel]
                      : 'Arka Panel'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('arkatampon');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '60%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.arkatampon
                      ? staticPartTypesObject[selectedFilter.arkatampon]
                      : 'Arka Tampon'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View key="4">
                <Image
                  source={{ uri: carCatTypeImages[carTypeKey]?.uri4 }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={'contain'}
                />
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('sagarkadirek');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '33%', left: 0 },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.sagarkadirek
                      ? staticPartTypesObject[selectedFilter.sagarkadirek]
                      : 'Sag Arka Direk'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('sagortadirek');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '33%', left: '28%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.sagortadirek
                      ? staticPartTypesObject[selectedFilter.sagortadirek]
                      : 'Sağ Orta Direk'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('sagondirek');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '33%', left: '55%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.sagondirek
                      ? staticPartTypesObject[selectedFilter.sagondirek]
                      : 'Sağ Ön Direk'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('sagarkacamurluk');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '50%', left: 0 },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.sagarkacamurluk
                      ? staticPartTypesObject[selectedFilter.sagarkacamurluk]
                      : 'Sağ Arka Çamurluk'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('sagarkakapi');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '44%', left: '20%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.sagarkakapi
                      ? staticPartTypesObject[selectedFilter.sagarkakapi]
                      : 'Sağ Arka Kapı'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('sagonkapi');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '44%', left: '48%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.sagonkapi
                      ? staticPartTypesObject[selectedFilter.sagonkapi]
                      : 'Sağ Ön Kapı'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('sagoncamurluk');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '50%', left: '66%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.sagoncamurluk
                      ? staticPartTypesObject[selectedFilter.sagoncamurluk]
                      : 'Sağ Ön Çamurluk'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('sagmarspiyel');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '55%', left: '40%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.sagmarspiyel
                      ? staticPartTypesObject[selectedFilter.sagmarspiyel]
                      : 'Sağ Marşpiyel'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View key="5">
                <Image
                  source={{ uri: carCatTypeImages[carTypeKey]?.uri5 }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={'contain'}
                />
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('solondirek');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '37%', left: '20%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.solondirek
                      ? staticPartTypesObject[selectedFilter.solondirek]
                      : 'Sol Ön Direk'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('solortadirek');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '33%', left: '48%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.solortadirek
                      ? staticPartTypesObject[selectedFilter.solortadirek]
                      : 'Sol Orta Direk'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('solarkadirek');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '37%', left: '75%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.solarkadirek
                      ? staticPartTypesObject[selectedFilter.solarkadirek]
                      : 'Sol Arka Direk'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('soloncamurluk');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '50%', left: 0 },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.soloncamurluk
                      ? staticPartTypesObject[selectedFilter.soloncamurluk]
                      : ' Sol Ön Çamurluk'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('solonkapi');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '44%', left: '25%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.solonkapi
                      ? staticPartTypesObject[selectedFilter.solonkapi]
                      : ' Sol Ön Kapı'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('solarkakapi');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '44%', left: '55%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.solarkakapi
                      ? staticPartTypesObject[selectedFilter.solarkakapi]
                      : 'Sol Arka Kapı'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('solarkacamurluk');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '50%', left: '66%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.solarkacamurluk
                      ? staticPartTypesObject[selectedFilter.solarkacamurluk]
                      : 'Sol Arka Çamurluk'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _selectPicker && _selectPicker.togglePicker();
                    setSelectedPart('solmarspiyel');
                  }}
                  style={[
                    styles.roundedView,
                    { position: 'absolute', top: '55%', left: '40%' },
                  ]}>
                  <Text style={styles.roundedViewText}>
                    {selectedFilter.solmarspiyel
                      ? staticPartTypesObject[selectedFilter.solmarspiyel]
                      : 'Sol Marşpiyel'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Swiper>
            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {position > 0 ? (
                <FontAwesome name="arrow-left" color="grey" size={20} />
              ) : null}
              {position < 4 ? (
                <FontAwesome name="arrow-right" color="grey" size={20} />
              ) : null}
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setColoredPressed(false);
                  setFaultlessPressed(false);
                  setSelectedFilter(defaultKaportaSearchState);
                }}
                style={styles.roundedView2}>
                <Text style={styles.roundedViewText2}>Sıfırla</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setColoredPressed(false);
                  setFaultlessPressed(true);
                  setSelectedFilter({
                    bagaj: 'KPT_XX',
                    tavan: 'KPT_XX',
                    kaput: 'KPT_XX',
                    solsaseucu: 'KPT_XX',
                    sagsaseucu: 'KPT_XX',
                    onpanel: 'KPT_XX',
                    ontampon: 'KPT_XX',
                    arkapanel: 'KPT_XX',
                    arkatampon: 'KPT_XX',
                    sagarkadirek: 'KPT_XX',
                    sagortadirek: 'KPT_XX',
                    sagondirek: 'KPT_XX',
                    sagarkacamurluk: 'KPT_XX',
                    sagarkakapi: 'KPT_XX',
                    sagonkapi: 'KPT_XX',
                    sagoncamurluk: 'KPT_XX',
                    sagmarspiyel: 'KPT_XX',
                    solondirek: 'KPT_XX',
                    solortadirek: 'KPT_XX',
                    solarkadirek: 'KPT_XX',
                    soloncamurluk: 'KPT_XX',
                    solonkapi: 'KPT_XX',
                    solarkakapi: 'KPT_XX',
                    solarkacamurluk: 'KPT_XX',
                    solmarspiyel: 'KPT_XX',
                  });
                }}
                style={
                  faultlessPressed == true
                    ? styles.roundedViewColored
                    : styles.roundedView2
                }>
                <Text
                  style={
                    faultlessPressed == true
                      ? styles.roundedViewColoredText
                      : styles.roundedViewText2
                  }>
                  Hatasız
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setColoredPressed(true);
                  setFaultlessPressed(false);
                  setSelectedFilter({
                    bagaj: 'KPT_BY',
                    tavan: 'KPT_BY',
                    kaput: 'KPT_BY',
                    solsaseucu: 'KPT_BY',
                    sagsaseucu: 'KPT_BY',
                    onpanel: 'KPT_BY',
                    ontampon: 'KPT_BY',
                    arkapanel: 'KPT_BY',
                    arkatampon: 'KPT_BY',
                    sagarkadirek: 'KPT_BY',
                    sagortadirek: 'KPT_BY',
                    sagondirek: 'KPT_BY',
                    sagarkacamurluk: 'KPT_BY',
                    sagarkakapi: 'KPT_BY',
                    sagonkapi: 'KPT_BY',
                    sagoncamurluk: 'KPT_BY',
                    sagmarspiyel: 'KPT_BY',
                    solondirek: 'KPT_BY',
                    solortadirek: 'KPT_BY',
                    solarkadirek: 'KPT_BY',
                    soloncamurluk: 'KPT_BY',
                    solonkapi: 'KPT_BY',
                    solarkakapi: 'KPT_BY',
                    solarkacamurluk: 'KPT_BY',
                    solmarspiyel: 'KPT_BY',
                  });
                }}
                style={
                  coloredPresses == true
                    ? styles.roundedViewColored
                    : styles.roundedView2
                }>
                <Text
                  style={
                    coloredPresses == true
                      ? styles.roundedViewColoredText
                      : styles.roundedViewText2
                  }>
                  Komple Boyalı
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default compose(
  withProps(() => {
    const { loader, list } = useSelector(state => state.kaportaBoya);
    let carCatTypeImages = {};
    (list || []).map(({ thumb_image, value, images = [] }) => {
      carCatTypeImages[value] = {
        uri1: images[0] || '',
        uri2: images[1] || '',
        uri3: images[2] || '',
        uri4: images[3] || '',
        uri5: images[4] || '',
        topRightButton: thumb_image,
      };
    });
    return {
      loading: loader,
      carCatTypes: (list || []).map(({ label, value }) => ({ label, value })),
      carCatTypeImages,
    };
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(KaportaBoyaArama);
