import React from 'react';
import {ScrollView, TextInput} from 'react-native';
import {BaseColor} from '@config';
import {Header} from '@components';
import {
  Block,
  Button,
  Icon,
  Text as Txt,
  SafeAreaView,
  StepProgress,
  XForm,
  ErrorLabel,
} from '@common';
import {ListItem} from 'react-native-elements';

import {compose, withLoadingScreen, withMask} from '@hocs';
const MaskedTextInput = withMask()(TextInput);

/** Page Component */
export class Iletisim extends XForm {
  getErrorFor = key => ({
    error: this.state.errors[key] && 'Zorunlu alan',
    py0: true,
    right: true,
    mx4: true,
    px4: true,
  });
  onCheckPress = type => () => {
    this._onChangeCore('type')(type);
  };
  devam = () => {
    this.props.navigation.navigate('Paket');
  };
  render() {
    let {navigation} = this.props;
    return (
      <SafeAreaView>
        <Header
          title="Ücretsiz İlan ver"
          subTitle="Galeriden Fotograf Yükleyin Yada Fotgraf Çekín"
          subStyle={{textAlign: 'center', margin: 0, padding: 0}}
          titleStyle={{
            textAlign: 'center',
            margin: 0,
            padding: 0,
          }}
          styleCenter={{marginBottom: 0, paddingBottom: 0}}
          renderLeft={() => (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          )}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView style={{flex: 2}}>
          <ListItem
            title={
              <Txt bold>
                İletişim Bilgileri <Txt primaryColor>*</Txt>
              </Txt>
            }
            bottomDivider
          />

          <Block
            row
            margin={[5, 10]}
            middle
            space="between"
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: 'grey',
            }}>
            <Block middle>
              <Txt>Ad Soyadı</Txt>
            </Block>
            <TextInput
              {...this.bindTextInput('name', {required: true})}
              style={{padding: 0, margin: 0, height: 50}}
              placeholder="Selma Sahir"
            />
          </Block>
          <ErrorLabel {...this.getErrorFor('name')} />
          <Block
            row
            margin={[5, 10]}
            middle
            space="between"
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: 'grey',
            }}>
            <Block middle>
              <Txt>İş Telefonu</Txt>
            </Block>
            <MaskedTextInput
              {...this.bindTextInput('tel', {required: true})}
              style={{padding: 0, margin: 0, height: 50}}
              mask="+99-999-9999999"
              placeholder="+90-850-840010"
            />
          </Block>
          <ErrorLabel {...this.getErrorFor('tel')} />
          <Block
            row
            margin={[5, 10]}
            middle
            space="between"
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: 'grey',
            }}>
            <Block middle>
              <Txt>Cep Telefonu</Txt>
            </Block>
            <MaskedTextInput
              {...this.bindTextInput('gsm', {required: true})}
              style={{padding: 0, margin: 0, height: 50}}
              mask="+99-999-9999999"
              placeholder="+90-553-6062470"
            />
          </Block>
          <ErrorLabel {...this.getErrorFor('gsm')} />
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
            onPress={this.onCheckPress('m')}
            rightIcon={{
              name:
                this.state.values.type === 'm'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked',
              type: 'MaterialIcons',
              color: BaseColor.primaryColor,
            }}
          />
          <ListItem
            onPress={this.onCheckPress('t')}
            title="Telefon"
            bottomDivider
            rightIcon={{
              name:
                this.state.values.type === 't'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked',
              type: 'MaterialIcons',
              color: BaseColor.primaryColor,
            }}
          />
          <ListItem
            title="Telefon ve Mesaj"
            onPress={this.onCheckPress('tm')}
            bottomDivider
            rightIcon={{
              name:
                this.state.values.type === 'tm'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked',
              type: 'MaterialIcons',
              color: BaseColor.primaryColor,
            }}
          />
        </ScrollView>
        <Block margin={[10, 20]} row space="between" flex={false}>
          <StepProgress step={4} />
          <Button {...this.bindOnSubmitButton('devam')}>Devam Et</Button>
        </Block>
      </SafeAreaView>
    );
  }
}
export default compose(withLoadingScreen({}))(Iletisim);
