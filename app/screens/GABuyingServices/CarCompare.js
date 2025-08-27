import React, { PureComponent } from 'react';
import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import { Header, SafeAreaView, Button, Icon, Text, Container } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { Card, ListItem } from 'react-native-elements';
import { Block } from '../../commonComponents';

export default class CarCompare extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ePosta: false,
      phone: true,
      sms: false,
    };
  }
  select(objIndex, dataIndex, value, key) {
    const newData = this.state.data;
    const selected = newData[objIndex].data[dataIndex];
    selected[key] = !value;
    newData[objIndex].data[dataIndex] = selected;
    this.setState({
      data: [...newData],
    });
  }
  render() {
    const { navigation } = this.props;
    const { ePosta, phone, sms } = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView}>
        <Header
          title="Araç Karşılaştırma"
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
          <Card>
            <View style={styles.contentWrapper}>
              <Text body1>
                Araç Karşılaştırma hizmetimiz sayesinde görüntülediğiniz
                ilanların açıklama kısmındaki Karşılaştır butonuna basarak aracı
                karşılaştırma listesine atabilir ve özelliklerine
                bakabilirsiniz.
              </Text>
            </View>
          </Card>
          <Block margin={20}>
            <Button
              onPress={() => {
                // navigation.navigate('Home');
                navigation.navigate('BottomTabNavigator', {
                  screen: 'Home' // Drawer içindeki Home screen'ine direkt git
                })
              }}>
              İlanlara Git
            </Button>
          </Block>
        </ScrollView>
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
  colorRed: { color: 'red' },
  switchContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  switch: {
    padding: 5,
  },
  switchContainer: {
    flexDirection: 'row',
  },
  cardTitle: {
    color: BaseColor.webBlue,
    fontSize: 16,
  },
});
