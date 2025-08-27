import React, { useEffect } from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


const GarantiAISuccess = ({ navigation }) => {


    useEffect(() => {
        //navigation.setOptions({title: `Ekspertiz Sonuç Sayfası`, headerLeft: ()=> null,});
    })


    return (
        <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
            <Image source={require('../../assets/images/shoot-sides/success.png')} style={{ width: 150, height: 150 }} />
            <Text>Oto Ekspertiz talebiniz alınmıştır.</Text>
            <Text style={{ color: '#000000', marginTop: 15, textAlign: 'center' }}>Ekspertiz sonuçlandığında sistemimizde kayıtlı telefon numaranıza sms olarak, email olarak ve mobil uygulamadan push notification olarak bildirim alacaksınız. Takip etmek için lütfen aşağıdaki takip numarasını kaydediniz.</Text>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert('Kopyalandı', 'Referans numarası kopyalandı')
                }}
            >
                <Text style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>{"TEST123456"}</Text>
                <View style={{ marginTop: 20 }}>
                    <Button title='Anasayfaya Dön' color={'red'}
                        onPress={() => {
                            // navigation.navigate('Home');
                            navigation.navigate('BottomTabNavigator', {
                                screen: 'Home' // Drawer içindeki Home screen'ine direkt git
                            })
                        }}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    }
});

export default GarantiAISuccess;
