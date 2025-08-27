import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text } from '@components';
import styles from './styles';

const EkspertizRandevuOdemeSonuc = ({ navigation }) => {
  const goToHome = () => {
    // navigation.navigate('Home');
    navigation.navigate('BottomTabNavigator', {
      screen: 'Home' // Drawer içindeki Home screen'ine direkt git
    })
  };
  return (
    <SafeAreaView
      style={{ ...BaseStyle.safeAreaView, backgroundColor: 'rgb(246,246,246)' }}
      forceInset={{ top: 'always' }}>
      <Header
        title="Ekspertiz Randevu Sonucu"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={goToHome}
      />
      <View style={styles.content}>
        <Text body1 style={styles.message}>
          Ekspertiz talebiniz başarıyla oluşturuldu.
        </Text>
        <TouchableOpacity
          onPress={goToHome}
          activeOpacity={0.5}
          style={styles.btn}>
          <Text body1 style={styles.btnTxt}>
            Anasayfaya dön
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EkspertizRandevuOdemeSonuc;
