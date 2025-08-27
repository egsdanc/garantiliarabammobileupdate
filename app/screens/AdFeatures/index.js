import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {adFeaturesAction} from '@state/ducks/adFeatures';

import {styles} from './styles';
export default function AdFeatures() {
  const {data, error, loading} = useSelector(state => state.adFeatures);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adFeaturesAction());
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Tesr</Text>
      </View>
    </SafeAreaView>
  );
}
