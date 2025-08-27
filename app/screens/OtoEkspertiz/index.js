import React, {PureComponent} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, SafeAreaView, Icon, Text, Container} from '@components';
import {BaseStyle, BaseColor, Images} from '@config';
import {ListItem} from 'react-native-elements';

const data = [
  {
    title: 'Ekspertiz Taleplerim',
    screen: 'ExspertiseRequests',
  },
  {
    title: 'Ekspertiz Talep Edilen İlanlarım',
    screen: 'ExspertiseRequests',
  },
  {
    title: 'Ekspertiz Paketleri',
    screen: 'EkspertisePackage',
  },
  {
    title: 'Ekspertiz Kuponlarım',
    screen: 'ExpertiseCoupons',
  },
];
export default class OtoEkspertiz extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={BaseStyle.safeAreaView}>
        <Header
          title="Oto Ekspertiz"
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
          {data.map((item, i) => (
            <ListItem
              key={i}
              title={<Text body1>{item.title}</Text>}
              bottomDivider
              onPress={() =>
                navigation.navigate(item.screen, {title: item.title})
              }
              chevron={
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                />
              }
              rightTitle={item.length}
            />
          ))}
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
  colorRed: {color: 'red'},
});
