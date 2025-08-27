import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './DrawerMenu.style';
import { CommonActions } from '@react-navigation/native';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Block } from '../../commonComponents';
import { SafeAreaView, Icon, Text } from '@components';
import { BaseStyle } from '../../config';

class DrawerMenu extends Component {
  navigateToScreen = route => () => {
    // React Navigation 7.x'de drawer'ı kapat ve navigate et
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate(route);
  };

  render() {
    return (
      <SafeAreaView style={[BaseStyle.safeAreaView, { backgroundColor: '#fff' }]}>
        <Block style={styles.container}>
          <View />
          <ScrollView>
            <Block padding={10}>
              <View style={styles.closeContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.closeDrawer();
                  }}>
                  <Icon name="times-circle" size={25} />
                </TouchableOpacity>
              </View>
              <View style={styles.navSectionStyle}>
                <Text
                  style={styles.navItemStyle}
                  onPress={this.navigateToScreen('SystemWorkFlow')}>
                  Sistem Nasıl Çalışır?
                </Text>
              </View>
              <View style={styles.navSectionStyle}>
                <Text
                  style={styles.navItemStyle}
                  onPress={this.navigateToScreen('Services')}>
                  Hizmetlerimiz
                </Text>
              </View>
              <View style={styles.navSectionStyle}>
                <Text
                  style={styles.navItemStyle}
                  onPress={this.navigateToScreen('BecomeDealer')}>
                  Bayimiz Olun
                </Text>
              </View>
              <View style={styles.navSectionStyle}>
                <Text
                  style={styles.navItemStyle}
                  onPress={this.navigateToScreen('Home')}>
                  Ana Sayfa
                </Text>
              </View>
            </Block>
          </ScrollView>
          <View style={styles.footerContainer}>
            <Text>Garantili Arabam v 1.1.1</Text>
          </View>
        </Block>
      </SafeAreaView>
    );
  }
}

DrawerMenu.propTypes = {
  navigation: PropTypes.object,
};

export default DrawerMenu;

// Functional Component versiyonu (önerilen):
/*
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Block} from '../../commonComponents';
import {SafeAreaView, Icon, Text} from '@components';
import {BaseStyle} from '../../config';
import styles from './DrawerMenu.style';

export default function DrawerMenu(props) {
  const {navigation} = props;

  const navigateToScreen = (route) => {
    navigation.closeDrawer();
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, {backgroundColor: '#fff'}]}>
      <Block style={styles.container}>
        <View />
        <DrawerContentScrollView {...props}>
          <Block padding={10}>
            <View style={styles.closeContainer}>
              <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                <Icon name="times-circle" size={25} />
              </TouchableOpacity>
            </View>
            
            <DrawerItem
              label="Sistem Nasıl Çalışır?"
              onPress={() => navigateToScreen('SystemWorkFlow')}
              labelStyle={styles.navItemStyle}
            />
            
            <DrawerItem
              label="Hizmetlerimiz"
              onPress={() => navigateToScreen('Services')}
              labelStyle={styles.navItemStyle}
            />
            
            <DrawerItem
              label="Bayimiz Olun"
              onPress={() => navigateToScreen('BecomeDealer')}
              labelStyle={styles.navItemStyle}
            />
            
            <DrawerItem
              label="Ana Sayfa"
              onPress={() => navigateToScreen('Home')}
              labelStyle={styles.navItemStyle}
            />
          </Block>
        </DrawerContentScrollView>
        
        <View style={styles.footerContainer}>
          <Text>Garantili Arabam v 1.1.1</Text>
        </View>
      </Block>
    </SafeAreaView>
  );
}
*/