import React, { useEffect } from 'react';
import {
    Image, SafeAreaView, ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Text,
    Button,
    Header,
    Icon,
} from '@components';
import {BaseColor} from "../../config";

const GarantiAIIntro = ({navigation}) => {


    return (
        <SafeAreaView style={{flex: 1}}>
            <Header
                title=""
                renderLeft={() => {
                    return (
                        <Icon
                            name="arrow-left"
                            size={20}
                            color={BaseColor.primaryColor}
                        />
                    );
                }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
            />
            <ScrollView>
                <View style={{flex: 1, width: '100%', height: '100%', justifyContent: 'flex-start', alignSelf: 'center', alignContent: 'center', alignItems: 'center', paddingHorizontal: 10}}>
                    <Image source={require('../../assets/images/shoot-sides/autonomous-car.png')} style={{width: 150, height: 150}}/>
                    <Text title2 center>Garantili Arabam</Text>
                    <Text title2 center>Yapay Zeka Oto Ekspertiz</Text>
                    <View style={{color: '#000000', marginTop: 15, textAlign: 'center'}}>
                        <Text>* Kaporta Analizi</Text>
                        <Text>* Değişen Parça ve Boya Göçük Analizi</Text>
                        <Text>* Marka Model Analizi</Text>
                        <Text>* Ortalama Piyasa Fiyatı Analizi</Text>
                        <Text>* Hasar Sorgusu</Text>
                        <Text>* Araç Detay Sorgusu</Text>
                        <Text>* Değişen Parça Sorgusu</Text>
                        <Text>* Kilometre Sorgulama</Text>
                        <Text>* Borç Sorgulama</Text>
                        <Text>* Ruhsat Sorgulama</Text>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Button outline={true}>Hepsi Sadece 300 TL</Button>
                        <Text style={{marginTop: 10, color: BaseColor.primaryColor}}>Önce ekspertiz yaptır sonra öde</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                    >
                        <View style={{marginTop: 20}}>
                            <Button color={'red'}
                                    onPress={() =>{
                                        navigation.navigate('GarantiAI');
                                    }}
                            >Ekspertiz Başlat</Button>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    }
});

export default GarantiAIIntro;
