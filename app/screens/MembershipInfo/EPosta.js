import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Container, Button} from '@components';
import {BaseStyle, BaseColor} from '@config';
import {Input} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {
  getEmail_action,
  changeEmail_action,
  dismissChangeEmailError_action,
} from '@state/ducks/changeEmail';
import {Block} from '../../commonComponents';
import {compose, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';

function EmailDegistirme({navigation, screenProps}) {
  const emailAddress = useSelector(state => state.changeEmail?.data?.email);
  const loader = useSelector(state => state.changeEmail?.loader);
  const [email, setEmail] = useState(emailAddress);
  const [vertification, setEmailVertification] = useState(0);
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const resolve = useCallback(
    res => {
      screenProps.openModalSuccess({
        body: () => (
          <Block p4 m4>
            <Text center middle>
              {res?.message || res || 'Başarıyla Güncellendi'}
            </Text>
          </Block>
        ),
        onClose: () => {
          setEditable(false);
          getEmail();
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
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
          dispatch(dismissChangeEmailError_action);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenProps],
  );
  /** get config action */
  const getEmail = useCallback(
    () =>
      dispatch(
        getEmail_action(res => {
          setEmail(res?.email);
          setEmailVertification(res?.email_verification);
        }, reject),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );
  /** */
  const handleUpdate = () => {
    const payload = {
      email,
    };
    if (email !== '' && email !== emailAddress) {
      dispatch(changeEmail_action(payload, resolve, reject));
    }
  };
  /** didmount */
  useEffect(() => {
    getEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="E Posta"
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
          İlanlarınız, favorileriniz ve mesajlarınız ile ilgili önemli
          e-posta’ların size ulaştığından emin olabilmek için lütfen güncel
          e-posta adresinizin kayıtlı olduğundan emin olun.
        </Text>
      </Container>
      <Input
        label={'Kayıtlı e-posta adresiniz: '}
        autoCorrect={false}
        placeholderTextColor={BaseColor.grayColor}
        labelStyle={styles.inputLabel}
        inputStyle={[
          styles.input,
          {
            color: editable ? '#000' : BaseColor.grayColor,
          },
        ]}
        autoCapitalize="none"
        placeholder="E posta  Adresiniz "
        inputContainerStyle={BaseStyle.textInput}
        editable={editable}
        selectionColor={BaseColor.primaryColor}
        rightIcon={{
          type: 'font-awesome',
          name: 'edit',
          color: BaseColor.primaryColor,
          onPress: () => {
            setEditable(true);
          },
        }}
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <Container>
        {vertification === 0 && emailAddress !== '' && (
          <Text body1 style={{color: 'red'}}>
            Bu E-Posta Adresi Onaylı Değil
            {'\n'}
          </Text>
        )}
        <Text body1>
          Mail adresinizi sistemden kaldırmak için
          <Text style={styles.colorRed} onPress={() => {}}>
            {' '}
            buraya tıklayınız
          </Text>
          . Mail adresinizi kaldırdıktan sonra üyeliğinize cep telefonu ile
          giriş yapabilirsiniz.
        </Text>
      </Container>
      <View style={styles.btnWrapper}>
        <Button full loading={loader} onPress={handleUpdate}>
          Değiştir
        </Button>
      </View>
    </SafeAreaView>
  );
}
export default compose(
  withProps(() => {
    const {getLoader} = useSelector(state => state.changeEmail);
    return {
      loading: getLoader,
    };
  }),
  withLoadingScreen({}),
)(EmailDegistirme);
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
  colorRed: {color: 'red'},
});
