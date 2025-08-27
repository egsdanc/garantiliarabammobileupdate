import React from 'react';
import {BaseStyle, BaseColor, YellowColor} from '@config';
import {TouchableOpacity, View, ScrollView, Image} from 'react-native';
import {Header, SafeAreaView, Text, Container} from '@components';
import {styles} from './styles';
import {BottomSheet, Icon} from 'react-native-elements';

const index = ({data, onSelect}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text body1 style={styles.title}>
          {data.title}
        </Text>
        <BottomSheet
          list={[
            {
              title: data.title,
              subtitle: data.carTitle,
              titleStyle: {
                textAlign: 'center',
                width: '100%',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              },
              subtitleStyle: {
                textAlign: 'center',
                width: '100%',
              },
              containerStyle: {
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              },
            },
            {
              title: 'Düzenle',
              leftIcon: {name: 'edit', type: 'feather'},
            },
            {
              title: 'İlanı Kaldır',
              leftIcon: {name: 'trash-2', type: 'feather'},
              onPress: () => alert('Merhaba'),
            },
            {
              title: 'Görüntülenme Raporu',
              leftIcon: {name: 'eye', type: 'feather'},
            },
            {
              title: 'Kapat',
              leftIcon: {name: 'close', color: 'white'},
              containerStyle: {backgroundColor: 'red'},
              titleStyle: {color: 'white'},
            },
          ]}
          cancelButtonIndex={4}
          buttonProps={{
            icon: {
              name: 'dots-three-vertical',
              size: 20,
              color: 'black',
              type: 'entypo',
            },
            style: {
              width: 40,
            },
            buttonStyle: {
              padding: 0,
              margin: 0,
              backgroundColor: 'white',
            },
          }}
        />
      </View>

      <Text body1 style={styles.carTitle}>
        {data.carTitle}
      </Text>
      <TouchableOpacity style={styles.content}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={data.avatar_url}
          />
          <View
            style={[
              styles.ticketWrapper,
              {backgroundColor: data.ticketBackground},
            ]}>
            <Text overline style={styles.ticket}>
              {data.ticket}
            </Text>
          </View>
        </View>
        <View style={styles.contentRight}>
          <Icon
            name="map-pin"
            type="feather"
            size={16}
            color={YellowColor.darkPrimaryColor}
          />
          <Text body1 style={styles.rightText}>
            {data.location}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.footer}>
        <View style={styles.footerIconWrapper}>
          <View style={styles.footerIcon}>
            <Icon
              name="eye"
              type="feather"
              size={16}
              color={YellowColor.darkPrimaryColor}
            />
            <Text style={styles.iconText}>{data.visitorCount}</Text>
          </View>
          <View style={styles.footerIcon}>
            <Icon
              name="star"
              type="feather"
              size={16}
              color={YellowColor.darkPrimaryColor}
            />
            <Text style={styles.iconText}>{data.favoriteCount}</Text>
          </View>
        </View>
        <Text body1 style={styles.footerText}>
          {data.date}
        </Text>
        <Text title3 bold style={styles.footerText}>
          {data.amount}
        </Text>
      </View>
    </View>
  );
};

export default index;
