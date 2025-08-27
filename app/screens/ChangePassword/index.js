import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert, View, ScrollView, TextInput} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import styles from './styles';
import {
  changePassword_action,
  dismissChangePasswordError_action,
} from '@state/ducks/changePassword';

export default function ChangePassword({navigation}) {
  const {message, error, loader} = useSelector(state => state.changePassword);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [stateError, setError] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      Alert.alert(
        message,
        '',
        [
          {
            text: 'Tamam',
            onPress: () => {
              dispatch(dismissChangePasswordError_action());
              navigation.goBack();
            },
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  }, [message, navigation, dispatch]);

  const onChange = () => {
    setError('');
    if (currentPassword && newPassword && rePassword) {
      if (newPassword !== rePassword) {
        setError('Girdiğiniz şifre bilgileri eşleşmiyor');
      } else {
        const payload = {
          newPassword,
          currentPassword,
        };
        dispatch(changePassword_action(payload));
      }
    } else {
      setError('Şifrenizi değiştirmek için mevcut ve yeni şifrenizi girin.');
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title="Şifreyi Değiştir"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          dispatch(dismissChangePasswordError_action());
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.contain}>
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Mevcut Şifre
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => setCurrentPassword(text)}
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="Mevcut Şifre	"
            placeholderTextColor={BaseColor.grayColor}
            value={currentPassword}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Yeni Şifre
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => setNewPassword(text)}
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="Yeni Şifre	"
            placeholderTextColor={BaseColor.grayColor}
            value={newPassword}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Yeni Şifre (Tekrar)
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => setRePassword(text)}
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="Yeni Şifre (Tekrar)"
            placeholderTextColor={BaseColor.grayColor}
            value={rePassword}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={styles.textWrapper}>
            <Text body1 primaryColor>
              {stateError || error}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={{padding: 20}}>
        <Button loading={loader} full onPress={onChange}>
          Kaydet
        </Button>
      </View>
    </SafeAreaView>
  );
}
