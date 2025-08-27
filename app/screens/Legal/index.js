import React, {useEffect, useCallback, useState} from 'react';
import {BaseStyle, BaseColor, Images} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import {XForm} from '@common';
import styles from './styles';
import {compose} from '@hocs';
import {withProps} from '../../hocs';
import WebView from 'react-native-webview';
import {Tab, TabView} from 'react-native-elements';
import {Block, Button} from '../../commonComponents';
import {TouchableOpacity, View} from 'react-native';

const Legal = ({navigation, screenProps}, _) => {
  const [tab, setTab] = useState(1);
  const [link, setLink] = useState(
    'https://garantiliarabam.com.tr',
  );
  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} forceInset={{top: 'always'}}>
      <Header
        title="Yasal"
        renderLeft={() => (
          <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <Block flex={1}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.linkButton,
              tab == 1 ? styles.linkButtonActive : null,
            ]}
            onPress={() => {
              setTab(1);
            }}>
            <Text>Üyelik Sözleşmesi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.linkButton,
              tab == 2 ? styles.linkButtonActive : null,
            ]}
            onPress={() => {
              setTab(2);
            }}>
            <Text>Gizlilik Politikası</Text>
          </TouchableOpacity>
        </View>
      </Block>
      <Block flex={10}>
        <WebView source={{uri: link}} />
      </Block>
    </SafeAreaView>
  );
};

export default compose(
  withProps(({navigation}) => {
    useEffect(() => {}, []);
    return {};
  }),
)(Legal);
