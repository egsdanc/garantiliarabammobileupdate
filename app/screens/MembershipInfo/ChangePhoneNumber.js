import React, {useState, useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Container, Button} from '@components';
import {BaseStyle, BaseColor} from '@config';
import {Input} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {
  changePhone_action,
  confirmChangePhone_action,
} from '@state/ducks/changePhoneNumber';
import {Block} from '../../commonComponents';
import {changePhoneReducer_action} from '@state/ducks/checkToken';

function TelefonDegistirme({navigation, screenProps}) {
  const phoneNumber = useSelector(
    state => state.checkToken?.data?.user?.cellphoneNumberINT,
  );
  const {loader, confirmLoader} = useSelector(state => state.changePhoneNumber);
  const [phone, setPhone] = useState(phoneNumber);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [editable, setEditable] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const dispatch = useDispatch();
  /** action */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setPhonePersonalInfo = useCallback(data =>
    dispatch(
      changePhoneReducer_action(data),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dispatch],
    ),
  );
  const onChange = () => {
    dispatch(
      changePhone_action(
        {phone},
        () => {
          setConfirmModal(true);
        },
        res => setError(res?.message || 'Beklenmedik Hata Oluştu.'),
      ),
    );
  };
  const onConfirm = () => {
    if (code.length > 3) {
      dispatch(
        confirmChangePhone_action(
          {phone, code},
          res => {
            setConfirmModal(false);
            setError('');
            screenProps.openModalSuccess({
              body: () => (
                <Block p4 m4>
                  <Text center middle>
                    {res?.message || res || 'Başarıyla güncellendi.'}
                  </Text>
                </Block>
              ),
              onClose: () => {
                setEditable(false);
                setPhonePersonalInfo(phone);
              },
            });
          },
          res => setError(res?.message || 'Beklenmedik Hata Oluştu.'),
        ),
      );
    } else {
      setError('Doğrulanamadı. ');
    }
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Cep Telefonu"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <Container>
        <Text body1>
          Numaranızın yayınlanmasını istediğiniz ilanlarınızda ve diğer
          kullanıcılara gönderdiğiniz mesajlarda cep telefonunuz
          gösterilecektir.
        </Text>
      </Container>
      <Input
        label={'Kayıtlı cep telefonu numaranız: '}
        autoCorrect={false}
        placeholderTextColor={BaseColor.grayColor}
        labelStyle={styles.inputLabel}
        inputStyle={[
          styles.input,
          {
            color: editable ? '#000' : BaseColor.grayColor,
          },
        ]}
        placeholder="Cep Telefonu"
        inputContainerStyle={BaseStyle.textInput}
        editable={editable}
        selectionColor={BaseColor.primaryColor}
        rightIcon={{
          type: 'font-awesome',
          name: 'edit',
          color: BaseColor.primaryColor,
          onPress: () => {
            setEditable(!editable);
          },
        }}
        value={phone}
        onChangeText={value => setPhone(value)}
      />
      <View style={styles.textWrapper}>
        <Text body1 primaryColor>
          {error}
        </Text>
      </View>

      <View style={styles.btnWrapper}>
        <Button full loading={loader} onPress={onChange}>
          Değiştir
        </Button>
      </View>
      {confirmModal && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setConfirmModal(false)}
          style={styles.modal}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.modalContent}>
            <Input
              label={
                'Cep telefonunuza değişiklik için onay kodu gönderilmiştir..'
              }
              autoCorrect={false}
              placeholderTextColor={BaseColor.grayColor}
              labelStyle={styles.inputLabel}
              placeholder="Onay Kodu "
              inputContainerStyle={BaseStyle.textInput}
              selectionColor={BaseColor.primaryColor}
              value={code}
              onChangeText={value => setCode(value)}
            />
            <View style={styles.textWrapper}>
              <Text body1 primaryColor>
                {error}
              </Text>
            </View>
            <View style={styles.modalBtn}>
              <Button loading={confirmLoader} full onPress={onConfirm}>
                Dogrula
              </Button>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

export default TelefonDegistirme;

const styles = StyleSheet.create({
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
  modal: {
    position: 'absolute',
    zIndex: 100,
    elevation: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 250,
    paddingHorizontal: 20,
  },
  textWrapper: {
    paddingHorizontal: 15,
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: BaseColor.whiteColor,
  },
});
