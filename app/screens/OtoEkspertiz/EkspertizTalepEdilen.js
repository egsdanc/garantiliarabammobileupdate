import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Container} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';
import {Card} from 'react-native-elements';
export default class EkspertizTalepEdilen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={BaseStyle.safeAreaView}>
        <Header
          title="Yayında Olmayan İlanlar"
          renderLeft={() => {
            return (
              <Icon
                name="arrow-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <Container>
          <Card>
            <Text body1>
              Bu listede oluşturduğunuz fakat henüz yayında olmayan veya
              Garantili Arabam yöneticileri tarafından uygunsuz bulunduğu için
              kaldırılan ilanlarınız listelenmektedir. Kendi kaldırdığınız
              ilanları Kaldırdığım İlanlar sayfasından görüntüleyebilir veya
              tekrar yayına alabilirsiniz.
            </Text>
          </Card>
          <Text body1>Herhangi bir ilanı engellemediniz..</Text>
        </Container>
      </SafeAreaView>
    );
  }
}
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
