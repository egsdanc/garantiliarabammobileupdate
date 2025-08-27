import React, { Component } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text } from '@components';
import styles from './styles';

export default class ModalPicker extends Component {
  constructor(props) {
    super(props);
    const { route } = this.props;

    this.state = {
      loading: false,
      data: route?.params?.data || [],
    };
  }

  onChange(select) {
    this.setState({
      data: this.state.data.map(item => {
        if (item.id === select.id) {
          return {
            ...item,
            checked: true,
          };
        } else {
          return {
            ...item,
            checked: false,
          };
        }
      }),
    });
  }

  onPressRight = () => {
    const { route, navigation } = this.props;
    if (route?.params?.onApply) {
      route.params.onApply(this.state.data);
    }
    navigation.goBack();
  };

  render() {
    const { navigation, route } = this.props;
    const headerTitle = route?.params?.headerTitle || '';

    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
        <Header
          title={headerTitle}
          renderLeft={() => (
            <Icon
              name="arrow-left"
              size={20}
              color={BaseColor.primaryColor}
            />
          )}
          renderRight={() => {
            if (this.state.loading) {
              return (
                <ActivityIndicator
                  size="small"
                  color={BaseColor.primaryColor}
                />
              );
            } else {
              return (
                <Text headline primaryColor>
                  Kaydet
                </Text>
              );
            }
          }}
          onPressLeft={() => navigation.goBack()}
          onPressRight={this.onPressRight}
        />
        <View style={styles.contain}>
          <View style={{ width: '100%', height: '100%' }}>
            <FlatList
              data={this.state.data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => this.onChange(item)}
                >
                  <Text
                    body1
                    style={
                      item.checked
                        ? { color: BaseColor.primaryColor }
                        : {}
                    }
                  >
                    {item.title}
                  </Text>
                  {item.checked && (
                    <Icon
                      name="check"
                      size={14}
                      color={BaseColor.primaryColor}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
