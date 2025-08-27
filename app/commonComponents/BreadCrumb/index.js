import React, {createElement, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native';
import Button from '../Button';
import Text from '../Text';
import {StyleSheet} from 'react-native';
import {BaseColor} from '../../config';
import {propEq, find, findIndex} from 'ramda';
//TODO: bu liste duzeltilmeli
const stepsDefault = [
  {link: 'Kategori', key: 'k1', title: 'Kategori'},
  {link: '', key: 'k2', title: 'Marka'},
  {link: '', key: 'k3', title: 'Model'},
  {link: '', key: 'k4', title: 'Seri'},
  {link: '', key: 'k5', title: 'Alt Model'},
  {link: '', key: 'k6', title: 'Seçim Yapınız'},
  {link: '', key: 'k7', title: 'Konum'},
  {link: 'IlanFotografYukle', key: 'k8', title: 'Fotograf'},
  {link: 'Ozellikler', key: 'k9', title: 'Özellikler'},
  {link: 'Iletisim', key: 'k10', title: 'İletişim'},
  {link: 'Paket', key: 'k11', title: 'Paket'},
];

const style = StyleSheet.create({
  navigationItemActive: {
    backgroundColor: BaseColor.black,
    height: 30,
    borderRadius: 10,
  },
  navigationItem: {
    color: '#ffffff',
    marginLeft: 15,
    marginRight: 15,
    fontWeight: '600',
    fontSize: 15,
    marginTop: 5,
  },
  linear: {padding: 10},
});
export const BreadCrumb = ({
  navigation,
  steps = stepsDefault,
  activeKey = 'k1',
  canClick = (current, clicked, list) => {
    const currentIndex = findIndex(propEq('key', current.key))(list);
    const clickedIndex = findIndex(propEq('key', clicked.key))(list);
    return currentIndex > clickedIndex;
  },
}) => {
  const scrollView = useRef(null);
  return (
    <LinearGradient style={style.linear} colors={['#848484', '#424242']}>
      <ScrollView
        horizontal={true}
        ref={scrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {steps.map(({link, key, title}) =>
          createElement(
            key === activeKey ? Button : Text,
            {
              key,
              onPress: () => {
                if (
                  canClick(
                    find(propEq('key', activeKey), steps),
                    {link, key, title},
                    steps,
                  )
                ) {
                  /** need to diffiratiate root or not */
                  navigation.pop(1);
                  navigation.push(link);
                }
              },
              onLayout:
                key === activeKey &&
                (event =>
                  scrollView.current.scrollTo({
                    x: event.nativeEvent.layout.x,
                    y: 0,
                    animated: true,
                  })),
              style:
                key === activeKey
                  ? style.navigationItemActive
                  : style.navigationItem,
            },
            title,
          ),
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default BreadCrumb;
