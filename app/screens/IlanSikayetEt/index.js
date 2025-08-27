import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, TextInput} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import styles from './styles';
import {
  ilanSikayetEt_action,
  dismissIlanSikayetEtError_action,
} from '@state/ducks/ilanSikayetEt';
import {CheckBox} from 'react-native-elements';
import {Block} from '../../commonComponents';

const IlanSikayetEt = ({navigation, screenProps}) => {
  const [reason_text, setReasonText] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const resolve = useCallback(
    res => {
      setLoading(false);
      screenProps.openModalSuccess({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {'Şikayetiniz başarıyla oluşturuldu.'}
            </Text>
          </Block>
        ),
        onClose: () => {
          navigation.goBack();
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  const reject = useCallback(
    res => {
      setLoading(false);
      screenProps.openModalError({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || res || 'Beklenmedik Hata Oluştu'}
            </Text>
          </Block>
        ),
        onClose: () => {
          dispatch(dismissIlanSikayetEtError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );

  /** action */
  const sendRequest = useCallback(
    data => dispatch(ilanSikayetEt_action(data, resolve, reject)),
    [dispatch, reject, resolve],
  );
  const onSubmit = () => {
    let errorMessage =
      reason === ''
        ? 'Şikayet nedeninizi seçiniz.'
        : reason === '4' && reason_text === ''
        ? 'Lütfen şikayet nedeninizi belirtiniz.'
        : '';
    if (errorMessage === '') {
      setLoading(true);
      sendRequest({
        reason_index: reason,
        reason_text,
      });
    } else {
      screenProps.openModalError({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {errorMessage}
            </Text>
          </Block>
        ),
        onClose: () => {},
      });
    }
  };
  return (
    <SafeAreaView
      style={{...BaseStyle.safeAreaView, backgroundColor: 'rgb(246,246,246)'}}
      forceInset={{top: 'always'}}>
      <Header
        title="Ilan Şikayet Et"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.content}>
        <Text headline semibold style={styles.labelText}>
          Lütfen şikayet nedeninizi belirtiniz
        </Text>
        <View>
          <CheckBox
            containerStyle={[
              styles.checkBox,
              reason === '0' ? styles.checked : {},
            ]}
            textStyle={reason === '0' ? styles.checkedText : {}}
            title="İlanda belirtilen araç satılmış ya da kiralanmış"
            checked={reason === '0'}
            checkedColor="#d92b2b"
            onPress={() => {
              reason === '0' ? setReason('') : setReason('0');
            }}
          />
          <CheckBox
            containerStyle={[
              styles.checkBox,
              reason === '1' ? styles.checked : {},
            ]}
            textStyle={reason === '1' ? styles.checkedText : {}}
            title="İlan kategorisi hatalı "
            checked={reason === '1'}
            checkedColor="#d92b2b"
            onPress={() => {
              reason === '1' ? setReason('') : setReason('1');
            }}
          />
          <CheckBox
            containerStyle={[
              styles.checkBox,
              reason === '2' ? styles.checked : {},
            ]}
            textStyle={reason === '2' ? styles.checkedText : {}}
            title="İlan bilgileri hatalı veya yanlış "
            checked={reason === '2'}
            checkedColor="#d92b2b"
            onPress={() => {
              reason === '2' ? setReason('') : setReason('2');
            }}
          />
          <CheckBox
            containerStyle={[
              styles.checkBox,
              reason === '3' ? styles.checked : {},
            ]}
            textStyle={reason === '3' ? styles.checkedText : {}}
            title="İlan birden fazla kere yayımlanmış "
            checked={reason === '3'}
            checkedColor="#d92b2b"
            onPress={() => {
              reason === '3' ? setReason('') : setReason('3');
            }}
          />
          <CheckBox
            containerStyle={[
              styles.checkBox,
              reason === '4' ? styles.checked : {},
            ]}
            textStyle={reason === '4' ? styles.checkedText : {}}
            title="Diğer nedenler"
            checked={reason === '4'}
            checkedColor="#d92b2b"
            onPress={() => {
              reason === '4' ? setReason('') : setReason('4');
            }}
          />
        </View>
        {reason === '4' ? (
          <TextInput
            style={styles.input}
            onChangeText={value => setReasonText(value)}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Şikayetinizi burada belirtebilirsiniz. Max 500 karakter"
            multiline={true}
            placeholderTextColor={BaseColor.grayColor}
            value={reason_text}
            selectionColor={BaseColor.primaryColor}
          />
        ) : null}

        <View style={styles.btnContainer}>
          <Button onPress={onSubmit} style={{width: '100%'}} loading={loading}>
            Gönder
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IlanSikayetEt;
