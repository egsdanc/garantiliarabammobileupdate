import React, { Component } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView, Text, Button, Image } from '@components';
import styles from './styles';
import { BaseColor, BaseStyle, Images } from '@config';
import { compose, withHooks, withLoadingScreen } from '@hocs';
import LinearGradient from 'react-native-linear-gradient';

class ChooseLoginType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scrollEnabled: true,
      slide: [
        {
          key: 1,
          image: Images.car1,
          text: 'Garantili Arabam uygulamasına hoşgeldiniz',
        },
        {
          key: 2,
          image: Images.car2,
          text: 'Uygulamada garantili, ekspertizli araçları bulabilir,',
        },
        {
          key: 3,
          image: Images.car3,
          text: 'Dilerseniz araç sahibine ekspertiz talebinde bulunabilir,',
        },
        {
          key: 4,
          image: Images.car4,
          text: 'Aracınızı Garantili Arabam güvencesiyle alabilirsiniz.',
        },
      ],
    };
  }

  /**
   * @description Simple authentication without call any APIs
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  authentication() {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.props.actions.authentication(true, response => {
          if (response.success) {
            this.props.navigation.navigate('Loading');
          } else {
            this.setState({
              loading: false,
            });
          }
        });
      },
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{ top: 'always' }}>
        <ScrollView
          style={styles.gradient}
          colors={[BaseColor.black, BaseColor.darkPrimaryColor]}>
          <View style={styles.container}>
            <View style={{ alignItems: 'center', backgroundColor: BaseColor.dark }}>
              <Image source={Images.logo} style={styles.logo} />
            </View>
            <View
              style={{
                width: '100%',
                height: '100%',
                bottom: 50,
                padding: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>garantiliarabam.com'da</Text>
              <Text style={{ color: BaseColor.primaryColor }}>Dünyada bir ilk Yapay Zeka Ekspertiz!</Text>
              <Text style={{ color: BaseColor.dark, fontSize: 30, paddingTop: 10 }}><Text style={{ fontWeight: 'bold' }}>Kurumsal</Text> Üyel Ol!</Text>
              <Text style={{ color: BaseColor.primaryColor, fontWeight: '600', paddingTop: 10 }}>Ücretsiz ilan ekle, Ekspertiz hizmetlerini kullan</Text>
              <Text style={{ color: BaseColor.dark, paddingVertical: 10 }}>Oturduğunuz yerden farklı bir şehire gitmeden internetten ekspertiz yaptırmanın vakti geldi.</Text>
              <Button
                full
                style={{ marginTop: 20 }}
                loading={this.state.loading}
                onPress={() => navigation.navigate('SignIn')}>
                Giriş Yap
              </Button>
              <View style={styles.contentActionBottom}>
                <Button
                  full
                  style={{
                    marginTop: 20,
                    backgroundColor: '#ffffff',
                    borderColor: BaseColor.black,
                    borderWidth: 1,
                  }}
                  styleText={{ color: BaseColor.black }}
                  loading={this.state.loading}
                  onPress={() =>
                    navigation.navigate('SignUp', { loginType: 'individual' })
                  }>
                  Telefonla Kaydol
                </Button>
              </View>
              <View style={styles.contentActionBottom}>
                <Button
                  full
                  style={{
                    backgroundColor: BaseColor.white,
                    borderColor: BaseColor.black,
                    borderWidth: 1,
                  }}
                  styleText={{ color: BaseColor.black }}
                  loading={this.state.loading}
                  onPress={() => navigation.navigate('SignUpWithMail')}>
                  Maille Kaydol
                </Button>
              </View>
              <View style={styles.contentActionBottom}>
                <Button
                  full
                  style={{
                    backgroundColor: BaseColor.whiteColor,
                    borderColor: BaseColor.black,
                    borderWidth: 1,
                  }}
                  styleText={{
                    color: BaseColor.red,
                  }}
                  loading={this.state.loading}
                  onPress={() => {
                    navigation.navigate('SignUp', { loginType: 'corporate' });
                  }}>
                  Kurumsal Kaydol
                </Button>
              </View>
              <Button
                full
                style={{
                  marginTop: 25,
                  backgroundColor: BaseColor.whiteColor,
                  borderColor: BaseColor.whiteColor,
                  borderWidth: 0,
                }}
                styleText={{ color: BaseColor.black }}
                loading={this.state.loading}
                onPress={() => {
                  // navigation.navigate('Home');
                  navigation.navigate('BottomTabNavigator', {
                    screen: 'Home' // Drawer içindeki Home screen'ine direkt git
                  });
                }}>
                Misafir olarak Devam Et
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default compose(withLoadingScreen({}))(ChooseLoginType);
