import React, {useCallback, useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  AddressListItem,
} from '@components';
import {BaseStyle, BaseColor} from '@config';
import {useSelector, useDispatch} from 'react-redux';
import {
  getEmail_action,
  changeEmail_action,
  dismissChangeEmailError_action,
} from '@state/ducks/changeEmail';
import {Block} from '../../commonComponents';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';

function AddressList({navigation, screenProps}) {
  const loader = useSelector(state => state.changeEmail?.loader);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const resolve = useCallback(
    res => {
      screenProps.openModalSuccess({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || res || 'Başarıyla Güncellendi'}
            </Text>
          </Block>
        ),
        onClose: () => {},
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  const reject = useCallback(
    res => {
      screenProps.openModalError({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || 'Beklenmedik Hata Oluştu'}
            </Text>
          </Block>
        ),
        onClose: () => {
          dispatch(dismissChangeEmailError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  /** get config action */
  const getEmail = useCallback(
    () => dispatch(getEmail_action(res => {}, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  /** */
  const handleUpdate = () => {
    //dispatch(changeEmail_action(payload, resolve, reject));
  };
  /** didmount */
  useEffect(() => {
    //getEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, {flex: 1}]}>
      <Header
        style={{backgroundColor: BaseColor.whiteColor}}
        title="Adreslerim"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        renderRight={() => {
          return <Text>Yeni Ekle</Text>;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          Alert.alert("Çok yakında", "Çok yakında adreslerizi mobil uygulamadan düzenleyebiliyor olacaksınız")
          //navigation.navigate('AddNewAddress');
        }}
      />
      <View style={{flex: 1}}>
        <FlatList
          style={styles.list}
          refreshControl={
            <RefreshControl
              colors={[BaseColor.primaryColor]}
              tintColor={BaseColor.primaryColor}
              refreshing={loader}
              onRefresh={() => {}}
            />
          }
          data={list || []}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => {
            return (
              <AddressListItem
                data={item}
                onSelect={() => {
                  navigation.navigate('AddNewAddress', {data: item});
                }}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
export default compose(
  withProps(() => {
    const {getLoader} = useSelector(state => state.changeEmail);
    return {
      loading: getLoader,
    };
  }),
  withLoadingScreen({}),
)(AddressList);
const styles = StyleSheet.create({
  btnWrapper: {
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
});
