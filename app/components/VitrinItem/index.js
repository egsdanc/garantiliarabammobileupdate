import React, {Component} from 'react';
import {View, TouchableOpacity, FlatList, Image} from 'react-native';
import {Text, Icon, StarRating, Tag} from '@components';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from "react-native-fast-image";
export default class VitrinItem extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Display hotel item as block
   */
  renderBlock() {
    const {
      style,
      image,
      name,
      location,
      price,
      available,
      rate,
      rateStatus,
      onPress,
      onPressTag,
      services,
    } = this.props;
    return (
      <View style={style}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.blockImage} />
        </TouchableOpacity>
        <View style={{paddingHorizontal: 20}}>
          <Text title2 semibold style={{marginTop: 5}} numberOfLines={1}>
            {location + ' ' + name}
          </Text>

          <View style={styles.blockContentDetail}>
            <View>
              <Text title3 primaryColor semibold>
                {price}
              </Text>
              <Text
                caption1
                accentColor
                style={{
                  marginTop: 3,
                }}
                numberOfLines={1}>
                {available}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Tag onPress={onPressTag} rate>
                {rate}
              </Tag>
              <View
                style={{
                  marginLeft: 10,
                }}>
                <Text caption1 grayColor semibold style={{paddingBottom: 5}}>
                  {rateStatus}
                </Text>
                <StarRating
                  disabled={true}
                  starSize={10}
                  maxStars={5}
                  rating={rate}
                  selectedStar={rating => {}}
                  fullStarColor={BaseColor.yellowColor}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contentService}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={services}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <View style={styles.serviceItemBlock} key={'block' + index}>
                <Icon
                  name={item.icon}
                  size={16}
                  color={BaseColor.accentColor}
                />
                <Text
                  overline
                  grayColor
                  style={{marginTop: 4}}
                  numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: 16,
            }}>
            <Icon
              name="angle-right"
              size={16}
              color={BaseColor.textSecondaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /**
   * Display hotel item as list
   */
  renderList() {
    const {
      style,
      image,
      name,
      location,
      price,
      available,
      rate,
      rateCount,
      onPress,
    } = this.props;
    return (
      <View style={[styles.listContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.listImage} />
        </TouchableOpacity>
        <View style={styles.listContentRight}>
          <Text headline semibold numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.listContentRow}>
            <Icon
              name="map-marker-alt"
              color={BaseColor.lightPrimaryColor}
              size={10}
            />
            <Text
              caption1
              grayColor
              style={{
                marginLeft: 3,
              }}
              numberOfLines={1}>
              {location}
            </Text>
          </View>
          <View style={styles.listContentRow}>
            <StarRating
              disabled={true}
              starSize={10}
              maxStars={5}
              rating={rate}
              selectedStar={rating => {}}
              fullStarColor={BaseColor.yellowColor}
            />
            <Text
              caption1
              grayColor
              semibold
              style={{
                marginLeft: 10,
                marginRight: 3,
              }}>
              Ratting
            </Text>
            <Text caption1 primaryColor semibold>
              {rateCount}
            </Text>
          </View>
          <Text
            title3
            primaryColor
            semibold
            style={{marginTop: 5, marginBottom: 5}}>
            {price}
          </Text>
          <Text caption1 semibold>
            AVG/NIGHT
          </Text>
          <Text footnote accentColor style={{marginTop: 3}}>
            {available}
          </Text>
        </View>
      </View>
    );
  }

  /**
   * Display hotel item as grid
   */
  renderGrid() {
    const {
      style,
      image,
      name,
      location,
      price,
      rate,
      numReviews,
      specialCase,
      specialCaseText,
      onPress,
    } = this.props;
    return (
      <View style={[styles.girdContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          {specialCase === true ? (
            <View>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={{uri: image}}
                style={[styles.girdImage]}
              />
              <View style={{zIndex: 999}}>
                {specialCaseText === 's' ? (
                  <LinearGradient
                    style={{
                      padding: 5,
                      height: 25,
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                    }}
                    colors={['#ef9b21', '#ef9b21']}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <Text
                        style={{textAlign: 'center', width: '100%'}}
                        whiteColor>
                        Satıldı
                      </Text>
                    </View>
                  </LinearGradient>
                ) : specialCaseText === 'g' ? (
                  <LinearGradient
                    style={{
                      padding: 5,
                      height: 25,
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                    }}
                    colors={['#0cb713', '#0cb713']}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <Text
                        style={{textAlign: 'center', width: '100%'}}
                        whiteColor>
                        Aracıma Güveniyorum
                      </Text>
                    </View>
                  </LinearGradient>
                ) : specialCaseText === 'e' ? (
                  <LinearGradient
                    style={{
                      padding: 5,
                      height: 25,
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                    }}
                    colors={['#d42222', '#d42222']}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <Text
                        style={{textAlign: 'center', width: '100%'}}
                        whiteColor>
                        Ekspertizli
                      </Text>
                    </View>
                  </LinearGradient>
                ) : specialCaseText === 'h' ? (
                  <LinearGradient
                    style={{
                      padding: 5,
                      height: 25,
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                    }}
                    colors={['#2196F3', '#2196F3']}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{textAlign: 'center', width: '100%'}}
                        whiteColor>
                        Hatasız
                      </Text>
                    </View>
                  </LinearGradient>
                ) : null}
              </View>
            </View>
          ) : (
            <Image
              resizeMode="cover"
              source={image}
              style={[styles.girdImage]}
            />
          )}
        </TouchableOpacity>
        <Text
          title4
          bold
          numberOfLines={2}
          left
          style={{
            marginTop: 10,
          }}>
          {name}
        </Text>
      </View>
    );
  }

  render() {
    let {block, grid} = this.props;
    if (grid) {
      return this.renderGrid();
    } else if (block) {
      return this.renderBlock();
    } else {
      return this.renderList();
    }
  }
}

VitrinItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node.isRequired,
    PropTypes.string,
  ]),
  list: PropTypes.bool,
  block: PropTypes.bool,
  grid: PropTypes.bool,
  name: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.string,
  available: PropTypes.string,
  rate: PropTypes.number,
  rateCount: PropTypes.string,
  rateStatus: PropTypes.string,
  numReviews: PropTypes.number,
  services: PropTypes.array,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

VitrinItem.defaultProps = {
  style: {},
  image: '',
  list: true,
  block: false,
  grid: false,
  name: '',
  location: '',
  price: '',
  available: '',
  rate: 0,
  rateCount: '',
  rateStatus: '',
  numReviews: 0,
  services: [],
  onPress: () => {},
  onPressTag: () => {},
};
