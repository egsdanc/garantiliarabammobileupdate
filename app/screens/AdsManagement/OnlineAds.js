import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, SafeAreaView, Icon, Text, Container } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';

export default function OnlineAds({ navigation, route }) {
  const { title } = route.params || {}; // params olabilir veya olmayabilir, güvenlik için boş obje

  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title={title}
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <Container>
        <Text body1>Bu listede hiç ilan bulunamadı</Text>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
