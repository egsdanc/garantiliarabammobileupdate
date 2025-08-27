import React, {useEffect, useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Switch} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Container,
  Button,
  KeyboardAwareScrollView,
} from '@components';
import {BaseStyle, BaseColor} from '@config';
import {Input, Avatar, ListItem} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {styles} from './style';
import {Block} from '../../commonComponents';
import {
  getPersonalInfo_action,
  postPersonalInfo_action,
  dismissPersonalInfoError_action,
} from '@state/ducks/personalInfo';
import RNPickerSelect from 'react-native-picker-select';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';

const PersonalInfo = ({navigation, screenProps}) => {
  //name, surname, age, birthDate, gender
  const [userInfo, setUserInfo] = useState({
    username: '',
    name: '',
    surname: '',
    birthDate: new Date(),
    gender: '',
  });
  const resolve = useCallback(res => {
    setUserInfo({
      ...res.user,
      hobbies: res?.user?.hobbies?.split(','),
    });
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
  const postResolve = useCallback(
    res => {
      screenProps.openModalSuccess({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || 'Bilgileriniz başarıyla günncellendi.'}
            </Text>
          </Block>
        ),
        onClose: () => {
          dispatch(dismissPersonalInfoError_action());
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  const postReject = useCallback(
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
          //navigation.goBack();
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  const {postLoader, options} = useSelector(state => state.personalInfo);
  const dispatch = useDispatch();
  /** action */
  const getPersonalInfo = useCallback(
    () => dispatch(getPersonalInfo_action(null, resolve, reject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  /** action */
  const postPersonalInfo = useCallback(
    data => dispatch(postPersonalInfo_action(data, postResolve, postReject)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  /** didmount */
  useEffect(() => {
    getPersonalInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Kişisel Bilgiler"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.avatarWrapper}>
          <Avatar
            rounded
            size={'large'}
            title="MD"
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
        </View>

        <Input
          label={'Kullanıcı Adı	'}
          autoCorrect={false}
          placeholderTextColor={BaseColor.grayColor}
          labelStyle={styles.inputLabel}
          inputStyle={styles.input}
          placeholder="Kullanıcı Adınız "
          inputContainerStyle={BaseStyle.textInput}
          selectionColor={BaseColor.primaryColor}
          value={userInfo.username}
          onChangeText={value => setUserInfo({...userInfo, username: value})}
        />
        <Input
          label={'Ad'}
          autoCorrect={false}
          placeholderTextColor={BaseColor.grayColor}
          labelStyle={styles.inputLabel}
          inputStyle={styles.input}
          placeholder="Ad "
          inputContainerStyle={BaseStyle.textInput}
          selectionColor={BaseColor.primaryColor}
          value={userInfo.name}
          onChangeText={value => setUserInfo({...userInfo, name: value})}
        />
        <Input
          label={'Soyadınız'}
          autoCorrect={false}
          placeholderTextColor={BaseColor.grayColor}
          labelStyle={styles.inputLabel}
          inputStyle={styles.input}
          placeholder="Soyadınız "
          inputContainerStyle={BaseStyle.textInput}
          selectionColor={BaseColor.primaryColor}
          value={userInfo.surname}
          onChangeText={value => setUserInfo({...userInfo, surname: value})}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={value => {
            setUserInfo({
              ...userInfo,
              birthDate: moment(value).format('DD.MM.YYYY'),
            });
            setIsDatePickerVisible(false);
          }}
          onCancel={() => setIsDatePickerVisible(false)}
          cancelTextIOS="Vazgec"
          date={
            new Date(moment(userInfo?.birthDate, 'DD.MM.YYYY').format()) ||
            new Date()
          }
          maximumDate={new Date()}
          confirmTextIOS="Onayla"
          headerTextIOS="Doğum Tarihi	seçiniz "
          locale="tr_TR" // Use "en_GB" here
        />

        <ListItem
          title={<Text body1>{'Doğum Günü'}</Text>}
          onPress={() => setIsDatePickerVisible(true)}
          chevron={
            <Icon name="angle-right" size={18} color={BaseColor.primaryColor} />
          }
          rightTitle={
            userInfo?.birthDate
              ? moment(userInfo?.birthDate, 'DD.MM.YYYY').format('DD.MM.YYYY')
              : ''
          }
        />
        <View style={{marginHorizontal: 10, marginBottom: 20, marginTop: 10}}>
          <Text body1>{'Cinsiyet'}</Text>
          <RNPickerSelect
            doneText="Seç"
            onValueChange={value => setUserInfo({...userInfo, gender: value})}
            items={options.genders}
            value={userInfo.gender}
            placeholder={{label: 'Cinsiyetinizi Seçiniz', value: null}}
            style={{
              inputIOSContainer: {
                ...BaseStyle.textInput,
                fontSize: 14,
                fontWeight: '200',
              },
              inputAndroidContainer: {
                ...BaseStyle.textInput,
                fontSize: 14,
                fontWeight: '200',
              },
            }}
          />
        </View>
        <View style={{marginHorizontal: 10, marginBottom: 20}}>
          <Text body1>{'Medeni Hal'}</Text>
          <RNPickerSelect
            doneText="Seç"
            onValueChange={value =>
              setUserInfo({...userInfo, maritalStatus: value})
            }
            items={options.maritalStatus}
            value={userInfo.maritalStatus}
            placeholder={{label: 'Medeni Halinizi Seçiniz', value: null}}
            style={{
              inputIOSContainer: {
                ...BaseStyle.textInput,
                fontSize: 14,
                fontWeight: '200',
              },
              inputAndroidContainer: {
                ...BaseStyle.textInput,
                fontSize: 14,
                fontWeight: '200',
              },
            }}
          />
        </View>
        <View style={{marginHorizontal: 10, marginBottom: 20}}>
          <Text body1>{'Meslek'}</Text>
          <RNPickerSelect
            doneText="Seç"
            onValueChange={value => setUserInfo({...userInfo, job: value})}
            items={options.job}
            value={userInfo.job}
            placeholder={{label: 'Mesleğinizi Seçiniz', value: null}}
            style={{
              inputIOSContainer: {
                ...BaseStyle.textInput,
                fontSize: 14,
                fontWeight: '200',
              },
              inputAndroidContainer: {
                ...BaseStyle.textInput,
                fontSize: 14,
                fontWeight: '200',
              },
            }}
          />
        </View>
        <View style={{marginHorizontal: 10, marginBottom: 20}}>
          <Text body1>{'Eğitim Durumu'}</Text>
          <RNPickerSelect
            doneText="Seç"
            onValueChange={value =>
              setUserInfo({...userInfo, education: value})
            }
            items={options.education}
            value={userInfo.education}
            placeholder={{label: 'Eğitim Durumunuzu Seçiniz', value: null}}
            style={{
              inputIOSContainer: {
                ...BaseStyle.textInput,
                fontSize: 14,
                fontWeight: '200',
              },
              inputAndroidContainer: {
                ...BaseStyle.textInput,
                fontSize: 14,
                fontWeight: '200',
              },
            }}
          />
        </View>
        <ListItem title={<Text body1>{'Ilgi Alanlari'}</Text>} />
        <View style={styles.switchWrapper}>
          {options.hobbies.map((item, index) => (
            <View key={item.value} style={styles.switchContent}>
              <Switch
                trackColor={{
                  false: BaseColor.grayColor,
                  true: BaseColor.primaryColor,
                }}
                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                thumbColor={'#fff'}
                ios_backgroundColor={BaseColor.fieldColor}
                onValueChange={() => {
                  let hobbies = userInfo.hobbies || [];
                  if (userInfo?.hobbies?.includes(item.value)) {
                    hobbies = hobbies.filter(i => i !== item.value);
                  } else {
                    hobbies?.push(item.value);
                  }
                  setUserInfo({...userInfo, hobbies});
                }}
                value={userInfo?.hobbies?.includes(item.value)}
              />
              <Text style={styles.switch} footnote>
                {item.text}
              </Text>
            </View>
          ))}
        </View>
        <Input
          label={'Ev Telefonu	'}
          autoCorrect={false}
          placeholderTextColor={BaseColor.grayColor}
          labelStyle={styles.inputLabel}
          inputStyle={styles.input}
          placeholder=""
          inputContainerStyle={BaseStyle.textInput}
          selectionColor={BaseColor.primaryColor}
          value={userInfo.officePhone}
          onChangeText={value => setUserInfo({...userInfo, homePhone: value})}
        />
        <Input
          label={'İş Telefonu'}
          autoCorrect={false}
          placeholderTextColor={BaseColor.grayColor}
          labelStyle={styles.inputLabel}
          inputStyle={styles.input}
          placeholder=""
          inputContainerStyle={BaseStyle.textInput}
          selectionColor={BaseColor.primaryColor}
          value={userInfo.officePhone}
          onChangeText={value => setUserInfo({...userInfo, officePhone: value})}
        />
      </KeyboardAwareScrollView>
      <Container>
        <Button
          loading={postLoader}
          full
          onPress={() => {
            postPersonalInfo(userInfo);
          }}>
          Kaydet
        </Button>
      </Container>
    </SafeAreaView>
  );
};

export default compose(
  withProps(() => {
    const {loader} = useSelector(state => state.personalInfo);
    return {
      loading: loader,
    };
  }),
  withLoadingScreen({}),
)(PersonalInfo);
