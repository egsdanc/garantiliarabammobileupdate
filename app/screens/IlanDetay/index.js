import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Images, BaseColor } from '@config';
import { setDetail_action } from '@state/ducks/IlanVer';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
  Header,
  Button as Btn,
  Switch,
  Icon as VIcon,
  KeyboardAwareScrollView,
  SelectPicker,
  Text as Txt,
} from '@components';
import _ from 'lodash';
import { Icon, Overlay, normalize } from 'react-native-elements';
import { Block, Button, StepProgress, SafeAreaView, XForm } from '@common';
import styles from './styles';
const { staticData, inputFields } = require('./staticData.json');

export default function IlanDetay({ navigation, screenProps, route }) {
  let selectedList = [];
  let inputList = [
    ...inputFields.map(i => ({
      ...i,
      value: null,
    })),
  ];
  selectedList = [
    ...staticData.map(s => ({
      value: null,
      key: s.key,
      title: s.title,
    })),
  ];
  const dispatch = useDispatch();

  const { data } = route?.params || {}; // params olabilir veya olmayabilir, güvenlik için boş obje
  const [isChecked, setCheck] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    data.map(_d => {
      let hasKey = false;
      if (_d.type === 'input') {
        const inputField = {
          key: _d.name,
          isRegistered: true,
          value: null,
          title: _d.title,
        };
        inputList.map(i => i.key === _d.name && (hasKey = true));
        !hasKey && inputList.push(inputField);
      } else if (_d.type === 'selectbox') {
        const selectedField = {
          key: _d.name,
          value: null,
          title: _d.title,
        };
        selectedList.map(s => s.key === _d.name && (hasKey = true));
        !hasKey && selectedList.push(selectedField);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const showError = err => {
    Alert.alert('Hata', err.title + ' boş bırakılamaz', [{ text: 'Tamam' }]);
  };
  const onChange = (key, { value }) => {
    selectedList.map((s, idx) => {
      if (s.key === key) {
        selectedList[idx].value = value;
      }
    });
  };
  const handleOnChange = (key, _value) => {
    inputList.map((s, idx) => {
      if (s.key === key) {
        s.value = _value;
      }
      return s;
    });
  };

  const _continue = () => {
    const inputListRequiredTrue = _.remove([...inputList], function (n) {
      return n.isRequired === true;
    });

    const inputValidation = validationControl(inputListRequiredTrue);
    if (inputValidation) {
      const selectValidation = validationControl(selectedList);
      if (selectValidation) {
        dispatch(setDetail_action({ detail: [...inputList, ...selectedList] }));
        navigation.navigate('IlanFotografYukle');
      }
    }
  };
  const validationControl = list => {
    let isContinue = true;
    let inputControl = null;
    list.map(i => {
      if (!i.value && isContinue) {
        isContinue = false;
        inputControl = i;
      }
    });
    if (inputControl) {
      showError(inputControl);
      return false;
    }
    return true;
  };
  return (
    <SafeAreaView>
      <Header
        title="İlan detaylarını giriniz."
        subTitle="Ücretsiz İlan ver"
        subStyle={{ textAlign: 'center', margin: 0, padding: 0 }}
        titleStyle={{ textAlign: 'center', margin: 0, padding: 0 }}
        styleCenter={{ marginBottom: 0, paddingBottom: 0 }}
        renderLeft={() => (
          <VIcon name="angle-left" size={18} color={BaseColor.primaryColor} />
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return (
            <Icon name="home" size={25} color={BaseColor.primaryColor} />
          );
        }}
        onPressRight={() => {
          // navigation.navigate('Home');
          navigation.navigate('BottomTabNavigator', {
            screen: 'Home' // Drawer içindeki Home screen'ine direkt git
          })
        }}
      />

      <KeyboardAwareScrollView style={{ flex: 2 }}>
        <Block margin={[20, 20, 0, 20]} row wrap center>
          <Block row center>
            <Switch value={isChecked} setValue={val => setCheck(val)} />
            <Txt style={styles.topContentText}>
              Aracıma güveniyorum, ekspertiz talep edilirse aracımı Garantili
              Arabam bayilerine götürürüm.
            </Txt>
          </Block>
        </Block>
        {isChecked === 1 && (
          <Block
            margin={[0, 15]}
            padding={[12, 0]}
            space="around"
            style={styles.block}>
            <View style={styles.helpWrapper}>
              <Txt style={styles.label}>Plaka</Txt>

              <Icon
                name="help-circle"
                color={BaseColor.primaryColor}
                type="feather"
                size={24}
                onPress={toggleOverlay}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Plaka Giriniz"
              onChange={({ nativeEvent }) =>
                handleOnChange('plaka', nativeEvent.text)
              }
            />
          </Block>
        )}

        <Block
          margin={[0, 15]}
          padding={[12, 0]}
          space="around"
          style={styles.block}>
          <Txt style={styles.label}>İlan Başlığı</Txt>
          <TextInput
            style={styles.input}
            placeholder="Başlık Giriniz"
            onChange={({ nativeEvent }) =>
              handleOnChange('title', nativeEvent.text)
            }
          />
        </Block>
        <Block
          margin={[0, 15]}
          padding={[12, 0]}
          space="between"
          style={styles.block}>
          <Txt style={styles.label}>Açıklama</Txt>
          <TextInput
            placeholder="Açıklama Giriniz"
            multiline={true}
            style={styles.input}
            numberOfLines={10}
            onChange={({ nativeEvent }) =>
              handleOnChange('description', nativeEvent.text)
            }
          />
        </Block>
        <Block
          margin={[0, 15]}
          padding={[12, 0]}
          space="between"
          style={styles.block}>
          <Txt style={styles.label}>
            İsteğe Bağlı{' '}
            <Txt style={{ color: BaseColor.primaryColor }}>Garantili Arabam</Txt>{' '}
            Kısa Link
          </Txt>
          <TextInput
            style={styles.input}
            placeholder="link"
            onChange={({ nativeEvent }) =>
              handleOnChange('link', nativeEvent.text)
            }
          />
        </Block>
        <Block
          margin={[0, 15]}
          padding={[12, 0]}
          space="between"
          style={styles.block}>
          <Txt style={styles.label}>Fiyat</Txt>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            onChange={({ nativeEvent }) =>
              handleOnChange('price', nativeEvent.text)
            }
          />
        </Block>

        <Block
          margin={[0, 15]}
          padding={[12, 0]}
          space="between"
          style={styles.block}>
          <Txt>KM</Txt>
          <TextInput
            style={styles.input}
            placeholder="KM Giriniz"
            keyboardType="numeric"
            onChange={({ nativeEvent }) => handleOnChange('km', nativeEvent.text)}
          />
        </Block>
        {staticData.map(s => (
          <SelectPicker
            key={s.key}
            title={s.title}
            rightTitle={s.default}
            onChange={_index => onChange(s.key, s.options[_index])}
            list={s.options}
          />
        ))}
        {data.map(d =>
          d.type === 'selectbox' ? (
            <SelectPicker
              key={d.name}
              title={d.title}
              rightTitle={'Seciniz'}
              onChange={_index => onChange(d.name, d.options[_index])}
              list={d.options}
              textKey="text"
            />
          ) : (
            <Block
              key={d.name}
              margin={[0, 15]}
              padding={[12, 0]}
              space="between"
              style={styles.block}>
              <Txt>{d.title}</Txt>
              <TextInput
                style={styles.input}
                placeholder={d.title + ' Giriniz'}
                keyboardType={d.keyboardType || 'default'}
                onChange={({ nativeEvent }) =>
                  handleOnChange(d.name, nativeEvent.text)
                }
              />
            </Block>
          ),
        )}
      </KeyboardAwareScrollView>
      <Block margin={[10, 20]} flex={false}>
        <Block margin={[10, 0]} row space="between" flex={false}>
          <StepProgress step={1} />
          <Button onPress={_continue}>Devam Et</Button>
        </Block>
      </Block>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        style={{ padding: 10 }}>
        <Block flex={false} center>
          <Icon
            reverse
            raised={true}
            name="info"
            type="font-awesome"
            color={BaseColor.primaryColor}
            onPress={() => { }}
          />
          <Txt style={{ fontSize: normalize(14), paddingVertical: 10 }}>
            Olası ekspertiz taleplerinde, aracınız ile ilgili bilgiyi bayimize
            gönderebilmemiz için plakanızı girmeniz gerekmektedir. Doğum yılınız
            TC Kimlik Numaranızı onaylamak için ve TC Kimlik Numaranız ise yine
            ekspertiz işlemleri için kullanılacaktır.{'\n'} GarantiliArabam.com
            üyeleri ile paylaşılmayacaktır. Plakanızı sadece Garantili Arabam
            yetkilileri görüntüleyecek, ilanınızı inceleyen kullanıcılar
            görüntüleyemeyecektir.
          </Txt>
        </Block>
      </Overlay>
    </SafeAreaView>
  );
}
