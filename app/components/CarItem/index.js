import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from '@components';
import { Text } from '@common';
import PropTypes from 'prop-types';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { split, head } from 'ramda';
const getImageUrl = thumb =>
  thumb &&
  `https://image.garantiliarabam.com/upload/${head(
    split('---', thumb),
  )}/thumb/${thumb}`;
export default class CarItem extends PureComponent {
  /**
   * Display car item as list
   */
  renderList() {
    const {
      style,
      image,
      title,
      name,
      price,
      onPress,
      specialCaseText,
    } = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          style={[styles.listContent, style]}>
          <View>
            <View>
              {specialCaseText === 'e' ? (
                <LinearGradient
                  style={{ padding: 5, height: 25 }}
                  colors={['#f188a3', '#ff0000']}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <Text whiteColor>Ekspertizli</Text>
                  </View>
                </LinearGradient>
              ) : specialCaseText === 'h' ? (
                <LinearGradient
                  style={{ padding: 5, height: 25 }}
                  colors={['#88e6f1', '#0024ff']}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <Text whiteColor>Hatasız</Text>
                  </View>
                </LinearGradient>
              ) : specialCaseText === 'g' ? (
                <LinearGradient
                  style={{ padding: 5, height: 25 }}
                  colors={['#0cb713', '#00B712']}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <Text whiteColor caption1>
                      Arabama Güveniyorum
                    </Text>
                  </View>
                </LinearGradient>
              ) : null}
            </View>
            <Image
              source={{ uri: image }}
              style={styles.listImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.listContentRight}>
            <Text headline semibold>
              {title}
            </Text>
            <Text subhead grayColor style={{ marginVertical: 3 }}>
              {name}
            </Text>
            {/* <View style={styles.listContentService}>
            </View> */}
            <View style={styles.contentPrice}>
              <Text title3 primaryColor semibold>
                {price}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            marginBottom: 10,
            width: '100%',
            backgroundColor: '#eee',
          }}
        />
      </View>
    );
  }

  /**
   * Display car item as grid
   */
  renderGrid() {
    const {
      style,
      image,
      title,
      name,
      price,
      onPress,
      specialCaseText,
      km,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={[styles.girdContent, style]}>
        <View>
          <View>
            {specialCaseText === 'e' ? (
              <LinearGradient
                style={{ padding: 5, height: 25 }}
                colors={['#f188a3', '#ff0000']}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Text whiteColor>Ekspertizli</Text>
                </View>
              </LinearGradient>
            ) : specialCaseText === 'h' ? (
              <LinearGradient
                style={{ padding: 5, height: 25 }}
                colors={['#88e6f1', '#0024ff']}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Text whiteColor>Hatasız</Text>
                </View>
              </LinearGradient>
            ) : specialCaseText === 'g' ? (
              <LinearGradient
                style={{ padding: 5, height: 25 }}
                colors={['#88e6f1', '#0024ff']}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Text whiteColor caption1>
                    Arabama Güveniyorum
                  </Text>
                </View>
              </LinearGradient>
            ) : null}
          </View>
          <Image
            source={{ uri: image }}
            style={styles.girdImage}
            resizeMode="cover"
          />
        </View>
        <Text headline semibold style={{ marginTop: 5 }}>
          {title}
        </Text>
        <Text subhead grayColor style={{ marginVertical: 5 }}>
          {name}
        </Text>
        <View style={styles.girdContentRate}>
          <Text
            title3
            primaryColor
            semibold
            style={{
              marginTop: 5,
            }}>
            {price}
          </Text>
          <Text caption2 grayColor>
            {km} km
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return this.props.grid ? this.renderGrid() : this.renderList();
  }
}

CarItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.any,
  grid: PropTypes.bool,
  title: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  onPress: PropTypes.func,
};

CarItem.defaultProps = {
  style: {},
  grid: false,
  image: '',
  title: '',
  name: '',
  price: '',
  onPress: () => { },
};
