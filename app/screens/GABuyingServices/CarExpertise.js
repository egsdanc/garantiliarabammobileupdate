import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {Header, SafeAreaView, Button, Icon, Text, Container} from '@components';
import {BaseStyle, BaseColor} from '@config';
import {Card, CheckBox, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {compose, withProps, withLoadingScreen} from '@hocs';
import {getExpertiseQuery_action} from '@state/ducks/expertiseQuery';

const CarExpertise = ({navigation}) => {
  const [plakaCheck, setPlakaCheck] = useState(true);
  const [saseCheck, setSaseCheck] = useState(false);
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const setCheckBoxes = () => {
    setSaseCheck(!saseCheck);
    setPlakaCheck(!plakaCheck);
    setResult('');
  };

  const dispatch = useDispatch();
  /** action */
  const getData = useCallback(
    payload => dispatch(getExpertiseQuery_action(payload, resolve, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  const query = () => {
    let payload = {};
    if (text == '') {
      Alert.alert(
        'Hata',
        'Plaka numarası ya da şase numarasını yazın',
        [
          {
            text: 'Tamam',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      let regPlaka = /^([0-9]{2})([A-Z]{1,3})([0-9]{2,4})$/;
      if (plakaCheck) {
        if (regPlaka.test(text.toUpperCase()) === false) {
          Alert.alert(
            'Hata',
            'Plaka numarasını doğru yazınız.',
            [
              {
                text: 'Tamam',
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        } else {
          payload = {plate: text};
        }
      } else if (saseCheck) {
        payload = {chasisno: text};
      }
      getData(payload);
    }
  };

  const resolve = useCallback(res => {
    setResult('Kayıt bulundu, araç sayfasına yönlendiriliyorsunuz');
    setTimeout(() => {
      setResult('');
      navigation.navigate('CarDetail', {ad_code: res?.data.ad_code});
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reject = useCallback(res => {
    setResult(res.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [saseCheck, plakaCheck]);
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Ekspertiz Sorgulama"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <ScrollView>
        <Card>
          <View style={styles.contentWrapper}>
            <CheckBox
              title="Plakadan Sorgulama"
              checked={plakaCheck}
              checkedColor="red"
              onPress={() => {
                setCheckBoxes();
              }}
            />
            <CheckBox
              title="Şase Nodan Sorgulama"
              checked={saseCheck}
              checkedColor="red"
              onPress={() => {
                setCheckBoxes();
              }}
            />
          </View>
          <View>
            <Input
              maxLength={plakaCheck ? 10 : 17}
              onChangeText={text => {
                setText(text);
              }}
              placeholder={plakaCheck ? 'Araç Plakası' : 'Şase Numarası'}
            />
          </View>
          <View>
            <Text>{result}</Text>
          </View>
        </Card>
      </ScrollView>
      <Container>
        <Button
          full
          onPress={() => {
            query();
          }}>
          Sorgula
        </Button>
      </Container>
    </SafeAreaView>
  );
};
export default compose(
  withProps(() => {
    const {loader} = useSelector(state => state.expertiseQuery);
    return {
      loading: loader,
    };
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(CarExpertise);
const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  inputLabel: {
    fontWeight: '300',
    color: 'black',
    fontSize: 16,
    paddingBottom: 10,
  },
  input: {
    fontSize: 18,
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  colorRed: {color: 'red'},
  switchContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  switch: {
    padding: 5,
  },
  cardTitle: {
    color: BaseColor.webBlue,
    fontSize: 16,
  },
});
