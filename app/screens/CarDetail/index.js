import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { BaseStyle, BaseColor, Images } from '@config';
// import { TabView, TabBar } from 'react-native-tab-view';
import Swiper from 'react-native-swiper';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  Tag,
  HelpBlock,
  Button,
} from '@components';
import styles from './styles';
import { HelpBlockData } from '@data';
import { compose, withProps, withLoadingScreen } from '@hocs';
import { Table, Row, Rows } from 'react-native-table-component';
import {
  getCarDetail_action,
  setAdFavorite_action,
  dismissCarDetailError_action,
} from '@state/ducks/carDetail';
import {
  dismissLikeUserError_action,
  likeUser_action,
} from '@state/ducks/likeUser';
import { useDispatch, useSelector } from 'react-redux';
import { Block } from '../../commonComponents';
import { WebView } from 'react-native-webview';
import Share from 'react-native-share';
import { Icon as RNEIcon } from 'react-native-elements';
import { useCompareCars } from '../../state/ducks/CompareCars';
import { CompareCarsPop } from '../../commonComponents/CompareCars';
import AsyncStorage from '@react-native-community/async-storage';

const AdType = ({ type }) => {
  let color =
    type === 'expertise'
      ? '#d42222'
      : type === 'correct'
        ? '#2196F3'
        : type === 'sold'
          ? '#ef9b21'
          : type === 'trust_my_car'
            ? '#0cb713'
            : '#2196F3';
  let text =
    type === 'expertise'
      ? 'Ekspertizli'
      : type === 'correct'
        ? 'Hatasız'
        : type === 'sold'
          ? 'Satıldı'
          : type === 'trust_my_car'
            ? 'Aracıma Güveniyorum'
            : '';

  return text !== '' ? (
    <Tag
      numberOfLines={2}
      primary
      style={{
        backgroundColor: color,
        borderColor: color,
      }}>
      {text}
    </Tag>
  ) : null;
};

const shareUrl = ({ url, message, title }) => {
  const options = Platform.select({
    ios: {
      activityItemSources: [
        {
          // For sharing url with custom title.
          placeholderItem: { type: 'url', content: url },
          item: {
            default: { type: 'url', content: url },
          },
          subject: {
            default: title,
          },
          linkMetadata: { originalUrl: url, url, title },
        },
        {
          // For sharing text.
          placeholderItem: { type: 'text', content: message },
          item: {
            default: { type: 'text', content: message },
            message: null, // Specify no text to share via Messages app.
          },
          linkMetadata: {
            // For showing app icon on share preview.
            title: message,
          },
        },
        {
          // For using custom icon instead of default text icon at share preview when sharing with message.
          placeholderItem: {
            type: 'url',
            content: '',
          },
          item: {
            default: {
              type: 'text',
              content: `${message} ${url}`,
            },
          },
          linkMetadata: {
            title: message,
            icon: '',
          },
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message} ${url}`,
    },
  });
  Share.open(options);
};

const CarDetail = ({ navigation, screenProps, route }, _) => {
  const { data, loader } = useSelector(state => state.carDetail);
  const routes = [
    { key: 'ilan', title: 'İlan Bilgileri' },
    { key: 'description', title: 'Açıklama' },
    { key: 'ekspertiz', title: 'Ekspertiz Bilgileri' },
  ];

  const [index, setIndex] = useState(0);
  // const [height, setHeight] = useState('auto');
  // const [tab0Height, setTab0Height] = useState(0);
  // const [tab1Height, setTab1Height] = useState(0);
  // const [tab2Height, setTab2Height] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [favoriteUser, setFavoriteUser] = useState(false);
  const [tableHead, setTableHead] = useState([]);
  const [tableHeadWidths, setTableHeadWidths] = useState([
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
  ]);
  const [tableData, setTableData] = useState([]);
  const resolve = useCallback(res => {
    setFavorite(res?.ad_liked);
    setFavoriteUser(res?.is_seller_favorite);
    setTableHead(res?.meta?.ekspertiz?.dinamometre?.headers);
    setTableData(res?.meta?.ekspertiz?.dinamometre?.values);
    setTableHeadWidths(res?.meta?.ekspertiz?.dinamometre?.headers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const reject = useCallback(
    res => {
      screenProps.openModalError({
        body: () => (
          <View p4 m4>
            <Text center middle>
              {res?.message || 'Beklenmedik Hata Oluştu'}
            </Text>
          </View>
        ),
        onClose: () => {
          dispatch(dismissCarDetailError_action());
          dispatch(dismissLikeUserError_action());
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );

  const dispatch = useDispatch();
  /** action */
  const getData = useCallback(
    () =>
      dispatch(
        getCarDetail_action(route?.params?.ad_code, resolve, reject),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  /** action */
  const setAdFavorite = useCallback(
    () =>
      dispatch(
        setAdFavorite_action(route?.params?.ad_code, res => { }, reject),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  /** action */
  const likeUser = useCallback(
    userData =>
      dispatch(
        likeUser_action(
          userData,
          res => {
            setFavoriteUser(res === 'LIKE');
          },
          reject,
        ),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  // const setCurrentTabHeight = newHeight => {
  //   const deviceHeight = Dimensions.get('window').width;
  //   const tabHeight =
  //     newHeight !== 'auto' && newHeight < deviceHeight
  //       ? deviceHeight
  //       : newHeight;
  //   if (height !== tabHeight) {
  //     setHeight(tabHeight);
  //   }
  // };

  /** didmount */
  useEffect(() => {
    getData();
    AsyncStorage.getItem('@user').then(_user => {
      if (_user) {
        setCurrentUser(JSON.parse(_user));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTabContent = () => {
    switch (index) {
      case 0:
        return (
          <IlanTab
            data={data}
            currentUser={currentUser}
            navigation={navigation}
          />
        );
      case 1:
        return (
          console.log("dataacıklama", data),
          <AciklamaTab
            data={data?.ad_content || ''}
            navigation={navigation}
          />
        );
      case 2:
        if (
          data?.adType === 'sold' ||
          data?.adType === 'correct' ||
          data?.adType === 'expertise'
        ) {
          return (
            <EkspertizTab
              data={data || {}}
              navigation={navigation}
              tableHead={tableHead || []}
              tableData={tableData || []}
              tableHeadWidths={tableHeadWidths || []}
            />
          );
        } else {
          return (
            <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
              <Text body1>Bu araca ait ekspertiz yoktur</Text>
            </View>
          );
        }
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="İlan Detayı"
        subTitle={data?.ad_code}
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return favorite ? (
            <RNEIcon
              size={20}
              name="heart"
              type="font-awesome"
              color={BaseColor.primaryColor}
            />
          ) : (
            <Icon name="heart" size={20} color={BaseColor.primaryColor} />
          );
        }}
        renderRightSecond={() => {
          return (
            <Icon name="share-alt" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressRight={() => {
          if (currentUser != null) {
            setFavorite(!favorite);
            setAdFavorite();
          } else {
            navigation.navigate('SignIn');
          }
        }}
        onPressRightSecond={() => {
          shareUrl({
            url: `https://test.garantiliarabam.com/ilan/${data?.ad_code}`,
            message: data?.ad_title,
            title: data?.ad_title,
          });
        }}
      />
      {loader ? null : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: BaseColor.grayColor2,
              padding: 10,
            }}>
            <View style={{ flex: 0.3 }}>
              <AdType type={data?.adType} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 10 }} headline semiBold>
                {data.ad_title}
              </Text>
            </View>
          </View>
          <View style={(styles.line, { marginBottom: 0 })} />
          <View style={styles.wrapper}>
            <Swiper
              dotStyle={{
                backgroundColor: BaseColor.textSecondaryColor,
              }}
              activeDotColor={BaseColor.primaryColor}
              paginationStyle={styles.contentPage}
              removeClippedSubviews={false}>
              {(data?.meta?.photos || []).map((item, ind) => {
                return (
                  <TouchableOpacity
                    key={Math.random()}
                    onPress={() => {
                      navigation.navigate('PreviewImageOfAd', {
                        images: data?.meta?.photos || [],
                        indexSelected: ind,
                      });
                    }}>
                    <Image
                      source={{ uri: item[1] }}
                      style={styles.img}
                      resizeMode="contain"
                      key={item?.id || Math.random()}
                    />
                  </TouchableOpacity>
                );
              })}
            </Swiper>
          </View>
          <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
            <Text body2 semiBold style={{ color: BaseColor.navyBlue }}>
              {data?.owner?.name} {data?.owner?.surname}
            </Text>
            <Text footnote style={{ color: BaseColor.grayColor }}>
              {data?.district} {data?.city}
            </Text>
          </View>
          <View style={styles.line} />
          <View>
            <View style={{ width: '100%', marginTop: 10, marginLeft: 10 }}>
              <Text footnote semiBold style={{ color: BaseColor.navyBlue }}>
                {data?.categoryMap}
              </Text>
            </View>

            {/* Custom Tab Bar */}
            <View style={styles.tabbar}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'row' }}
              >
                {routes.map((route, routeIndex) => (
                  <TouchableOpacity
                    key={route.key}
                    style={[
                      styles.tab,
                      {
                        minWidth: 130,
                        alignItems: 'center',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        position: 'relative'
                      }
                    ]}
                    onPress={() => setIndex(routeIndex)}
                    activeOpacity={0.7}
                  >
                    <Text
                      body1
                      semibold={index === routeIndex}
                      style={{
                        fontSize: 14,
                        color: index === routeIndex
                          ? BaseColor.textPrimaryColor
                          : BaseColor.grayColor
                      }}
                    >
                      {route.title}
                    </Text>
                    {index === routeIndex && (
                      <View style={styles.indicator} />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Tab Content */}
            <View style={{ marginTop: 15 }}>
              {renderTabContent()}
            </View>
          </View>
        </ScrollView>
      )}
      {/* Pricing & Booking Process */}
      {loader ? null : (
        <View style={styles.contentButtonBottom}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserProfileDetail', { data: data });
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="user" size={15} color={BaseColor.black} />
              <Text
                bold
                style={{
                  color: BaseColor.navyBlue,
                  marginBottom: 5,
                  marginLeft: 10,
                }}>
                {data?.owner?.name} {data?.owner?.surname}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.row, { marginTop: 10 }]}>
            {currentUser != null && currentUser.id != data.user_id && (
              <View style={styles.actionItem}>
                <TouchableOpacity
                  style={styles.buttonItem}
                  onPress={() => {
                    if (currentUser != null) {
                      likeUser({ seller_id: data?.user_id });
                    } else {
                      navigation.navigate('SignIn');
                    }
                  }}
                  activeOpacity={0.5}>
                  <Text body2 primaryColor semibold>
                    {favoriteUser
                      ? 'Favorilerden Çıkar'
                      : 'Favori Satıcılarıma Ekle'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {data != null &&
              (data.nasilulasilsin == 'mesaj' ||
                data.nasilulasilsin == 'telefonvemesaj') && (
                <View style={styles.actionItem}>
                  <TouchableOpacity
                    style={styles.buttonItem}
                    onPress={() => {
                      if (currentUser != null) {
                        navigation.navigate('Messages', {
                          chatInfo: {
                            ad_code: data?.ad_code,
                            me: 'customer',
                            seller_id: data?.user_id,
                            customer_id: currentUser.id,
                          },
                        });
                      } else {
                        navigation.navigate('SignIn');
                      }
                    }}>
                    <Text body2 primaryColor semibold>
                      Mesaj Gönder
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            {data != null &&
              (data.nasilulasilsin == 'telefon' ||
                data.nasilulasilsin == 'telefonvemesaj') && (
                <View style={styles.actionItem}>
                  <TouchableOpacity
                    style={styles.buttonItem}
                    onPress={() => {
                      Linking.openURL(`tel:${data.user_cellphoneNumber}`);
                    }}>
                    <Text body2 primaryColor semibold>
                      Ara
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        </View>
      )}
      <CompareCarsPop navigation={navigation} />
    </SafeAreaView>
  );
};
export default compose(
  withProps(() => {
    const { loader } = useSelector(state => state.carDetail);
    const loading = useSelector(state => state.likeUser.loader);
    return {
      loading: loader || loading,
    };
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(CarDetail);

const IlanTab = ({
  data = {},
  navigation,
  currentUser = null,
}) => {
  const { addCar, removeCar, isSelected, cars } = useCompareCars();
  let information = [
    { title: 'Fiyat', key: 'ad_price' },
    { title: 'İlan No', key: 'ad_code' },
    { title: 'İlan Tarihi', key: 'date' },
    { title: 'Marka', key: 'car_brand' },
    { title: 'Model', key: 'car_model' },
    { title: 'Yıl', key: 'car_year' },
    { title: 'KM', key: 'ad_km' },
    { title: 'Vites', key: 'code_of_gear' },
    { title: 'Kasa Tipi', key: 'code_of_body' },
    { title: 'Motor', key: 'code_of_engine' },
    { title: 'Çekiş', key: 'code_of_traction' },
    { title: 'Renk', key: 'ad_color' },
    { title: 'Plaka', key: 'plate' },
    { title: 'Motor Gücü', key: 'engine_power' },
    { title: 'Motor Hacmi', detail: 'engine_volume' }, //sor
    { title: 'Yakıt', key: 'code_of_fuel' },
    { title: 'Kapı Sayısı', key: 'car_doors' },
    { title: 'Garanti', key: 'ad_warranty' },
    { title: 'Kimden', key: 'sellerType' },
    { title: 'Takas', key: 'ad_swap' }, //sor
    { title: 'Durumu', key: 'carStatus' },
  ];
  console.log("information", information);
  return (
    <ScrollView>
      <View>
        {information.map((item, index) => {
          return (
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 10,
                borderBottomColor: BaseColor.textSecondaryColor,
                borderBottomWidth: 1,
              }}
              key={'information' + index}>
              <Text body2 grayColor semibold>
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text body2 bold={index === 0} primaryColor={index === 0}>
                  {data[item.key]}
                </Text>
                {item.key == 'ad_code' && (
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => {
                      Clipboard.setString(data[item.key]);
                    }}>
                    <RNEIcon
                      size={20}
                      name="copy"
                      type="font-awesome"
                      color={BaseColor.black}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
        <View
          style={{
            marginTop: 20,
            backgroundColor: '#efefef',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Text headline semibold>
            <Icon name="cogs" size={15} color={BaseColor.primaryColor} /> Teknik
            Özellikler
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text subhead semibold>
            Güvenlik
          </Text>
          <Text>{data?.technical_specs?.guvenlik}</Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text subhead semibold>
            İç Donanım
          </Text>
          <Text>{data?.technical_specs?.icdonanim}</Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text subhead semibold>
            Dış Donanım
          </Text>
          <Text>{data?.technical_specs?.disdonanim}</Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text subhead semibold>
            Multimedya
          </Text>
          <Text>{data?.technical_specs?.multimedya}</Text>
        </View>

        <View
          style={{
            backgroundColor: '#efefef',
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}>
          <Text headline semibold>
            <Icon name="gofore" size={15} color={BaseColor.primaryColor} />{' '}
            Garantili Hizmetler
          </Text>
        </View>
        <View
          style={[
            BaseStyle.bodyPaddingDefault,
            {
              flexDirection: 'row',
              marginTop: 10,
            },
          ]}>
          {data != null && data.iTrustMyCar == 1 && (
            <Button
              primary
              style={{ flex: 1, marginRight: 5 }}
              styleText={{ marginTop: 5 }}
              onPress={() => {
                if (currentUser != null) {
                  if (currentUser.id != data.user_id) {
                    navigation.navigate('EkspertizRandevu', {
                      data: data,
                    });
                  } else {
                    Alert.alert(
                      'Hata',
                      'Kendi ilanınıza ekspertiz talep edemezsiniz',
                      [
                        {
                          text: 'Tamam',
                          style: 'cancel',
                        },
                      ],
                      { cancelable: false },
                    );
                  }
                } else {
                  navigation.navigate('SignIn');
                }
              }}>
              Ekspertiz Talep Et
            </Button>
          )}
          <Button
            style={{ flex: 1 }}
            outline
            styleText={{ marginTop: 5 }}
            onPress={() => (isSelected(data) ? removeCar(data) : addCar(data))}>
            {isSelected(data) ? 'Karşılaştırma' : 'Karşılaştır'}
          </Button>
        </View>
        <View>
          <HelpBlock
            title={HelpBlockData.title}
            description={HelpBlockData.description}
            phone={HelpBlockData.phone}
            email={HelpBlockData.email}
            style={{ margin: 20 }}
            onPress={() => {
              //  navigation.navigate('ContactUs');
              Linking.openURL(`tel:${HelpBlockData.phone}`);
            }}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('IlanSikayetEt', {
                ad_code: data?.ad_code,
              })
            }
            activeOpacity={0.5}
            style={styles.reportBtn}>
            <Text body2 primaryColor semibold>
              İlan ile İlgili Şikayetim Var
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const AciklamaTab = ({ data, navigation }) => {
  console.log("data", data);
  return (
    <ScrollView>
      <WebView
        style={{
          flex: 1,
          minHeight: 200,
          backgroundColor: 'transparent'
        }}
        originWhitelist={['*']}
        source={{
          html: `<html><head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>${data}</body>
          </html>`,
        }}
      />
    </ScrollView>
  );
};

const EkspertizTab = ({
  data,
  tableHead,
  tableData,
  tableHeadWidths,
}) => {
  let eData = data?.meta || {};
  return (
    <ScrollView>
      {/* dinamometre */}
      <View
        style={{
          backgroundColor: BaseColor.grayColor3,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text headline semibold>
          <Icon name="memory" size={15} color={BaseColor.primaryColor} />{' '}
          Dinamometre
        </Text>
      </View>
      <View>
        {eData?.expertiseActiveSections.dinamometre && (
          <View>
            <Image
              source={{ uri: eData?.ekspertiz?.dinamometre?.image }}
              style={{
                width: '100%',
                height: Dimensions.get('window').width / 2.1,
              }}
              resizeMode="contain"
            />
            {tableData != null &&
              tableData.length > 0 &&
              tableHeadWidths.length > 0 && (
                <ScrollView horizontal={true}>
                  <View>
                    <Table
                      borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                      <Row
                        data={tableHead}
                        style={styles.head}
                        widthArr={[50, 50, 50, 80, 80, 80, 80, 90]}
                        textStyle={styles.text}
                      />
                    </Table>
                    <ScrollView style={{ marginTop: -1 }}>
                      <Table
                        borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        {tableData.map((data, index) => (
                          <Row
                            key={index}
                            data={data}
                            widthArr={[50, 50, 50, 80, 80, 80, 80, 90]}
                            textStyle={styles.text}
                            style={styles.row}
                          />
                        ))}
                      </Table>
                    </ScrollView>
                  </View>
                </ScrollView>
              )}
          </View>
        )}
        {!eData?.expertiseActiveSections.dinamometre && (
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text black>Aracın Dyno Testi Yapılmadı</Text>
          </View>
        )}
      </View>
      {/* suspansiyon */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#efefef',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text headline semibold>
          <Icon name="cog" size={15} color={BaseColor.primaryColor} />{' '}
          Süspansiyon
        </Text>
      </View>
      {eData?.expertiseActiveSections.suspansiyon && (
        <View
          style={{
            padding: 5,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={Images.suspansiyon2}
            style={{ width: '90%', height: 100, justifyContent: 'center' }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.suspencionBackground}>
                <Text title2 semiBold>
                  %{eData?.ekspertiz?.suspansiyon?.onfark}
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ marginTop: 10 }}>Ön Süspansion Farkı</Text>
            </View>
          </View>
          <Image
            source={Images.suspansiyon2}
            style={{ width: '90%', height: 100, justifyContent: 'center' }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.suspencionBackground}>
                <Text title2 semiBold>
                  %{eData?.ekspertiz?.suspansiyon?.arkarafark}
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ marginTop: 10 }}>Arka Süspansion Farkı</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.ekspertiz?.suspansiyon?.onsoltutulma}
                  </Text>
                </View>
                <Text>Ön Sol Minimum Tutulma</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.ekspertiz?.suspansiyon?.arkasagtutulma}
                  </Text>
                </View>
                <Text>Ön Sağ Minimum Tutulma</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.ekspertiz?.suspansiyon?.onsoltutulma}
                  </Text>
                </View>
                <Text>Ön Sol Minimum Tutulma</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.ekspertiz?.suspansiyon?.onsagtutulma}
                  </Text>
                </View>
                <Text>Ön Sag Minimum Tutulma</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {!eData?.expertiseActiveSections.suspansiyon && (
        <View center style={styles.noExpertiseDataWrapper}>
          <Text center>Aracın Süspansiyon Testi Yapılmadı</Text>
        </View>
      )}
      {/* yanal kayma */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#efefef',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text headline semibold>
          <Icon
            name="drafting-compass"
            size={15}
            color={BaseColor.primaryColor}
          />{' '}
          Yanal Kayma
        </Text>
      </View>
      {eData?.expertiseActiveSections.yanalKayma && (
        <View
          style={{
            padding: 5,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={Images.suspansiyon2}
            style={{ width: '90%', height: 100, justifyContent: 'center' }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.suspencionBackground}>
                <Text title2 semiBold>
                  %{eData?.ekspertiz?.suspansiyon?.onfark}
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ marginTop: 10 }}>Ön Süspansion Farkı</Text>
            </View>
          </View>
          <Image
            source={Images.suspansiyon2}
            style={{ width: '90%', height: 100, justifyContent: 'center' }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.suspencionBackground}>
                <Text title2 semiBold>
                  %{eData?.ekspertiz?.suspansiyon?.arkarafark}
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ marginTop: 10 }}>Arka Süspansion Farkı</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.ekspertiz?.suspansiyon?.onsoltutulma}
                  </Text>
                </View>
                <Text>Ön Sol Minimum Tutulma</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.ekspertiz?.suspansiyon?.arkasagtutulma}
                  </Text>
                </View>
                <Text>Ön Sag Minimum Tutulma</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.ekspertiz?.suspansiyon?.onsoltutulma}
                  </Text>
                </View>
                <Text>Ön Sol Minimum Tutulma</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.ekspertiz?.suspansiyon?.onsagtutulma}
                  </Text>
                </View>
                <Text>Ön Sag Minimum Tutulma</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {!eData?.expertiseActiveSections.yanalKayma && (
        <View center style={styles.noExpertiseDataWrapper}>
          <Text center>Aracın Yanal Kayma Testi Yapılmadı</Text>
        </View>
      )}
      {/* Detayli Ekspertiz */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#efefef',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text headline semibold>
          <Icon name="searchengin" size={15} color={BaseColor.primaryColor} />{' '}
          Detaylı Ekspertiz
        </Text>
      </View>
      {eData?.expertiseActiveSections.detayliEkspertiz && (
        <View
          style={{
            padding: 5,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={Images.suspansiyon2}
            style={{ width: '90%', height: 100, justifyContent: 'center' }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.suspencionBackground}>
                <Text title2 semiBold>
                  %{eData?.suspansiyon?.onfark}
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ marginTop: 10 }}>Ön Süspansion Farkı</Text>
            </View>
          </View>
          <Image
            source={Images.suspansiyon2}
            style={{ width: '90%', height: 100, justifyContent: 'center' }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.suspencionBackground}>
                <Text title2 semiBold>
                  %{eData?.suspansiyon?.arkarafark}
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ marginTop: 10 }}>Arka Süspansion Farkı</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.suspansiyon?.onsoltutulma}
                  </Text>
                </View>
                <Text>Ön Sol Minimum Tutulma</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.suspansiyon?.arkasagtutulma}
                  </Text>
                </View>
                <Text>Ön Sag Minimum Tutulma</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.suspansiyon?.onsoltutulma}
                  </Text>
                </View>
                <Text>Ön Sol Minimum Tutulma</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.suspansiyon?.onsagtutulma}
                  </Text>
                </View>
                <Text>Ön Sag Minimum Tutulma</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {!eData?.expertiseActiveSections.detayliEkspertiz && (
        <View center style={styles.noExpertiseDataWrapper}>
          <Text center>Aracın Detaylı Ekseprtiz Testi Yapılmadı</Text>
        </View>
      )}
      {/* KM Basian Yakit */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#efefef',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text headline semibold>
          <Icon name="gas-pump" size={15} color={BaseColor.primaryColor} /> KM
          Başına Yakıt
        </Text>
      </View>
      {eData?.expertiseActiveSections.fuelInformations && (
        <View
          style={{
            padding: 5,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={Images.suspansiyon2}
            style={{ width: '90%', height: 100, justifyContent: 'center' }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.suspencionBackground}>
                <Text title2 semiBold>
                  %3{eData?.ekspertiz?.suspansiyon?.onfark}
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ marginTop: 10 }}>Ön Süspansiyon Farkı</Text>
            </View>
          </View>
          <Image
            source={Images.suspansiyon2}
            style={{ width: '90%', height: 100, justifyContent: 'center' }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.suspencionBackground}>
                <Text title2 semiBold>
                  %{eData?.suspansiyon?.arkarafark}
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ marginTop: 10 }}>Arka Süspansion Farkı</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.suspansiyon?.onsoltutulma}
                  </Text>
                </View>
                <Text>Ön Sol Minimum Tutulma</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.suspansiyon?.arkasagtutulma}
                  </Text>
                </View>
                <Text>Ön Sag Minimum Tutulma</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.suspansiyon?.onsoltutulma}
                  </Text>
                </View>
                <Text>Ön Sol Minimum Tutulma</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <Image
                  source={Images.suspansiyon}
                  style={{ width: '90%', height: 100, justifyContent: 'center' }}
                  resizeMode="contain"
                />
                <View style={[styles.suspencionBackground, { width: '50%' }]}>
                  <Text title2 semiBold>
                    %{eData?.suspansiyon?.onsagtutulma}
                  </Text>
                </View>
                <Text>Ön Sag Minimum Tutulma</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {!eData?.expertiseActiveSections.fuelInformations && (
        <View center style={styles.noExpertiseDataWrapper}>
          <Text center>
            Aracın Kilometre Başına Harcadığı Yakıt Testi Yapılmadı
          </Text>
        </View>
      )}
      {/* Fren */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#efefef',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text headline semibold>
          <Icon name="stop" size={15} color={BaseColor.primaryColor} /> Fren
        </Text>
      </View>
      {eData?.expertiseActiveSections.fren && (
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  borderColor: '#cecece',
                  borderWidth: 1,
                  margin: 5,
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text semiBold subhead>
                  Sol Ön
                </Text>
                <Image
                  source={Images.solFren}
                  style={{ width: 70, height: 70, resizeMode: 'contain' }}
                />
                <Text bold subhead>
                  Kgf: {eData?.ekspertiz?.fren?.sol_on?.kgf}
                </Text>
                <Text subtitle>
                  Fren verimliligi: {eData?.ekspertiz?.fren?.sol_on?.verimlilik}
                </Text>
              </View>
            </View>
            <View style={{ flex: 0.3 }}>
              <View style={{ marginTop: 55, alignItems: 'center' }}>
                <Text subtitle>%{eData?.ekspertiz?.fren?.on_yuzde}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  borderColor: '#cecece',
                  borderWidth: 1,
                  margin: 5,
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text semiBold subhead>
                  Sağ Ön
                </Text>
                <Image
                  source={Images.sagFren}
                  style={{ width: 70, height: 70, resizeMode: 'contain' }}
                />
                <Text semiBold subhead>
                  Kgf: {eData?.ekspertiz?.fren?.sag_on?.kgf}
                </Text>
                <Text subtitle>
                  Fren verimliligi: {eData?.ekspertiz?.fren?.sag_on?.verimlilik}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  borderColor: '#cecece',
                  borderWidth: 1,
                  margin: 5,
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text semiBold subhead>
                  Sol Arka
                </Text>
                <Image
                  source={Images.solFren}
                  style={{ width: 70, height: 70, resizeMode: 'contain' }}
                />
                <Text semiBold subhead>
                  Kgf: {eData?.ekspertiz?.fren?.sol_arka?.kgf}
                </Text>
                <Text subtitle>
                  Fren verimliligi:{' '}
                  {eData?.ekspertiz?.fren?.sol_arka?.verimlilik}
                </Text>
              </View>
            </View>
            <View style={{ flex: 0.3 }}>
              <View style={{ marginTop: 55, alignItems: 'center' }}>
                <Text subtitle>%{eData?.ekspertiz?.fren?.arka_yuzde}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  borderColor: '#cecece',
                  borderWidth: 1,
                  margin: 5,
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text semiBold subhead>
                  Sağ Arka
                </Text>
                <Image
                  source={Images.sagFren}
                  style={{ width: 70, height: 70, resizeMode: 'contain' }}
                />
                <Text semiBold subhead>
                  Kgf: {eData?.ekspertiz?.fren?.sag_arka?.kgf}
                </Text>
                <Text subtitle>
                  Fren verimliligi:{' '}
                  {eData?.ekspertiz?.fren?.sag_arka?.verimlilik}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {!eData?.expertiseActiveSections.fren && (
        <View center style={styles.noExpertiseDataWrapper}>
          <Text center>Aracın Fren Testleri Yapılmadı</Text>
        </View>
      )}
      {/* Kaporta Boya */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#efefef',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text headline semibold>
          <Icon name="car-side" size={15} color={BaseColor.primaryColor} />{' '}
          Kaporta Boya
        </Text>
      </View>
      {eData?.expertiseActiveSections.kaportaBoya && (
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text>
              <Text bold>Bagaj:</Text> {eData?.ekspertiz?.kaporta_boya?.bagaj}
            </Text>
            <Text>
              <Text bold>Tavan:</Text> {eData?.ekspertiz?.kaporta_boya?.tavan}
            </Text>
            <Text>
              <Text bold>Kaput:</Text> {eData?.ekspertiz?.kaporta_boya?.kaput}
            </Text>
            <Text>
              <Text bold>Ön Panel:</Text>{' '}
              {eData?.ekspertiz?.kaporta_boya?.onpanel}
            </Text>
            <Text>
              <Text bold>Ön Tampon:</Text>{' '}
              {eData?.ekspertiz?.kaporta_boya?.ontampon}
            </Text>
            <Text>
              <Text bold>Arka Panel:</Text>{' '}
              {eData?.ekspertiz?.kaporta_boya?.arkapanel}
            </Text>
            <Text>
              <Text bold>Arka Tampon:</Text>{' '}
              {eData?.ekspertiz?.kaporta_boya?.arkatampon}
            </Text>
            <Text>
              <Text bold>Sağ Arka Direkt:</Text>
              {eData?.ekspertiz?.kaporta_boya?.sagarkadirek}
            </Text>
            <Text>
              <Text bold>Sağ Orta Direkt:</Text>
              {eData?.ekspertiz?.kaporta_boya?.sagortadirek}
            </Text>
            <Text>
              <Text bold>Sağ Ön Direkt:</Text>{' '}
              {eData?.ekspertiz?.kaporta_boya?.sagondirek}
            </Text>
            <Text>
              <Text bold>Sağ Arka Çamurluk:</Text>
              {eData?.ekspertiz?.kaporta_boya?.sagarkacamurluk}
            </Text>
            <Text>
              <Text bold>Sağ Arka Kapı :</Text>{' '}
              {eData?.ekspertiz?.kaporta_boya?.sagarkakapi}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              <Text bold>Sağ Ön Kapı:</Text>{' '}
              {eData?.ekspertiz?.kaporta_boya?.sagonkapi}
            </Text>
            <Text>
              <Text bold>Sağ Ön Çamurluk:</Text>
              {eData?.ekspertiz?.kaporta_boya?.sagoncamurluk}
            </Text>
            <Text>
              <Text bold>Sağ Marşpiyel:</Text>{' '}
              {eData?.ekspertiz?.kaporta_boya?.sagmarspiyel}
            </Text>
            <Text>
              <Text bold>Sağ Şase Ucu:</Text>{' '}
              {eData?.ekspertiz?.kaporta_boya?.sagsaseucu}
            </Text>
            <Text>
              <Text bold>Sol Ön Direk:</Text>{' '}
              {eData?.ekspertiz?.kaporta_boya?.solondirek}
            </Text>
            <Text>
              <Text bold>Sol Orta Direk:</Text>
              {eData?.ekspertiz?.kaporta_boya?.solortadirek}
            </Text>
          </View>
        </View>
      )}
      {/* bayibilgisi */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#efefef',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text headline semibold>
          <Icon name="user" size={15} color={BaseColor.primaryColor} /> Bayi
          Bilgisi
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <Text>
          Bu aracın ekspertiz testi{' '}
          <Text bold>{eData?.ekspertiz?.bayibilgisi?.BAYII_ADI}</Text> bayisinde{' '}
          <Text bold>{eData?.ekspertiz?.testdate}</Text> tarihinde yapılmıştır.
        </Text>
        <View
          style={{
            marginTop: 10,
            borderRadius: 8,
            padding: 5,
            marginBottom: 10,
            backgroundColor: '#edf2f9',
          }}>
          <Text footnote>
            Test ile alakalı ilgili bayimizden bilgi alabilir, eposta/telefon
            üzerinden iletişim sağlayabilir, dilerseniz harita üzerinden yol
            tarifi alabilirsiniz.
          </Text>
        </View>
        <Text>
          <Text bold>Bayi Adı: </Text>{' '}
          {eData?.ekspertiz?.bayibilgisi?.BAYII_ADI}
        </Text>
        <View style={styles.line} />
        <Text>
          <Text bold>Bayi Yer: </Text> {eData?.ekspertiz?.bayibilgisi?.BAYII_IL}
        </Text>
        <View style={styles.line} />
        <Text>
          <Text bold>Test Tarihi: </Text> {eData?.ekspertiz?.testdate}
        </Text>
        <View style={styles.line} />
        <Text>
          <Text bold>Bayi Telefon Numarası: </Text>
          {eData?.ekspertiz?.bayibilgisi?.BAYII_SORUMLU_TELEFON}
        </Text>
        <View style={styles.line} />
        <Text>
          <Text bold>Bayi Eposta Adresi: </Text>
          {eData?.ekspertiz?.bayibilgisi?.BAYII_MAIL}
        </Text>
        <View style={styles.line} />
        <Text>
          <Text bold>Bayi Adres: </Text>{' '}
          {eData?.ekspertiz?.bayibilgisi?.BAYII_ADRES}
        </Text>
        <View style={styles.line} />
      </View>
    </ScrollView>
  );
};
