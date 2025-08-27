import React, { useEffect, useCallback, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
  ProfilePerformance,
  Container,
} from '@components';
import styles from './styles';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { checkToken_action } from '@state/ducks/checkToken';
import { useSelector, useDispatch } from 'react-redux';
import { Block } from '../../commonComponents';
import { compose, withLoadingScreen } from '@hocs';
import { withProps } from '../../hocs';
import { CommonActions } from '@react-navigation/native';

const list = [
  {
    title: 'Bana Özel',
    screen: 'SpecialToMe',
    length: '',
  },
  {
    title: 'İlan Yönetimi',
    screen: 'AdsManagement',
    length: '0',
  },
  {
    title: 'Yapay Zeka Ekspertiz',
    screen: 'GarantiAIMyExpertises',
    length: '',
  },
  {
    title: 'Mesajlar ve Bilgilendirme',
    screen: 'Messenger',
    length: '',
  },
  {
    title: 'Favorilerim',
    screen: 'Favorilerim',
    length: '',
  },
];

const Profile = ({ navigation, screenProps }, _) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const onLogOut = async () => {
    setLoading(true);
    await AsyncStorage.removeItem('@token');
    await AsyncStorage.removeItem('@user');
    setLoading(false);
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: 'Loading' }],
    });

    navigation.dispatch(resetAction);
  };

  const { data } = useSelector(state => state.checkToken);

  const dispatch = useDispatch();

  const getProfileData = useCallback(
    () =>
      dispatch(
        checkToken_action({
          resolve: data => {
          },
          reject: err => {
            screenProps.openModalError({
              body: () => (
                <Block p4 m4>
                  <Text center middle>
                    {err?.message || 'Beklenmedik Hata Oluştu'}
                  </Text>
                </Block>
              ),
              onClose: onLogOut,
            });
          },
        }),
      ),
    [dispatch, navigation, screenProps],
  );

  useEffect(() => {
    AsyncStorage.getItem('@token').then(_token => {
      if (_token) {
        setToken(_token);
        getProfileData();
      }
    });
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="Profilim"
        renderRight={() => {
          return <Icon name="bell" size={24} color={BaseColor.primaryColor} />;
        }}
        renderRightSecond={() => {
          return (
            <Icon name="envelope" size={24} color={BaseColor.primaryColor} />
          );
        }}
        onPressRight={() => {
          if (token != null) {
            navigation.navigate('Notification');
          } else {
            navigation.navigate('ChooseLoginType');
          }
        }}
        onPressRightSecond={() => {
          AsyncStorage.getItem('@token').then(_token => {
            if (_token) {
              navigation.navigate('Messenger');
            } else {
              navigation.navigate('ChooseLoginType');
            }
          });
        }}
      />
      {token != null && (
        <View>
          <ScrollView>
            <View style={styles.contain}>
              <ProfileDetail
                onPress={() => {
                  navigation.navigate('SpecialToMe');
                }}
                image={
                  data?.user?.image
                    ? { uri: data?.user?.image }
                    : Images.profile_nophoto
                }
                textFirst={data?.user?.name + ' ' + data?.user?.surname}
                textSecond={
                  data?.user?.cellphoneNumberINT
                    ? data?.user?.cellphoneCountryCode +
                    ' ' +
                    data?.user?.cellphoneNumberINT
                    : 'Telefon numaranızı kaydetmediniz'
                }
              />
              <ProfilePerformance
                data={[
                  { value: '0', title: 'Yayınlanan İlan' },
                  { value: '0', title: 'Bildirim' },
                  { value: '0', title: 'Favori İlan' },
                ]}
                style={styles.profilePerformance}
              />
            </View>

            <View style={styles.container}>
              {list.map((item, i) => (
                <ListItem
                  key={i}
                  title={<Text body1>{item.title}</Text>}
                  bottomDivider
                  onPress={() => {
                    navigation.navigate(item.screen, { data: item.subData })
                  }}
                  chevron={
                    <Icon
                      name="angle-right"
                      size={18}
                      color={BaseColor.primaryColor}
                    />
                  }
                  rightTitle={item.length}
                />
              ))}
            </View>
          </ScrollView>
          <Container>
            <Button full loading={loading} onPress={() => onLogOut()}>
              Çıkış Yap
            </Button>
          </Container>
        </View>
      )}
      {token == null && !loading && (
        <Block padding={20} flex={1} style={{ justifyContent: 'center' }}>
          <Block style={{ marginBottom: 50 }} flex={false}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
              Sadece 7 saniyede başlayabilirsiniz.
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: BaseColor.primaryColor }}>
              Buradan kaydolun
            </Text>
          </Block>
          <Text style={{ textAlign: 'center' }}>
            Kendi ilanlarınızı yayınlamak, mesaj alabilmek ve ekspertiz
            talebinde bulunmak için giriş yapmanız gerekmektedir.
          </Text>
          <Button
            style={{ marginTop: 20 }}
            onPress={() => {
              navigation.navigate('ChooseLoginType');
            }}>
            Giriş Yap
          </Button>
        </Block>
      )}
    </SafeAreaView>
  );
};

export default compose(
  withProps(() => {
    const { loader } = useSelector(state => state.checkToken);
    return {
      loading: loader,
    };
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(Profile);
