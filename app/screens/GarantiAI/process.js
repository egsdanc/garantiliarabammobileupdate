import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    saveInspection_action,
    dismissSaveInspectionError_action,
} from '@state/ducks/ai';
import { useDispatch } from "react-redux";

const GarantiAIProcess = ({ navigation, route }) => {
    const [text, setText] = useState("Resimleriniz taranıyor...");
    const [result,setResult] = useState("")
    const dispatch = useDispatch();
    const [isLoading,setisloading] = useState(false)
    const resolve = useCallback(res => {
        //setResult('Kayıt bulundu, araç sayfasına yönlendiriliyorsunuz');

         setisloading(false)
         setResult('');
         navigation.navigate('GarantiAISuccess', {data: res?.data});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reject = useCallback(res => {
        setisloading(false)
        setResult(res?.message);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //navigation.setOptions({title: `Ekspertiz Değerlendirme Sayfası`});
        const { images } = route?.params || {}; // params olabilir veya olmayabilir, güvenlik için boş obje
        const payload = { "images": images };
        setisloading(true)
        dispatch(saveInspection_action(payload, resolve, reject));
    }, [])

    return (
        
        <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
  <TouchableOpacity
      onPress={() => navigation.goBack()}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={[styles.button]}
    >
      <Text style={styles.icon}>←</Text>
      <Text style={styles.text}>{"  "}Fotoğraflarını güncelle</Text>
    </TouchableOpacity>
                <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
              {isLoading ?  <ActivityIndicator size={'large'} /> : ""} 
            {isLoading ?   <Text style={{ color: '#000000', marginTop: 15, textAlign: 'center' }}>{text}</Text> : ""} 
              <Text style={{ color: '#000000', marginTop: 15, textAlign: 'center' }}>{result != "" ? result : ""}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
      button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: { fontSize: 16, marginTop: -1 },
  text: { fontSize: 14, fontWeight: '600', color: '#111827' },
});

export default GarantiAIProcess;
