import React, {useState} from 'react';
import {View} from 'react-native';
import {XForm, Block, DropDown} from '@common';
// import RangeSlider from 'rn-range-slider';
import styles from './styles';
import {compose, once} from 'ramda';
import {withProps, withLoadingScreen} from '@hocs';
import {useIlListOptions} from '@state/ducks/ilList';
import {useIlceListOptions} from '@state/ducks/ilceList';
import {useMahalleListOptions} from '@state/ducks/mahalleList';

class AddressForm extends XForm {
  getOnce = once(() => {
    this.props.getIlceListOptions({
      cityIds: (this.state.values.city || []).map(({value}) => value),
    });
    return [];
  });
  render() {
    return (
      <View style={styles.form}>
        <DropDown
          {...this.bindDropDown('cityId', {
            options: this.props.ilListOptions,
          })}
          label=""
          placeholder="İl"
          style={styles.selectInput}
        />
        <DropDown
          {...this.bindDropDown('district', {
            options: this.props.ilceListOptions.length
              ? this.props.ilceListOptions
              : this.getOnce(),
            parentKey: 'cityId',
            onParentChange: (parentVal, childKey, values) => {
              if (parentVal && parentVal.length === 0) {
                this._resetMe(parentVal, childKey, values);
              } else {
                this.props.getIlceListOptions({
                  cityIds: [parentVal || ''],
                });
              }
            },
          })}
          label=""
          placeholder="İlçe"
          style={styles.selectInput}
        />
        <DropDown
          {...this.bindDropDown('neighborhood', {
            options: this.props.mahalleListOptions.length
              ? this.props.mahalleListOptions
              : this.getOnce(),
            parentKey: 'district',
            onParentChange: (parentVal, childKey, values) => {
              this.props.setMahalleId(null);
              if (parentVal && parentVal.length === 0) {
                this._resetMe(parentVal, childKey, values);
              } else {
                this.props.getMahalleListOptions(parentVal || '');
              }
            },
          })}
          onChange={value => {
            this.props.setMahalleId(value);
          }}
          value={this.props.mahalleId}
          label=""
          placeholder="Mahalle"
          style={styles.selectInput}
        />
      </View>
    );
  }
}
export default compose(
  withProps(useIlListOptions),
  withProps(useIlceListOptions),
  withProps(useMahalleListOptions),
  withLoadingScreen({}),
)(AddressForm);
