import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import Swiper from 'react-native-swiper';
import { Image, Header, SafeAreaView, Icon, Text } from '@components';
import styles from './styles';

export default class PreviewImageOfAd extends Component {
  constructor(props) {
    super(props);
    const { route } = this.props;
    const imagesParam = route?.params?.images || [];
    const indexSelectedParam = route?.params?.indexSelected || 0;

    this.state = {
      images: imagesParam.map((image, index) => ({
        id: index,
        image: image[2],
        selected: index === indexSelectedParam,
      })),
      indexSelected: indexSelectedParam,
    };

    this.flatListRef = null;
    this.swiperRef = null;
  }

  onSelect(indexSelected) {
    this.setState(
      {
        indexSelected,
        images: this.state.images.map((item, index) => ({
          ...item,
          selected: index === indexSelected,
        })),
      },
      () => {
        if (this.flatListRef) {
          this.flatListRef.scrollToIndex({
            animated: true,
            index: indexSelected,
          });
        }
      }
    );
  }

  onTouchImage(touched) {
    if (touched !== this.state.indexSelected && this.swiperRef) {
      this.swiperRef.scrollBy(touched - this.state.indexSelected, false);
    }
  }

  render() {
    const { navigation } = this.props;
    const { images, indexSelected } = this.state;

    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, { backgroundColor: 'black' }]}
        forceInset={{ top: 'always' }}
      >
        <Header
          style={{ backgroundColor: 'black' }}
          title=""
          renderRight={() => (
            <Icon name="times" size={20} color={BaseColor.whiteColor} />
          )}
          onPressRight={() => navigation.goBack()}
          barStyle="light-content"
        />

        <Swiper
          ref={(ref) => (this.swiperRef = ref)}
          dotStyle={{ backgroundColor: BaseColor.textSecondaryColor }}
          index={indexSelected}
          paginationStyle={{ bottom: 0 }}
          loop={false}
          activeDotColor={BaseColor.primaryColor}
          removeClippedSubviews={false}
          onIndexChanged={(index) => this.onSelect(index)}
        >
          {images.map((item, key) => (
            <Image
              key={key}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
              source={{ uri: item.image }}
            />
          ))}
        </Swiper>

        <View style={{ paddingVertical: 10 }}>
          <View style={styles.lineText}>
            <Text body2 whiteColor>
              İlan Başlığı
            </Text>
            <Text body2 whiteColor>
              {indexSelected + 1}/{images.length}
            </Text>
          </View>

          <FlatList
            ref={(ref) => (this.flatListRef = ref)}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => this.onTouchImage(index)}
                activeOpacity={0.9}
              >
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    marginLeft: 20,
                    borderRadius: 8,
                    borderColor:
                      index === indexSelected
                        ? BaseColor.lightPrimaryColor
                        : BaseColor.grayColor,
                    borderWidth: 1,
                  }}
                  source={{ uri: item.image }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}
