import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Header, SafeAreaView, Icon, Text } from '@components';
import { BaseColor } from '@config';
import { ListItem } from 'react-native-elements';

import { styles } from './styles';

export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { route } = this.props;
    const data = route?.params?.data;
    // İstersen burada data ile işlem yapabilirsin
  }

  render() {
    const { navigation, route } = this.props;
    const data = route?.params?.data || [];

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          title="Üyelik Bilgilerim"
          renderLeft={() => (
            <Icon
              name="arrow-left"
              size={20}
              color={BaseColor.primaryColor}
            />
          )}
          onPressLeft={() => navigation.goBack()}
        />
        <View style={styles.container}>
          {data.map((item, i) => (
            <ListItem
              key={i}
              title={<Text body1>{item.title}</Text>}
              bottomDivider
              onPress={() => navigation.navigate(item.screen)}
              chevron={
                <Icon
                  name="angle-right"
                  size={18}
                  color={BaseColor.primaryColor}
                />
              }
            />
          ))}
        </View>
      </SafeAreaView>
    );
  }
}
