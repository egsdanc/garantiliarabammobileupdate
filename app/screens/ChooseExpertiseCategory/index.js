import React, {Component} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, EkspertizPaketi} from '@components';
import {PaketlerData} from '@data';
import styles from './styles';

export default class ChooseExpertiseCategory extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      loading: false,
      refreshing: false,
      ekspertizPaketleri: PaketlerData,
    };
  }

  renderItem(item) {
    return (
      <EkspertizPaketi
        name={item.name}
        checkIn={item.checkIn}
        checkOut={item.checkOut}
        total={item.total}
        price={item.price}
        style={{paddingVertical: 10, marginHorizontal: 20}}
        onPress={() => {
          this.props.navigation.navigate('EkspertizRandevu');
        }}
      />
    );
  }

  /**
   * @description Loading booking item history one by one
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  render() {
    const {navigation} = this.props;
    let {refreshing, ekspertizPaketleri} = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Ekspertiz Talebi"
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
        {
          <FlatList
            refreshControl={
              <RefreshControl
                colors={[BaseColor.primaryColor]}
                tintColor={BaseColor.primaryColor}
                refreshing={refreshing}
                onRefresh={() => {}}
              />
            }
            data={ekspertizPaketleri}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => this.renderItem(item)}
          />
        }
      </SafeAreaView>
    );
  }
}
