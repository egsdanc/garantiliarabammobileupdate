import React, {useCallback, useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Container, Button} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';
import {Card, Avatar, CheckBox, ListItem} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';
import {Block} from '../../commonComponents';
import {
  getUserActivities_action,
  dismissUserActivitiesError_action,
} from '@state/ducks/userActivities';

const ActiveSessions = ({navigation, screenProps}) => {
  const [list, setList] = useState([]);
  const resolve = useCallback(res => {
    setList(res);
  }, []);
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
          dispatch(dismissUserActivitiesError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );

  const dispatch = useDispatch();
  /** get notification permissinos action */
  const getUserActivities = useCallback(
    () => dispatch(getUserActivities_action(resolve, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  /** didmount */
  useEffect(() => {
    getUserActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Aktif Oturumlarım"
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
        {(list || []).map(item => (
          <Card>
            <View style={styles.row}>
              <Text body2 grayColor>
                Cihaz
              </Text>
              <Text body2 semibold accentColor>
                {item.platform}
              </Text>
            </View>
            <View style={styles.row}>
              <Text body2 grayColor>
                Program
              </Text>
              <Text body2 semibold accentColor>
                {item.agent}
              </Text>
            </View>
            <View style={styles.row}>
              <Text body2 grayColor>
                Yer
              </Text>
              <Text body2 semibold accentColor>
                {item.city}/{item.country}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default compose(
  withProps(() => {
    const {loader} = useSelector(state => state.userActivities);
    return {
      loading: loader,
    };
  }),
  withLoadingScreen({}),
)(ActiveSessions);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
  },
});
