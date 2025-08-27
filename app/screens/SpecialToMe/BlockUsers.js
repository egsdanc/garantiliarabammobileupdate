import React, { useCallback, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Header, SafeAreaView, Icon, Text, Container } from '@components';
import { BaseStyle, BaseColor } from '@config';
import { getBlockedUsers_action, dismissBlockedUsersError_action, updateBlockedUser_action } from '@state/ducks/blockedUsers';
import { withLoadingScreen, withProps } from '../../hocs';
import { Block } from '../../commonComponents';

const BlockedUsers = ({
  navigation,
  screenProps,
  list
}) => {

  const resolve = useCallback(res => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          dispatch(dismissBlockedUsersError_action());
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );

  const dispatch = useDispatch();
  /** action */
  const getData = useCallback(() => dispatch(getBlockedUsers_action()), [
    dispatch,
  ]);

  /** action */
  const updateaUser = useCallback(
    (id) =>
      dispatch(
        updateBlockedUser_action(id, resolve, reject),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  /** didmount */
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Engellediğim Üyeler"
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={BaseColor.primaryColor}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <Container>
        {
          list.length > 0 ? (
            list.map(user => (
              <View style={styles.list}>
                <Text body2 grayColor semibold>
                  {user.name + " " + user.surname}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => updateaUser(user.id)}>
                  <Text body2 bold primaryColor>
                    Engellemeyi Kaldır
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text body1>Hiçbir kullanıcıyı engellemediniz.</Text>
          )
        }
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
  }
})


export default compose(
  withProps(() => {
    const { loader, list } = useSelector(state => state.blockedUsers);
    return {
      loading: loader,
      list
    };
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(BlockedUsers);