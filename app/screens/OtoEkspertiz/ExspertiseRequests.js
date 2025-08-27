import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { Header, SafeAreaView, Icon, Text, CarItem } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const RenderTabItem = ({ route, data, navigation }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id + ''}
      renderItem={({ item, index }) => (
        <CarItem
          image={item.thumb || ''}
          name={item.ad_title}
          title={item.car_model}
          price={item.ad_price}
          km={item.ad_km}
          style={{ marginBottom: 20, paddingHorizontal: 20 }}
          specialCaseText={
            item.isCorrect
              ? 'h'
              : item.isExpertise
                ? 'e'
                : item.iTrustMyCar
                  ? 'g'
                  : ''
          }
          onPress={() => {
            navigation.navigate('CarDetail', { ad_code: item?.ad_code });
          }}
        />
      )}
    />
  );
};

const initialLayout = { width: Dimensions.get('window').width };

export default function ExspertiseRequests({ navigation, route }) {
  const { title } = route?.params || {};
  const [index, setIndex] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [routes] = React.useState([
    { key: 'first', title: 'Tümünü Göster', data: data },
    { key: 'second', title: 'Ekspertiz Yapıldı', data: data },
    { key: 'third', title: 'Ekspertize Gidilmedi', data: data },
    { key: 'fourth', title: 'Ekspertiz Beklemede', data: data },
  ]);
  const renderScene = ({ route }) => {
    return <RenderTabItem route={route} data={route.data} />;
  };
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: BaseColor.primaryColor }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color }}>{route.title}</Text>
      )}
      style={{ backgroundColor: '#f6f8fa' }}
      activeColor={'black'}
      inactiveColor={BaseColor.grayColor}
      scrollEnabled
    />
  );
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title={title}
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        lazy
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
