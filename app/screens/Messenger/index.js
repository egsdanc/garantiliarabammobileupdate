import React, {useEffect, useCallback} from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, ListThumbSquare} from '@components';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';
import {getChatList_action} from '@state/ducks/messages';

const Messenger = ({navigation, loader, list}) => {
  const dispatch = useDispatch();
  /** action */
  const getData = useCallback(() => dispatch(getChatList_action()), [dispatch]);

  const onPress = item => {
    navigation.navigate('Messages', {chatInfo: item});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title="Mesajlarım"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[BaseColor.primaryColor]}
            tintColor={BaseColor.primaryColor}
            refreshing={loader}
            onRefresh={() => getData()}
          />
        }
        data={list || []}
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index}) => {
          return (
            <ListThumbSquare
              onPress={() => onPress(item)}
              image={{uri: item.thumb}}
              txtLeftTitle={item?.ad_title}
              txtContent={item.name + ' ' + item?.surname}
              txtRight={item?.date}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default compose(
  withProps(() => {
    const {loader, list} = useSelector(state => state.messages);
    return {
      list,
      loading: loader,
    };
  }),
  withLoadingScreen({}),
)(Messenger);
