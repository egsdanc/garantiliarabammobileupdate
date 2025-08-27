import React, {useState, useEffect} from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ListItem} from 'react-native-elements';

import {getUsers_action} from '@state/ducks/getUsers';
export default function GetUsers() {
  const {data, error, loading} = useSelector(state => state.getUsers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers_action());
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        {data.map((l, i) => (
          <ListItem
            key={i}
            leftAvatar={{source: {uri: l.picture.thumbnail}}}
            title={l.name.title + ' ' + l.name.first + ' ' + l.name.last}
            subtitle={l.email}
            bottomDivider
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
