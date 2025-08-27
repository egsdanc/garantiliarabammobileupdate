import React, {Component} from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, ListThumbCircle} from '@components';
import styles from './styles';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      notification: [],
    };
  }

  render() {
    const {navigation} = this.props;
    let {notification} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Bildirimler"
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
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[BaseColor.primaryColor]}
              tintColor={BaseColor.primaryColor}
              refreshing={this.state.refreshing}
              onRefresh={() => {}}
            />
          }
          data={notification}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <ListThumbCircle
              image={item.image}
              txtLeftTitle={item.title}
              txtContent={item.description}
              txtRight={item.date}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}
