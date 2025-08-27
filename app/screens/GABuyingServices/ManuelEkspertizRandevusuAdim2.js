import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header, SafeAreaView, Icon, Text } from '@components';
import { BaseStyle, BaseColor } from '@config';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPackagesListCallback_action,
  dismissGetDealersListError_action,
} from '@state/ducks/getDealersList';
import { Block } from '../../commonComponents';
import { compose, withLoadingScreen } from '@hocs';
import { withProps } from '../../hocs';
import { Input, PricingCard } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

function ManuelEkspertizRandevusuAdim2({ navigation, screenProps, route }) {
  const loader = useSelector(state => state.changeEmail?.loader);
  const [expertiseData, setExpertiseData] = useState(null);
  const [paketler, setPaketler] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const dispatch = useDispatch();
  const resolve = useCallback(
    res => {
      if (res) {
        res.datas = res.datas.map(value => {
          return {
            label: value.paket_adi,
            value: value.paket_kodu,
            price: value.fiyat,
            aciklama: [value.aciklama],
          };
        });
        setPaketler(res.datas);
      }
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
          dispatch(dismissGetDealersListError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  /** get config action */
  const getPackages = useCallback(
    () => dispatch(getPackagesListCallback_action({}, resolve, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  /** */
  const handleUpdate = () => {
    //dispatch(changeEmail_action(payload, resolve, reject));
  };
  /** didmount */
  useEffect(() => {
    if (route?.params?.expertiseData) {
      setExpertiseData(route.params.expertiseData);
    }
    getPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]}>
      <Header
        style={{ backgroundColor: BaseColor.whiteColor }}
        title="Paket Seçiniz"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{ flex: 1, paddingVertical: 10 }}>
          {/*paket seciniz*/}
          <View style={styles.sectionHolder}>
            <Text style={styles.labelHeader}>Paket Seçiniz</Text>
            <RNPickerSelect
              doneText="Seç"
              value={selectedPackage}
              items={paketler}
              onValueChange={(value, index) => {
                setSelectedPackage(value);
              }}
              placeholder={{ label: 'Paket Seçiniz', value: null }}
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
                marginHorizontal: 10,
              }}
            />
          </View>
          {/*paket secim sonucu*/}
          {selectedPackage != null && (
            <View>
              {
                /*
                <PricingCard
                color="#cc0033"
                title="Online Ödeme"
                price={
                  paketler.find(element => {
                    return element.value == selectedPackage;
                  }).price
                }
                pricingStyle={{fontSize: 30}}
                info={
                  paketler.find(element => {
                    return element.value == selectedPackage;
                  }).aciklama
                }
                button={{title: 'SEÇ'}}
                onButtonPress={() => {
                  navigation.navigate('ManuelEkspertizRandevusuAdim3', {
                    ...expertiseData,
                    selectedPackage: selectedPackage,
                  });
                }}
              />
                 */
              }
              <PricingCard
                color="#4f9deb"
                title="Bayide Öde"
                price={
                  paketler.find(element => {
                    return element.value == selectedPackage;
                  }).price
                }
                pricingStyle={{ fontSize: 30 }}
                info={
                  paketler.find(element => {
                    return element.value == selectedPackage;
                  }).aciklama
                }
                button={{ title: 'SEÇ' }}
                onButtonPress={() => {
                  navigation.navigate('ManuelEkspertizRandevusuAdim3');
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default compose(
  withProps(() => {
    const { getLoader } = useSelector(state => state.changeEmail);
    return {
      loading: getLoader,
    };
  }),
  withLoadingScreen({}),
)(ManuelEkspertizRandevusuAdim2);
const styles = StyleSheet.create({
  labelHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: BaseColor.grayColor,
  },
  sectionHolder: {
    marginHorizontal: 10,
    marginVertical: 7,
  },
});
