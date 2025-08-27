import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Image,
  ProfileDescription,
} from '@components';
import styles from './styles';

export default class OurService extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header title="Hizmetler" />
        <ScrollView>
          <View>
            <View style={styles.titleAboutHeader}>
              <Text title1 semibold darkGrayColor style={{opacity: 0.9}}>
                Garantili Çözümler
              </Text>
              <Text subhead grayColor>
                Aracınızla ilgili tüm çözümlerimiz tek bir uygulamada
              </Text>
            </View>
          </View>
          <View style={{padding: 10}}>
            {/* Package */}
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('GABuyingServices');
                }}>
                <View
                  style={[
                    styles.titleAbout,
                    {
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      borderRadius: 10,
                    },
                  ]}>
                  <View style={{flex: 1}}>
                    <Icon
                      name="car"
                      solid
                      size={24}
                      color={BaseColor.whiteColor}
                    />
                  </View>
                  <View style={{flex: 8}}>
                    <View style={{marginLeft: 10}}>
                      <Text title3 semibold whiteColor>
                        Araç Alırken{' '}
                      </Text>
                      <Text footnote whiteColor numberOfLines={2}>
                        Hasar Sorgulama, Oto Ekspertiz, Araç Karşılaştırma
                        hizmetleri
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Icon
                      name="arrow-right"
                      solid
                      size={24}
                      color={BaseColor.whiteColor}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('GABuyingServices');
                }}>
                <View
                  style={[
                    styles.titleAbout,
                    {
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      borderRadius: 10,
                    },
                  ]}>
                  <View style={{flex: 1}}>
                    <Icon
                      name="car"
                      solid
                      size={24}
                      color={BaseColor.whiteColor}
                    />
                  </View>
                  <View style={{flex: 8}}>
                    <View style={{marginLeft: 10}}>
                      <Text title3 semibold whiteColor>
                        Araç Satarken
                      </Text>
                      <Text footnote whiteColor numberOfLines={2}>
                        Araç Değerleme, Hasar Sorgulama, Oto Ekspertiz, Araç
                        Karşılaştırma hizmetleri
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Icon
                      name="arrow-right"
                      solid
                      size={24}
                      color={BaseColor.whiteColor}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('KaportaBoyaArama');
                }}>
                <View
                  style={[
                    styles.titleAbout,
                    {
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                      borderRadius: 10,
                    },
                  ]}>
                  <View style={{flex: 1}}>
                    <Icon
                      name="car"
                      solid
                      size={24}
                      color={BaseColor.whiteColor}
                    />
                  </View>
                  <View style={{flex: 8}}>
                    <View style={{marginLeft: 10}}>
                      <Text title3 semibold whiteColor>
                        Kaporta Boya Sorgulama
                      </Text>
                      <Text footnote whiteColor numberOfLines={2}>
                        Aracınızı kaporta ve boya durumundan arayın
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Icon
                      name="arrow-right"
                      solid
                      size={24}
                      color={BaseColor.whiteColor}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
