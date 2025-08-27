import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Alert, FlatList } from 'react-native';
import { Header, SafeAreaView, Icon, Text, CarItem } from '@components';
import { BaseStyle, BaseColor } from '@config';
import { Card } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { compose, withProps, withLoadingScreen } from '@hocs';
import { getProfileAds_action } from '@state/ducks/expertiseQuery';

const UserProfileDetail = ({ navigation, route }) => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  /** action */
  const getData = useCallback(
    userId => dispatch(getProfileAds_action(userId, resolve, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  const resolve = useCallback(res => {
    setData(res.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reject = useCallback(res => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getData(route.params.data.user_id);
  }, [getData, navigation]);
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Kullanıcı Profili"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <Card>
        <Text bold>
          {route.params.data.owner.name +
            ' ' +
            route.params.data.owner.surname}
        </Text>
        <Text>
          {/* Üyelik Tarihi: {navigation.getParam('data').owner.register_date} */}
          Üyelik Tarihi: {route.params.data.owner.register_date}

        </Text>
        <Text>Ilanları (5)</Text>
      </Card>
      <View style={{ marginVertical: 16, flex: 1 }}>
        <FlatList
          data={data}
          ListHeaderComponent={() => {
            return (
              <View style={{ marginVertical: 10, marginHorizontal: 16 }}>
                <Text bold>Yayındaki İlanları</Text>
              </View>
            );
          }}
          keyExtractor={item => item.id + ''}
          renderItem={({ item, index }) => (
            <CarItem
              image={item.thumb || ''}
              name={item.ad_title}
              title={item.car_model}
              price={item.ad_price}
              km={item.ad_km}
              style={{ marginBottom: 20, paddingHorizontal: 20 }}
              specialCaseText={
                item.isCorrect
                  ? 'h'
                  : item.isExpertise
                    ? 'e'
                    : item.iTrustMyCar
                      ? 'g'
                      : ''
              }
              onPress={() => {
                navigation.navigate('CarDetail', { ad_code: item?.ad_code });
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default compose(
  withProps(() => {
    const { loader } = useSelector(state => state.expertiseQuery);
    return {
      loading: loader,
    };
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(UserProfileDetail);
const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  inputLabel: {
    fontWeight: '300',
    color: 'black',
    fontSize: 16,
    paddingBottom: 10,
  },
  contentWrapper: {},
});
