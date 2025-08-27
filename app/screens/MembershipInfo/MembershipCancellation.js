import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Container, Button} from '@components';
import {BaseStyle, BaseColor} from '@config';
export default class MembershipCancellation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={BaseStyle.safeAreaView}>
        <Header
          title="Üyelik İptali"
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
        <ScrollView>
          <Container>
            <Text headline> Üyeliğinizi iptal etmek istemenize üzüldük...</Text>
          </Container>
          <Container>
            <Text headline>
              Sizi garantiliarabam.com ailesinin bir üyesi olarak görmeye devam
              etmek istediğimiz için görüşleriniz bizim için çok değerli.
              Üyeliğiniz ile ilgili yaşadığınız bir sorun veya sormak
              istedikleriniz varsa bize
              <Text style={styles.colorRed} onPress={() => {}}>
                {' '}
                Destek Merkezi{' '}
              </Text>
              üzerinden ulaşabilirsiniz.
            </Text>
          </Container>
          <Container>
            <Text bold heavy>
              {' '}
              garantiliarabam.com üyeliğinizi iptal ederseniz;
            </Text>
          </Container>
          <Container>
            <Text body1>
              {' * '}
              Üyeliğiniz yeniden aktif hale getirilemeyecektir.
              {'\n'}
            </Text>

            <Text body1>
              {' * '}
              Yayında olan ilanlarınızın tamamı yayından kalkacaktır. {'\n'}
            </Text>
            <Text body1>
              {' * '}
              Cebinden Onaylı telefon numaranızı başka bir garantiliarabam.com
              üyeliğinize taşıyabilirsiniz.
              {'\n'}
            </Text>
            <Text body1>
              {' * '}
              E-posta adresinizin yeni bir üyelikte kullanılamayacağını da
              üzülerek hatırlatmak isteriz.
              {'\n'}
            </Text>
          </Container>
        </ScrollView>

        <View style={styles.btnWrapper}>
          <Button
            outline
            onPress={() =>
              navigation.navigate('ConfirmMembershipCancellation')
            }>
            Üyeliğimi İptal Etmek İstiyorum
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  colorRed: {color: 'red'},
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
});
