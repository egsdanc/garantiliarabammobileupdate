import {View, FlatList, TouchableOpacity} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import {BreadCrumb} from '@common';
import styles from './styles';
import {compose, withHooks, withLoadingScreen} from '@hocs';
// Load sample language data list

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {kategori_action} from '@state/ducks/kategori';
import {ListItem} from 'react-native-elements';

function Kategori({navigation}) {
  const [activeKey, setactiveKey] = useState(0);
  const [cars, setCars] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    selectCategory(1);
  }, []);
  const selectCategory = id => {
    const payload = {
      id: id,
      resolve: data => {
        if (data.length > 0) {
          const selectKey = activeKey + 1;
          setactiveKey(activeKey + 1);
          setCars({...cars, ['k' + selectKey]: data});
        }
      },
      reject: err => {},
    };
    dispatch(kategori_action(payload));
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header title="Kategori Seçimi" />

      <BreadCrumb {...{navigation, activeKey: 'k' + activeKey}} />

      <View style={styles.contain}>
        <FlatList
          data={cars['k' + activeKey]}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContentContainer}
          renderItem={({item}) => (
            <ListItem
              title={<Text body1>{item.title}</Text>}
              bottomDivider
              onPress={() => selectCategory(item.id)}
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
    </SafeAreaView>
  );
}
export default compose(withLoadingScreen({}))(Kategori);
