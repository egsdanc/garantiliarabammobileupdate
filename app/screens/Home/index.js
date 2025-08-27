import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Text, Icon, VitrinItem, Header, SafeAreaView, Image } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {
  getHomeData_action,
  dismissGetHomeDataError_action,
} from '@state/ducks/home';
import { setFirebaseToken_action } from '@state/ducks/setFirebaseToken';
import messaging from '@react-native-firebase/messaging';
import { withLoadingScreen, withProps } from '../../hocs';
import { compose } from 'redux';
import {
  Block,
  MainPageSliderItem,
  MainSliderItem,
} from '../../commonComponents';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import { DrawerActions } from '@react-navigation/native';
import { backgroundColor } from "react-native-calendars/src/style";
import MainVideoItem from "../../commonComponents/MainVideoItem";
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const windowWidth = Dimensions.get('window').width;

const Home = ({ navigation }, _) => {
  const {
    showcase,
    correct,
    expertise,
    trusted,
    sold,
    slider,
    error,
    loader,
  } = useSelector(state => state.home);

  const [mainSliderIndex, setMainSliderIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  /** action */
  const getHomeData = useCallback(() => dispatch(getHomeData_action()), [
    dispatch,
  ]);

  /** action */
  const dismissError = useCallback(
    () => dispatch(dismissGetHomeDataError_action()),
    [dispatch],
  );

  /**helper function */
  const getImage = image => {
    /*
    let uri =
      image && image.split('---').length > 1
        ? 'https://image.garantiliarabam.com/upload/$number/thumb/$name'
            .replace('$number', image.split('---')[0])
            .replace('$name', image)
        : 'https://test.garantiliarabam.com/assets/img/foto-yok-thumb.png';
    */
    return image;
  };

  /**helper function */
  const getSliderImage = image => {
    /*
    let uri =
      image && image.split('---').length > 1
        ? 'https://image.garantiliarabam.com/upload/$number/standart/$name'
            .replace('$number', image.split('---')[0])
            .replace('$name', image)
        : 'https://test.garantiliarabam.com/assets/img/foto-yok-thumb.png';
     */
    return image;
  };

  // /** firebase instance*/
  // const requestUserPermission = () => {
  //   messaging()
  //     .hasPermission()
  //     .then(enabled => {
  //       if (!enabled) {
  //         messaging()
  //           .requestPermission()
  //           .then(authStatus => {
  //             const enabled =
  //               authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //               authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //             if (enabled) {
  //               getFirebaseToken();
  //             }
  //           });
  //       } else {
  //         getFirebaseToken();
  //       }
  //     });
  // };
  // const getFirebaseToken = () => {
  //   messaging()
  //     .getToken()
  //     .then(token => {
  //       setFirebaseToken({
  //         token,
  //         platform: Platform.OS === 'android' ? 'a' : 'i',
  //       });
  //     })
  //     .catch(error => {
  //       'error: ', error;
  //     });
  // };
  // const setFirebaseToken = useCallback(
  //   token => dispatch(setFirebaseToken_action(token)),
  //   [dispatch],
  // );

  // //register notifiaction
  // const setBackgroundMessageHandler = () => {
  //   messaging().setBackgroundMessageHandler(async remoteMessage => { });
  // };

  // const openDrawer = () => {
  //   navigation.dispatch(DrawerActions.openDrawer());
  // };

  // /** didmount */
  useEffect(() => {
    getHomeData();
    // requestUserPermission();
    // setBackgroundMessageHandler();
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('Mesaj geldi!', JSON.stringify(remoteMessage));
    // });
    // return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
        <Header
          style={{ backgroundColor: '#000', paddingVertical: 10 }}
          title="Vitrin"
          titleStyle={{ color: '#fff' }}
          renderRight={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.getItem('@token').then(_token => {
                    if (_token) {
                      navigation.navigate('Favorilerim');
                    } else {
                      navigation.navigate('ChooseLoginType');
                    }
                  });
                }}>
                <Icon name="star" outline size={20} style={{ color: '#fff' }} />
              </TouchableOpacity>
            );
          }}
          renderLeft={() => {
            return (
              <Image
                style={{
                  width: 80,
                  height: 60,
                }}
                source={{
                  uri:
                    'https://www.garantiliarabam.com.tr/storage/2021/03/garantili-arabam-site-logo-300x138.png',
                }}
                resizeMode="contain"
              />
            );
          }}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getHomeData} />
          }>
          {
            /* Garantili Arabam AI */
          }
          <View style={{ marginHorizontal: 10, marginBottom: 15 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('GarantiAIIntro');
              }}
              style={{
                borderRadius: 15,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}>
              <LinearGradient
                style={{
                  borderRadius: 15,
                  justifyContent: 'center',
                }}
                colors={['#2196F3', '#1976D2']}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: 15,
                    }}
                    source={require('../../assets/images/aicar.png')}
                    resizeMode="contain"
                  />
                  <View style={{ justifyContent: 'center' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        marginBottom: 4,
                      }}>
                      Yapay Zeka Ekspertiz
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#ffffff',
                        lineHeight: 16,
                        width: "80%",
                        paddingBottom: 3,
                        opacity: 0.9,
                      }}>
                      Beğendiğin aracın fotoğrafını çek, saniyeler içinde raporla.
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* 4 Kart Tasarımı - Modern Layout */}
          <View style={{ paddingHorizontal: 15, marginBottom: 25 }}>
            {/* İlk Satır - 2 Kart */}
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              {/* Satılan Araçlar */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SearchResults', {
                    sorting: 'newDatesFirst',
                    filtering: {
                      ekspertizli: null,
                      hatasiz: null,
                      guveniyorum: null,
                      satilanAraclar: true,
                    },
                    modelIds: '1-2',
                  });
                }}
                style={{
                  flex: 1,
                  marginRight: 6,
                  borderRadius: 16,
                  backgroundColor: '#FF9800',
                  padding: 16,
                  elevation: 4,
                  height: 80,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Image
                      style={{
                        width: 32,
                        height: 32,
                        marginRight: 4,
                      }}
                      source={require('../../assets/images/satildi.png')}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#ffffff',
                        flex: 1,
                      }}>
                      Satıldı
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#ffffff',
                      opacity: 0.95,
                      textAlign: 'right',
                      lineHeight: 16,
                    }}>
                    Satılan Tüm Araçlar
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Arabama Güveniyorum */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SearchResults', {
                    sorting: 'newDatesFirst',
                    filtering: {
                      ekspertizli: null,
                      hatasiz: null,
                      guveniyorum: true,
                      satilanAraclar: null,
                    },
                    modelIds: '1-2',
                  });
                }}
                style={{
                  flex: 1,
                  marginLeft: 6,
                  borderRadius: 16,
                  backgroundColor: '#4CAF50',
                  padding: 16,
                  height: 80,
                  elevation: 4,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Image
                      style={{
                        width: 32,
                        height: 32,
                        marginRight: 4,
                      }}
                      source={require('../../assets/images/arabamaguveniyorum.png')}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#ffffff',
                        flex: 1,
                      }}>
                      Arabama Güveniyorum
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#ffffff',
                      opacity: 0.95,
                      textAlign: 'right',
                      lineHeight: 16,
                    }}>
                    Ekspertize Hazır
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* İkinci Satır - 2 Kart */}
            <View style={{ flexDirection: 'row' }}>
              {/* Ekspertizli İlanlar */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SearchResults', {
                    sorting: 'newDatesFirst',
                    filtering: {
                      ekspertizli: true,
                      hatasiz: null,
                      guveniyorum: null,
                      satilanAraclar: null,
                    },
                    modelIds: '1-2',
                  });
                }}
                style={{
                  flex: 1,
                  marginRight: 6,
                  borderRadius: 16,
                  backgroundColor: '#F44336',
                  padding: 16,
                  height: 80,
                  elevation: 4,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Image
                      style={{
                        width: 32,
                        height: 32,
                        marginRight: 4,
                      }}
                      source={require('../../assets/images/ekspertizli.png')}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#ffffff',
                        flex: 1,
                      }}>
                      Ekspertizli
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#ffffff',
                      opacity: 0.95,
                      textAlign: 'right',
                      lineHeight: 16,
                    }}>
                    Ekspertizli İlanlar
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Hatasız İlanlar */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SearchResults', {
                    sorting: 'newDatesFirst',
                    filtering: {
                      ekspertizli: null,
                      hatasiz: true,
                      guveniyorum: null,
                      satilanAraclar: null,
                    },
                    modelIds: '1-2',
                  });
                }}
                style={{
                  flex: 1,
                  marginLeft: 6,
                  borderRadius: 16,
                  backgroundColor: '#3F51B5',
                  padding: 16,
                  height: 80,
                  elevation: 4,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Image
                      style={{
                        width: 32,
                        height: 32,
                        marginRight: 4,
                      }}
                      source={require('../../assets/images/hatasiz.png')}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#ffffff',
                        flex: 1,
                      }}>
                      Hatasız
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#ffffff',
                      opacity: 0.95,
                      textAlign: 'right',
                      lineHeight: 16,
                    }}>
                    Hatasız İlanlar
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/*main carousel slider*/}
          {/* <Carousel
            layout={'default'}
            data={slider}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
            onSnapToItem={index => setMainSliderIndex(index)}
            renderItem={({ item }) => (
              <MainVideoItem
                videoId={item.link}
              />
            )}
          />
          <Pagination
            dotsLength={slider.length}
            activeDotIndex={mainSliderIndex}
            dotStyle={styles.indicator}
            dotContainerStyle={styles.indicatorInactive}
            inactiveDotOpacity={0.0}
            inactiveDotScale={1}
            containerStyle={styles.paginationContainer}
          /> */}

          {/* vitrin ilanları */}
          <View style={styles.line} />
          <View style={{ padding: 10 }}>
            <View style={{ marginBottom: 10 }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text title3 semibold>
                  Anasayfa Vitrini
                </Text>
              </View>
            </View>
            <FlatList
              columnWrapperStyle={{ marginBottom: 20 }}
              numColumns={3}
              data={showcase}
              keyExtractor={(item, index) => item.ad_code}
              renderItem={({ item, index }) => (
                <VitrinItem
                  grid
                  specialCase={
                    item.isSold === '1' ||
                    item.isExpertise === '1' ||
                    item.isCorrect === '1'
                  }
                  specialCaseText={
                    item.isSold === '1'
                      ? 's'
                      : item.isCorrect === '1'
                        ? 'e'
                        : item.iTrustMyCar === '1'
                          ? 'g'
                          : item.isExpertise === '1'
                            ? 'h'
                            : ''
                  }
                  image={item.thumb}
                  name={item.ad_title.split('|')[0] || ''}
                  location={item.ad_title.split('|')[1] || ''}
                  numReviews={index}
                  services={[]}
                  style={index % 3 ? { marginLeft: 15 } : {}}
                  onPress={() => {
                    navigation.navigate('CarDetail', { ad_code: item?.ad_code });
                  }}
                />
              )}
            />
          </View>
          {/* Hatasız İlanlar */}
          <View style={styles.line} />
          <View
            style={{
              padding: 10,
            }}>
            <View style={{ marginBottom: 20 }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text title3 semibold>
                  Hatasız Ilanlar
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SearchResults', {
                      sorting: 'newDatesFirst',
                      filtering: {
                        ekspertizli: null,
                        hatasiz: true,
                        guveniyorum: null,
                        satilanAraclar: null,
                      },
                      modelIds: '1-2',
                    });
                  }}>
                  <Text title4 semibold style={{ color: BaseColor.grayColor }}>
                    Tümünü Gör
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              columnWrapperStyle={{ marginBottom: 20 }}
              numColumns={3}
              data={correct}
              keyExtractor={(item, index) => item.ad_code}
              renderItem={({ item, index }) => (
                <VitrinItem
                  grid
                  specialCase={true}
                  specialCaseText="h"
                  image={getImage(item.thumb)}
                  name={item.ad_title.split('|')[0] || ''}
                  location={item.ad_title.split('|')[1] || ''}
                  numReviews={index}
                  style={index % 3 ? { marginLeft: 15 } : {}}
                  onPress={() => {
                    navigation.navigate('CarDetail', { ad_code: item?.ad_code });
                  }}
                />
              )}
            />
          </View>

          {/* Ekspertizli İlanlar */}
          <View style={styles.line} />
          <View
            style={{
              padding: 10,
            }}>
            <View style={{ marginBottom: 20 }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text title3 semibold>
                  Ekspertizli İlanlar
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SearchResults', {
                      sorting: 'newDatesFirst',
                      filtering: {
                        ekspertizli: true,
                        hatasiz: null,
                        guveniyorum: null,
                        satilanAraclar: null,
                      },
                      modelIds: '1-2',
                    });
                  }}>
                  <Text title4 semibold style={{ color: BaseColor.grayColor }}>
                    Tümünü Gör
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              columnWrapperStyle={{ marginBottom: 20 }}
              numColumns={3}
              data={expertise}
              keyExtractor={(item, index) => item.ad_code}
              renderItem={({ item, index }) => (
                <VitrinItem
                  grid
                  specialCase={true}
                  specialCaseText="e"
                  image={getImage(item.thumb)}
                  name={item.ad_title.split('|')[0] || ''}
                  location={item.ad_title.split('|')[1] || ''}
                  numReviews={index}
                  style={index % 3 ? { marginLeft: 15 } : {}}
                  onPress={() => {
                    navigation.navigate('CarDetail', { ad_code: item?.ad_code });
                  }}
                />
              )}
            />
          </View>
          {/* Arabama Güveniyorum İlanları */}
          <View style={styles.line} />
          <View
            style={{
              padding: 10,
            }}>
            <View style={{ marginBottom: 20 }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text title3 semibold>
                  Arabama Güveniyorum İlanları
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SearchResults', {
                      sorting: 'newDatesFirst',
                      filtering: {
                        ekspertizli: null,
                        hatasiz: null,
                        guveniyorum: true,
                        satilanAraclar: null,
                      },
                      modelIds: '1-2',
                    });
                  }}>
                  <Text title4 semibold style={{ color: BaseColor.gray }}>
                    Tümünü Gör
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              columnWrapperStyle={{ marginBottom: 20 }}
              numColumns={3}
              data={trusted}
              keyExtractor={(item, index) => item.ad_code}
              renderItem={({ item, index }) => (
                <VitrinItem
                  grid
                  specialCase={true}
                  specialCaseText="g"
                  image={getImage(item.thumb)}
                  name={item.ad_title.split('|')[0] || ''}
                  location={item.ad_title.split('|')[1] || ''}
                  numReviews={index}
                  style={index % 3 ? { marginLeft: 15 } : {}}
                  onPress={() => {
                    navigation.navigate('CarDetail', { ad_code: item?.ad_code });
                  }}
                />
              )}
            />
          </View>
          {/* Garantili Arabam Güvencesiyle Satılmış Araçlar */}
          <View style={styles.line} />
          <View
            style={{
              padding: 10,
            }}>
            <View style={{ marginBottom: 20 }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text title3 semibold>
                  Satılmış Araçlar
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SearchResults', {
                      sorting: 'newDatesFirst',
                      filtering: {
                        ekspertizli: null,
                        hatasiz: null,
                        guveniyorum: null,
                        satilanAraclar: true,
                      },
                      modelIds: '1-2',
                    });
                  }}>
                  <Text title4 semibold style={{ color: BaseColor.grayColor }}>
                    Tüm İlanlar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              columnWrapperStyle={{ marginBottom: 20 }}
              numColumns={3}
              data={sold}
              keyExtractor={(item, index) => item.ad_code}
              renderItem={({ item, index }) => (
                <VitrinItem
                  grid
                  specialCase={true}
                  specialCaseText="s"
                  image={getImage(item.thumb)}
                  name={item.ad_title.split('|')[0] || ''}
                  location={item.ad_title.split('|')[1] || ''}
                  numReviews={index}
                  style={index % 3 ? { marginLeft: 15 } : {}}
                  onPress={() => {
                    navigation.navigate('CarDetail', { ad_code: item?.ad_code });
                  }}
                />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default compose(
  withProps(() => {
    const { loader } = useSelector(state => state.home);
    return {
      loading: loader,
    };
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(Home);
