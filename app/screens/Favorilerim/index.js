import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView} from '@components';
import {ListItem} from 'react-native-elements';
import {Icon, Text} from '../../commonComponents';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';
import {useSearchManager} from '../../state/ducks/SearchManager';

const Favorilerim = (
  
  {navigation, screenProps, getSavedSearchList, data = []},
  _,
) => {
  return (
    
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title="Favorilerim"
        renderLeft={() => (
          <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
        )}
        onPressLeft={() => navigation.goBack()}
      />
      <FlatList
        data={data || []}
        keyExtractor={item => item.id + ''}
        renderItem={({item, index}) => (
          <ListItem
            key={index}
            title={<Text body1>{item.title}</Text>}
            bottomDivider
            onPress={() =>
              navigation.navigate('SearchResults', {
                ...item.get_json,
                favId: `${item.id}`,
              })
            }
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
    </SafeAreaView>
  );
};

export default compose(
  withProps(useSearchManager),
  withProps(({getSavedSearchList}) => {
    useEffect(() => {
      getSavedSearchList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {};
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(Favorilerim);
