import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  Text,
  Button,
} from '@components';
import AsyncStorage from '@react-native-community/async-storage';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
// Base64 dönüşümü için React Native'in built-in fetch API'sini kullanacağız


import FrontImage from '../../assets/images/shoot-sides/overlays/js/FrontImage.js';
import FrontT34Driver from '../../assets/images/shoot-sides/overlays/js/FrontT34Driver.js';
import FrontT34DriverInspect from '../../assets/images/shoot-sides/overlays/js/FrontT34DriverInspect.js';
import SideDriver from '../../assets/images/shoot-sides/overlays/js/SideDriver.js';
import SideDriverFrontInspect from '../../assets/images/shoot-sides/overlays/js/SideDriverFrontInspect.js';
import SideDriverBackInspect from '../../assets/images/shoot-sides/overlays/js/SideDriverBackInspect.js';
import BackT34Driver from '../../assets/images/shoot-sides/overlays/js/BackT34Driver.js';
import BackT34DriverInspect from '../../assets/images/shoot-sides/overlays/js/BackT34DriverInspect.js';
import Back from '../../assets/images/shoot-sides/overlays/js/Back.js';
import BackT34Passenger from '../../assets/images/shoot-sides/overlays/js/BackT34Passenger.js';
import BackT34PassengerInspect from '../../assets/images/shoot-sides/overlays/js/BackT34PassengerInspect.js';
import SidePassenger from '../../assets/images/shoot-sides/overlays/js/SidePassenger.js';
import SidePassengerBackInspect from '../../assets/images/shoot-sides/overlays/js/SidePassengerBackInspect.js';
import SidePassengerFrontInspect from '../../assets/images/shoot-sides/overlays/js/SidePassengerFrontInspect.js';
import FrontT34Passenger from '../../assets/images/shoot-sides/overlays/js/FrontT34Passenger.js';
import FrontT34PassengerInspect from '../../assets/images/shoot-sides/overlays/js/FrontT34PassengerInspect.js';

import Images from '../../assets/images/index.js'
import { compose } from "redux";
import { withLoadingScreen, withProps } from '@hocs';
import { Block } from "../../commonComponents";
import { BaseColor } from "../../config";


const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}


const PermissionsPage = ({ askForPermission }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
      <Text>Kameraya izin vermeniz gerekmektedir.</Text>
      <View style={{ marginTop: 30 }}>
        <Button onPress={askForPermission}>İZNİ AÇ</Button>
      </View>
    </View>
  )
}

const NoCameraDeviceError = ({ navigation }) => {
  return (
    <Block flex={1} style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
      <Text>Bu cihazda kamera desteklenmiyor.</Text>
      <Button
        style={{ marginTop: 20 }}
        onPress={() => {
          navigation.goBack();
        }}
      >Kapat</Button>
    </Block>
  )
}


const renderMask = (key: number) => {
  switch (key) {
    case 1:
      return <FrontImage height={dimensions.height / 2} width={dimensions.width - 30} />
    case 2:
      return <FrontT34Driver height={dimensions.height / 2} width={dimensions.width - 30} />
    case 3:
      return <FrontT34DriverInspect height={dimensions.height / 2} width={dimensions.width - 30} />
    case 4:
      return <SideDriver height={dimensions.height / 2} width={dimensions.width - 30} />
    case 5:
      return <SideDriverFrontInspect height={dimensions.height / 2} width={dimensions.width - 30} />
    case 6:
      return <SideDriverBackInspect height={dimensions.height / 2} width={dimensions.width - 30} />
    case 7:
      return <BackT34Driver height={dimensions.height / 2} width={dimensions.width - 30} />
    case 8:
      return <BackT34DriverInspect height={dimensions.height / 2} width={dimensions.width - 30} />
    case 9:
      return <Back height={dimensions.height / 2} width={dimensions.width - 30} />
    case 10:
      return <BackT34Passenger height={dimensions.height / 2} width={dimensions.width - 30} />
    case 11:
      return <BackT34PassengerInspect height={dimensions.height / 2} width={dimensions.width - 30} />
    case 12:
      return <SidePassenger height={dimensions.height / 2} width={dimensions.width - 30} />
    case 13:
      return <SidePassengerBackInspect height={dimensions.height / 2} width={dimensions.width - 30} />
    case 14:
      return <SidePassengerFrontInspect height={dimensions.height / 2} width={dimensions.width - 30} />
    case 15:
      return <FrontT34Passenger height={dimensions.height / 2} width={dimensions.width - 30} />
    case 16:
      return <FrontT34PassengerInspect height={dimensions.height / 2} width={dimensions.width - 30} />
    default:
      break;
  }
}

const GarantiAI = ({ navigation }) => {
  const camera = useRef(null)
  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()
  const [token, setToken] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(1);
  const [data, setData] = useState([
    { id: 1, image: Images.shoot_sides.front, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 2, image: Images.shoot_sides.frontT34Driver, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 3, image: Images.shoot_sides.frontT34DriverInspect, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 4, image: Images.shoot_sides.sideDriver, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 5, image: Images.shoot_sides.sideDriverFrontInspect, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 6, image: Images.shoot_sides.sideDriverBackInspect, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 7, image: Images.shoot_sides.backT34Driver, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 8, image: Images.shoot_sides.backT34DriverInspect, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 9, image: Images.shoot_sides.back, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 10, image: Images.shoot_sides.backT34Passenger, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 11, image: Images.shoot_sides.backT34PassengerInspect, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 12, image: Images.shoot_sides.sidePassenger, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 13, image: Images.shoot_sides.sidePassengerBackInspect, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 14, image: Images.shoot_sides.sidePassengerFrontInspect, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 15, image: Images.shoot_sides.frontT34Passenger, shoot: false, shootImage: '', shootImageBase64: '' },
    { id: 16, image: Images.shoot_sides.frontT34PassengerInspect, shoot: false, shootImage: '', shootImageBase64: '' },
  ]);

  /** didmount */
  useEffect(() => {
    AsyncStorage.getItem('@token').then(_token => {
      if (_token) {
        setToken(_token);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

  }, [data])

  if (!hasPermission) return <PermissionsPage askForPermission={requestPermission} />
  if (device == null) return <NoCameraDeviceError navigation={navigation} />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {token != null && (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            ref={camera}
            isActive={true}
            photo={true}
            video={false}
          />
          <View style={{ width: dimensions.width, height: dimensions.height, alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
            {renderMask(selectedImageIndex)}
          </View>
          <View style={{ height: 100, width: 100, position: 'absolute', bottom: 20, left: (dimensions.width / 2) - 50, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                if (selectedImageIndex < 17) {
                  camera.current?.takePhoto().then(async photo => {
                    try {
                      // Fetch ile dosyayı oku ve base64'e çevir
                      const response = await fetch(`file://${photo.path}`);
                      const blob = await response.blob();
                      
                      // Blob'u base64'e çevirmek için FileReader kullan
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64Data = reader.result.split(',')[1]; // data:image/jpeg;base64, kısmını çıkar
                        let newArr = [...data];
                        newArr[selectedImageIndex - 1].shoot = true;
                        newArr[selectedImageIndex - 1].shootImage = `file://${photo.path}`;
                        newArr[selectedImageIndex - 1].shootImageBase64 = base64Data;
                        setData(newArr);
                        
                        if (selectedImageIndex < 16) {
                          setSelectedImageIndex(selectedImageIndex + 1)
                        } else {
                          //resim upload bitti sonraki sayfaya gecelim.
                        }
                      };
                      reader.readAsDataURL(blob);
                      
                    } catch (error) {
                      console.error('Base64 dönüşümü sırasında hata:', error);
                      Alert.alert('Hata', 'Fotoğraf işlenirken bir hata oluştu.');
                    }
                  })
                }
              }}
            >
              <Image source={require('../../assets/images/shoot-sides/btn-picture.png')} resizeMode='contain' style={{ width: 90, height: 90 }} />
            </TouchableOpacity>
          </View>
          <View style={{ height: 100, width: 100, position: 'absolute', bottom: 20, right: 0, alignItems: 'center', justifyContent: 'center' }}>
            {
              data.filter(element => element.shoot === true).length === 16 && (
                <TouchableOpacity
                  onPress={() => {
                    let emptyControl = data.filter(_data => {
                      return _data.shoot === false
                    })
                    if (emptyControl !== undefined && emptyControl != null && emptyControl.length > 0) {
                      Alert.alert('Hata', 'Lütfen bütün resimleri yükleyiniz!');
                    } else {
                      navigation.push('GarantiAIProcess', { images: data });
                    }

                  }}
                >
                  <Image source={require('../../assets/images/shoot-sides/arrow-right.png')} resizeMode='contain' style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
              )
            }
          </View>
          <View style={{ height: 100, width: dimensions.width, position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
              style={{ height: 100, width: dimensions.width }}
              data={data}
              keyExtractor={(obj, index) => index + ''}
              renderItem={({ item, index }) => (
                <View style={{ width: 100, height: 100, backgroundColor: '#cc0033', marginHorizontal: 5, borderRadius: 5, }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedImageIndex(index + 1)
                    }}
                  >
                    {
                      item.shoot === false ? (
                        <Image source={item.image} style={[styles.listItemSmallImage, index + 1 === selectedImageIndex ? styles.selectedListItem : null]} />
                      ) : (
                        <Image source={{ uri: item.shootImage }} style={[styles.listItemSmallImage, index + 1 === selectedImageIndex ? styles.selectedListItem : null]} />
                      )
                    }
                    <View style={{ position: 'absolute', bottom: 2, right: 2, width: 15, height: 15, borderRadius: 8, backgroundColor: '#ffffff', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: '#000000', fontSize: 7 }}>{item.id}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              horizontal={true}
            />
          </View>
          <View style={{ height: 100, width: 100, position: 'absolute', bottom: 20, left: 0, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Home');
                navigation.navigate('BottomTabNavigator', {
                  screen: 'Home' // Drawer içindeki Home screen'ine direkt git
                })
              }}
            >
              <Image source={require('../../assets/images/shoot-sides/arrow-cross.png')} resizeMode='contain' style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {token === null && (
        <Block padding={20} flex={1} style={{ justifyContent: 'center' }}>
          <Block style={{ marginBottom: 50 }} flex={false}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
              Online Ekspertiz için uygulamada oturum açmanız gerekmektedir.
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: BaseColor.primaryColor }}>
              Buradan kaydolun
            </Text>
          </Block>
          <Text style={{ textAlign: 'center' }}>
            Ücretsiz kayıt olabilir ve giriş yapabilirsiniz.
          </Text>
          <Button
            style={{ marginTop: 20 }}
            onPress={() => {
              navigation.navigate('ChooseLoginType');
            }}>
            Giriş Yap
          </Button>
        </Block>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  listItemSmallImage: {
    width: 100, height: 100, borderRadius: 5,
  },
  selectedListItem: {
    borderColor: 'green',
    borderWidth: 4,
    borderRadius: 5,
  }
});

export default compose(
  withProps(() => {
    return {};
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(GarantiAI);