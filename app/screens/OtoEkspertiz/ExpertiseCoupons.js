import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Header, SafeAreaView, Icon, Text } from '@components';
import { BaseStyle, BaseColor } from '@config';
import { Card } from 'react-native-elements';

export default class ExpertiseCoupons extends PureComponent {
  constructor(props) {
    super(props);
    const { route } = this.props;
    this.title = route?.params?.title || '';
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView}>
        <Header
          title={this.title}
          renderLeft={() => (
            <Icon
              name="arrow-left"
              size={20}
              color={BaseColor.primaryColor}
            />
          )}
          onPressLeft={() => navigation.goBack()}
        />
        <ScrollView>
          <Card title="Sistem Nasıl Çalışır?">
            <Text body2>
              Garantili Arabam Online Güvencesiyle Ekspertiz Sonuçları
              Cebinizde.
            </Text>
          </Card>
          <Card title="RANDEVU" titleStyle={styles.colorRed}>
            <Text body1 bold>
              Siz Bulun, Biz Rapor Edelim{'\n'}
            </Text>
            <Text body1>
              Yeni ve uygun fiyatlı bir araç bulduğunda; il dışında olup ya da
              iş yerinden izin alamadığın durumlarda panik yapmana gerek yok.
              Garantili Online ekibi ile çalışarak bu durumu kolaylıkla
              çözebilirsin. Aracını bul, online oto ekspertiz raporu randevusu
              al ve süreci hemen başlat. Ekibimiz sistemden otomatik görmekte.
            </Text>
          </Card>
          <Card title="TESPİT" titleStyle={styles.colorRed}>
            <Text body2 bold>
              Kalite, Güven ve Teknolojinin bulunduğu Tek adres{'\n'}
            </Text>
            <Text body2>
              Online randevu formu ile oluşturduğunuz araç iletişim bilgilerini,
              merkez ekibimiz yönlendirmesi ile araç sahibinin bağlı bulunduğu
              bölgedeki oto ekspertiz uzman ekibimize iletilir. Ekip araç sahibi
              ile ön görüşmeyi sizlerin adına yapar ve tespit işlemleri
              bittikten sonra ekspertiz işlemine geçilir. Ekibimiz ekspertiz ile
              iletişime geçti!
            </Text>
          </Card>
          <Card title="İNCELEME" titleStyle={styles.colorRed}>
            <Text body2 bold>
              Hizmet Kalitesi Tescilli ve Uzaktan Erişim{'\n'}
            </Text>
            <Text body2>
              Ekibimiz sizlerin adına araç sahibi ile beraber, Franchise
              verdiğimiz bayilerimize getirir. Seçmiş olduğunuz oto ekspertiz
              paketi uygulamasına başladıktan sonra, aracın tüm tramer geçmişi,
              kaza raporları, çalıntı durumu, hasar bilgileri, borç ve diğer tüm
              kontroller sigorta acentelerimiz tarafından yapılır. Kontroller
              Tamam!
            </Text>
          </Card>
          <Card title="EKSPERTİZ" titleStyle={styles.colorRed}>
            <Text body2 bold>
              Akıllı Ekspertiz Raporu{'\n'}
            </Text>
            <Text body2>
              Uzman Araç Ekspertiz ekibimiz ile aracın tüm detayları seçtiğiniz
              paketler doğrultusunda en ince ayrıntısına kadar incelenir.
              Garantili Arabam ekibi bu süreci sizler için denetler ve rapor
              oluşturur. Kısacası aracın çakmaklığından, lastik basınç ve
              derinlik kontrollerine kadar en detaylı 505 Nokta Ekspertiz raporu
              sunar. Raporlar Hazır Cebinizde!
            </Text>
          </Card>
          <Card title="RAPORLAMA" titleStyle={styles.colorRed}>
            <Text body2>
              Tüm bu süreçler tamamlandıktan sonra 18 Sayfalık detaylı ekspertiz
              raporunuz ayrı ayrı sistem üzerinden otomatik olarak cebinize
              gelmektedir. Raporlara ek olarak aracın tüm ekspertiz anındaki
              resimleri; çizik, ezik, iç kısım, motor ve alt kontrollerin
              resimler ekte gönderilecektir. Raporlar Anınca Cep Telefonunuzda!
            </Text>
          </Card>
          <Card title="KAZANÇ" titleStyle={styles.colorRed}>
            <Text body2 bold>
              Zamanınız ve Yol Paranız Size Kalsın{'\n'}
            </Text>
            <Text body2>
              Türkiye'nin ilk online ekspertiz raporu projesi ile öncü olduğumuz
              raporlardan elde ettiğimiz veriler sonucu, araç sahiplerinin
              verdiği bilgiler %70 oranında yanlış ve eksik çıkmaktadır. Bu
              sebeple online rapor alan şanslı müşterilerimiz zamandan kazanarak
              servislerde saatlerce beklemek zorunda kalmamıştır. %99 Mutlu
              Müşteri!
            </Text>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  colorRed: { color: 'red' },
});
