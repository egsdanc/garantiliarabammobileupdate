import React from 'react';
import {BaseColor} from '@config';
import { TouchableOpacity, View } from "react-native";
import {Text, Icon} from '@components';
import {styles} from './styles';
import {Card} from 'react-native-elements';

const index = ({data, onSelect}) => {
  return (
    <Card style={styles.container}>
      <TouchableOpacity
      onPress={onSelect}
      >
        <View style={styles.addressNameHolder}>
          <Text bold style={styles.addressTitle}>{data.title}</Text>
          <Icon name="arrow-right" size={15} color={BaseColor.primaryColor} />
        </View>
        <View
          style={{
            borderBottomColor: BaseColor.dividerColor,
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.subGroupWrapper}>
          <Text>Mehmet Akif Ersoy Mahallesi 1299. Sokak No:  Mehmet Akif Ersoy Konutlar</Text>
          <Text style={{marginTop:10}}>Yenimahalle / Ankara</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default index;
