import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { BaseColor } from '@config';
import { Header } from '@components';
import {
  Block,
  Button,
  Icon,
  Text as Txt,
  SafeAreaView,
  StepProgress
} from '@common';
import {
  getPersonalInfo_action,
  dismissPersonalInfoError_action,
} from '@state/ducks/personalInfo';
import { checkToken_action } from '@state/ducks/checkToken';
import { compose, withLoadingScreen, withProps } from '@hocs';
import { Alert } from 'react-native';

/** Page Component */
const Iletisim = ({ navigation, screenProps }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [type, setType] = useState("");
  const resolve = useCallback(res => {
    setUserInfo(res.user);
  }, []);
  const reject = useCallback(
    res => {
      screenProps.openModalError({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || 'Beklenmedik Hata Oluştu'}
            </Text>
          </Block>
        ),
        onClose: () => {
          dispatch(dismissPersonalInfoError_action());
          navigation.goBack();
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  /** action */
  const getPersonalInfo = useCallback(
    () => dispatch(checkToken_action({ resolve, reject })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  const onChangeType = useCallback(nType => {
    if ((nType === "tm" || nType === "t") && userInfo.cellphoneNumberINT === null) {
      Alert.alert(
        "Telefonunuz henüz eklenmedi",
        '',
        [
          {
            text: "Ekle",
            onPress: () => {
              navigation.navigate("ChangePhoneNumber");
            }
          },
          {
            text: "İptal",
            onPress: () => { },
            style: "cancel"
          }
        ]
      );
    } else {
      setType(nType)
    }
  }, [userInfo])

  const onSubmit = useCallback(() => {
    if(type!==""){
      navigation.navigate('IlanOzellikler');
    }else{
      Alert.alert('Hata', "İletişim yolunu seçiniz", [{text: 'Tamam'}]);
    }
  },[type])

  useEffect(() => {
    getPersonalInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView>
      <Header
        title="Ücretsiz İlan ver"
        subTitle="İletişim Bilgileri"
        subStyle={{ textAlign: 'center', margin: 0, padding: 0 }}
        titleStyle={{
          textAlign: 'center',
          margin: 0,
          padding: 0,
        }}
        styleCenter={{ marginBottom: 0, paddingBottom: 0 }}
        renderLeft={() => (
          <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={{ flex: 2 }}>
        <ListItem
          title={
            <Txt bold>
              İletişim Seçenekleri <Txt primaryColor>*</Txt>
            </Txt>
          }
          bottomDivider
          rightIcon={{
            name: 'questioncircle',
            type: 'antdesign',
          }}
        />
        <ListItem
          title="Mesaj"
          bottomDivider
          onPress={() => onChangeType('m')}
          rightIcon={{
            name: type === 'm'
              ? 'radio-button-checked'
              : 'radio-button-unchecked',
            type: 'MaterialIcons',
            color: BaseColor.primaryColor,
          }}
        />
        <ListItem
          onPress={() => onChangeType('t')}
          title="Telefon"
          bottomDivider
          rightIcon={{
            name: type === 't'
              ? 'radio-button-checked'
              : 'radio-button-unchecked',
            type: 'MaterialIcons',
            color: BaseColor.primaryColor,
          }}
        />
        <ListItem
          title="Telefon ve Mesaj"
          onPress={() => onChangeType('tm')}
          bottomDivider
          rightIcon={{
            name: type === 'tm'
              ? 'radio-button-checked'
              : 'radio-button-unchecked',
            type: 'MaterialIcons',
            color: BaseColor.primaryColor,
          }}
        />
      </ScrollView>
      <Block margin={[10, 20]} row space="between" flex={false}>
        <StepProgress step={4} />
        <Button onPress={onSubmit}>Devam Et</Button>
      </Block>
    </SafeAreaView>
  );
}

export default compose(
  withProps(() => {
    const { loader } = useSelector(state => state.checkToken);
    return {
      loading: loader,
    };
  }),
  withLoadingScreen({}),
  React.forwardRef,
)(Iletisim);
