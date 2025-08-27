import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Text} from '@components';
import styles from './style';
import {compose, withProps, withLoadingScreen} from '@hocs';
// Load sample language data list
import {Icon, Text as Txt, Block, TouchableOpacity} from '@common';
import {Button} from '@components';
import {slice} from 'ramda';
import {useSelector, useDispatch} from 'react-redux';
import {kategori_action} from '@state/ducks/kategori';
import {setCategory_action} from '@state/ducks/IlanVer';
import {ListItem} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
const FlatListL = withLoadingScreen({})(FlatList);

function IlanEkle({navigation, loading, screenProps}, _) {
  const scrollRef = useRef(null);
  const [activeKey, setactiveKey] = useState(0);
  const [cars, setCars] = useState([]);
  const [current, setCurrent] = useState([]);
  const [token, setToken] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    selectCategory({id: 1, title: 'Tüm Vasıta Türleri '});
    AsyncStorage.getItem('@token').then(_token => {
      if (_token) {
        setToken(_token);
      }
    });
  }, [selectCategory]);

  const selectCategory = useCallback(item => {
    const payload = {
      id: item.id,
      resolve: data => {
        scrollRef.current?.scrollToEnd({
          animated: true,
        });

        if (data.length > 0) {
          setCurrent([...current, {id: item.id, title: item.title}]);
          const selectKey = activeKey + 1;
          setactiveKey(selectKey);
          setCars({...cars, ['k' + selectKey]: data});
        } else {
          let ids = '';
          current.map((c, index) => {
            ids += (index !== 0 && '-') + c.id;
          });
          ids += '-' + item.id;
          dispatch(setCategory_action(ids));
          navigation.navigate('IlanKategoriSecimi', {
            ids,
          });
        }
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
        });
      },
    };
    dispatch(kategori_action(payload));
  });
  const sliceCategory = () => {
    setCurrent(slice(0, -1));
    delete cars['k' + activeKey];
    setCars(cars);
    setactiveKey(activeKey - 1);
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header title="Kategori Seçimi"
      renderRight={() => {
        return (
          <TouchableOpacity
            px2
            flex={false}
            color="transparent"
            onPress={() => {
              selectCategory({id: 1, title: 'Tüm Vasıta Türleri '});
              setCurrent([]);
            }}>
            <Icon
              type="ionicon"
              name="ios-reload"
              size={20}
              color="black"
              style={{display: current.length > 1 ? 'flex' : 'none'}}
            />
          </TouchableOpacity>
        );
      }}
      />
      {token != null && (
        <View style={styles.contain}>
          <FlatListL
            data={cars['k' + activeKey]}
            loading={loading}
            keyExtractor={item => item.id + ''}
            contentContainerStyle={styles.flatListContentContainer}
            renderItem={({item}) => (
              <ListItem
                title={<Text body1>{item.title}</Text>}
                bottomDivider
                onPress={() => selectCategory(item)}
                chevron={
                  <Icon
                    name="angle-right"
                    size={18}
                    color={BaseColor.primaryColor}
                  />
                }
              />
            )}
          />
        </View>
      )}

      {token == null && !loading && (
        <Block padding={20} flex={1} style={{justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>
            Kendi ilanlarınızı yayınlamak, mesaj alabilmek ve ekspertiz
            talebinde bulunmak için giriş yapmanız gerekmektedir.
          </Text>
          <Button
            style={{marginTop: 20}}
            onPress={() => {
              navigation.navigate('ChooseLoginType');
            }}>
            Giriş Yap
          </Button>
        </Block>
      )}
    </SafeAreaView>
  );
}
export default compose(
  withProps(() => {
    const {error, loading, data} = useSelector(state => state.kategori);
    return {
      error,
      loading,
      data,
    };
  }),
  React.forwardRef,
)(IlanEkle);
