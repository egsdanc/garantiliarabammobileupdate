import React, { useState, useEffect } from 'react';
import { View, ScrollView, Switch } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon } from '@components';
import {
  XForm,
  Block,
  DropDownMulti,
  TextInput,
  Text,
  useSelection,
  TouchableOpacity,
  Divider,
  RadioGroup,
  CheckBox,
} from '@common';
// import RangeSlider from 'rn-range-slider';
import styles from './styles';
import { compose, equals, head, last, clone, once, isEmpty } from 'ramda';
import { withProps, withLoadingScreen } from '@hocs';
import { useIlListOptions } from '../../../state/ducks/ilList';
import { useIlceListOptions } from '../../../state/ducks/ilceList';
import { useSearchResultsFilterOptions } from '../../../state/ducks/SearchResultsFilter';

const SwitchAdapter = withProps(({ onChange, value }) => ({
  value: !!value,
  onValueChange: onChange,
  trackColor: { false: BaseColor.dividerColor, true: BaseColor.webBlue },
  thumbColor: value ? BaseColor.primaryColor : BaseColor.fieldColor,
  ios_backgroundColor: '#3e3e3e',
}))(Switch);

const Collapsable = ({
  defaultClosed = true,
  children,
  title = 'Title',
  hidden = false,
}) => {
  const [closed, setClosed] = useState(defaultClosed);
  return (
    <Block style={{ display: hidden ? 'none' : 'flex' }}>
      <TouchableOpacity onPress={() => setClosed(a => !a)}>
        <View style={styles.profileItem}>
          <Text body1>{title}</Text>
          <Icon
            name={closed ? 'angle-down' : 'angle-up'}
            size={18}
            color={BaseColor.primaryColor}
            style={{ marginLeft: 5 }}
          />
        </View>
      </TouchableOpacity>
      <Block color="#f8f8f8" style={{ display: closed ? 'none' : 'flex' }} p4>
        {!closed && children}
      </Block>
    </Block>
  );
};

class Filter extends XForm {
  onApply = () => {
    let err = {};
    const { values } = this.state;
    if (
      values['min-yil'] &&
      values['min-yil'] !== '' &&
      values['min-yil']?.length !== 4
    ) {
      err['min-yil'] = 'Hatali giriş! Yil 4 haneli olmalı';
    }
    if (
      values['max-yil'] &&
      values['max-yil'] !== '' &&
      values['max-yil']?.length !== 4
    ) {
      err['max-yil'] = 'Hatali giriş! Yil 4 haneli olmalı';
    }
    if (!isEmpty(err)) {
      this.setState({ errors: err });
      return null;
    }
    this.props.route?.params?.onFilter?.(clone(values));
    this.props.navigation.goBack();
    this.setState({ errors: {} });
  };
  getOnce = once(() => {
    const cityValues = this.props.defaultValues?.city || this.state.values?.city || [];
    this.props.getIlceListOptions({
      cityIds: cityValues.map(({ value }) => value),
    });
    return [];
  });
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
        <Header
          title="Filtreleme"
          renderLeft={() => {
            return (
              <Icon name="times" size={20} color={BaseColor.primaryColor} />
            );
          }}
          renderRight={() => {
            return (
              <Text headline primaryColor numberOfLines={1}>
                Uygula
              </Text>
            );
          }}
          onPressLeft={() => navigation.goBack()}
          onPressRight={this.onApply}
        />
        <ScrollView>
          <View style={{ padding: 20, width: '100%' }}>
            <Text>Otomobil Filtresi</Text>
            {/* <Text>{JSON.stringify(this.state.values.durum)}</Text> */}
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#333333',
                padding: 5,
              }}>
              <View style={{ flex: 0.5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <SwitchAdapter
                    size={18}
                    {...this.bindCheckBox('ekspertizli')}
                  />
                  <Text bold style={{ marginLeft: 5 }}>
                    Ekspertizli
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <SwitchAdapter size={18} {...this.bindCheckBox('hatasiz')} />
                  <Text bold style={{ marginLeft: 5 }}>
                    Hatasız
                  </Text>
                </View>
              </View>
              <View style={{ flex: 0.5 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <SwitchAdapter
                    size={18}
                    {...this.bindCheckBox('guveniyorum')}
                  />
                  <Text bold style={{ marginLeft: 5 }}>
                    Arabama {'\n'} Güveniyorum
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <SwitchAdapter
                    size={18}
                    {...this.bindCheckBox('satilanAraclar')}
                  />
                  <Text bold style={{ marginLeft: 5 }}>
                    Satılan Araçlar
                  </Text>
                </View>
              </View>
            </View>
            {/* other options */}
            <View style={styles.containerItem}>
              <Collapsable defaultClosed={false} title="Adres">
                <Block color="transparent">
                  <DropDownMulti
                    {...this.bindDropDown('city', {
                      options: this.props.ilListOptions || [],
                    })}
                    label=""
                    placeholder="İl"
                    style={{ marginTop: 3, marginBottom: 3 }}
                  />
                  <DropDownMulti
                    {...this.bindDropDown('district', {
                      options: this.props.ilceListOptions?.length
                        ? this.props.ilceListOptions
                        : (this.getOnce() || []),
                      parentKey: 'city',
                      onParentChange: (parentVal, childKey, values) => {
                        if (parentVal && parentVal?.length === 0) {
                          this._resetMe(parentVal, childKey, values);
                        } else {
                          this.props.getIlceListOptions({
                            cityIds: (parentVal || []).map(({ value }) => value),
                          });
                        }
                      },
                    })}
                    label=""
                    placeholder="İlçe"
                    style={{ marginTop: 3, marginBottom: 3 }}
                  />
                </Block>
              </Collapsable>
              <Collapsable title="Fiyat">
                <Block color="transparent">
                  <ButtonInput
                    {...this.bindRadioGroup('currency_type', {
                      options: [
                        {
                          text: 'TL',
                          value: 'tl',
                        },
                        {
                          text: 'EUR',
                          value: 'eur',
                        },
                        {
                          text: 'USD',
                          value: 'usd',
                        },
                        {
                          text: 'GBP',
                          value: 'gbt',
                        },
                      ],
                      // defaultValue: [{text: 'TL', value: 'tl'}], //will be provided by props
                    })}
                  />
                  <Block row center middle color="transparent">
                    <TextInput
                      {...this.bindTextInputNumber('min-fiyat')}
                      style={[BaseStyle.textInput]}
                      label=""
                      renderRight={null}
                      placeholder="min"
                    />
                    <Text bgColor="transparent" mx4>
                      -
                    </Text>
                    <TextInput
                      {...this.bindTextInputNumber('max-fiyat')}
                      style={[BaseStyle.textInput]}
                      label=""
                      renderRight={null}
                      placeholder="maks"
                    />
                  </Block>
                  {/* <Block row center middle color="transparent">
                    <RangeSlider
                      style={{width: 160, height: 80}}
                      gravity={'center'}
                      min={0}
                      max={10000000}
                      step={20}
                      selectionColor="#3df"
                      blankColor="#f618"
                      onValueChanged={(low, high, fromUser) => {
                        this.setState({rangeLow: low, rangeHigh: high});
                      }}
                    />
                  </Block> */}
                </Block>
              </Collapsable>
              <Collapsable title="Yıl">
                <Block color="transparent">
                  <Block row center middle color="transparent">
                    <TextInput
                      {...this.bindTextInputNumber('min-yil')}
                      style={[BaseStyle.textInput]}
                      label=""
                      renderRight={null}
                      placeholder="min"
                    />
                    <Text bgColor="transparent" mx4>
                      -
                    </Text>
                    <TextInput
                      {...this.bindTextInputNumber('max-yil')}
                      style={[BaseStyle.textInput]}
                      label=""
                      renderRight={null}
                      placeholder="maks"
                    />
                  </Block>
                </Block>
              </Collapsable>
              <Collapsable title="KM">
                <Block color="transparent">
                  <Block row center middle color="transparent">
                    <TextInput
                      {...this.bindTextInputNumber('min-km', {
                        parentKey: 'kmSelection',
                        onParentChange: this._resetMe,
                      })}
                      style={[BaseStyle.textInput]}
                      label=""
                      renderRight={null}
                      placeholder="min"
                      maxLength={4}
                    />
                    <Text bgColor="transparent" mx4>
                      -
                    </Text>
                    <TextInput
                      {...this.bindTextInputNumber('max-km', {
                        parentKey: 'kmSelection',
                        onParentChange: this._resetMe,
                      })}
                      style={[BaseStyle.textInput]}
                      label=""
                      renderRight={null}
                      placeholder="maks"
                      maxLength={4}
                    />
                  </Block>
                  <Divider
                    style={{
                      borderColor: BaseColor.accentColor,
                      borderWidth: 0.3,
                      width: '100%',
                    }}>
                    <Text>ya da</Text>
                  </Divider>
                  <RadioGroup
                    {...this.bindRadioGroup('kmSelection', {
                      parentKey: ['maks-km', 'min-km'],
                      onParentChange: this._resetMe,
                      options: [
                        {
                          text: "60.000 Km'ye kadar",
                          value: '60000',
                        },
                        {
                          text: "80.000 Km'ye kadar",
                          value: '80000',
                        },
                        {
                          text: "100.000 Km'ye kadar",
                          value: '100000',
                        },
                        {
                          text: "150.000 Km'ye kadar",
                          value: '150000',
                        },
                        {
                          text: "200.000 Km'ye kadar",
                          value: '200000',
                        },
                      ],
                    })}
                    ItemContainer={{ width: '100%' }} //TODO: NEED TO ENABLE
                    ItemsConatiner={{ flex: 1 }}
                    label=""
                  />
                </Block>
              </Collapsable>
              {/* Dynamic Inputs */}
              {(this.props.dynamicFormElements || []).map(
                ({ type, title, name, ...rest }) => {
                  switch (type) {
                    case 'selectbox':
                      return (
                        <Collapsable
                          title={title}
                          // defaultClosed={false}
                          key={name}>
                          <Block color="transparent">
                            <MultiCheckBoxInput
                              {...this.bindRadioGroup(name, rest)}
                            />
                          </Block>
                        </Collapsable>
                      );
                    case 'range':
                      return (
                        <Collapsable title={title} key={name}>
                          <Block row center middle color="transparent">
                            <TextInput
                              {...this.bindTextInputNumber(`min-${name}`)}
                              style={[BaseStyle.textInput]}
                              label=""
                              renderRight={null}
                              placeholder="min"
                            />
                            <Text bgColor="transparent" mx4>
                              -
                            </Text>
                            <TextInput
                              {...this.bindTextInputNumber(`maks-${name}`)}
                              style={[BaseStyle.textInput]}
                              label=""
                              renderRight={null}
                              placeholder="maks"
                            />
                          </Block>
                        </Collapsable>
                      );
                    default:
                      return null;
                  }
                },
              )}
              <Collapsable title="Fabrika Garantisi">
                <Block color="transparent">
                  <RadioGroup
                    {...this.bindRadioGroup('warranty', {
                      options: [
                        { text: 'Var', value: 'VY_VAR' },
                        { text: 'Yok', value: 'VY_YOK' },
                      ],
                    })}
                    ItemContainer={{ width: '100%' }}
                    ItemsConatiner={{ flex: 1 }}
                    label=""
                  />
                </Block>
              </Collapsable>
              <Collapsable title="Kimden">
                <Block color="transparent">
                  <MultiCheckBoxInput
                    {...this.bindRadioGroup('kimden', {
                      options: [
                        {
                          text: 'Sahibinden',
                          value: 'KIMDN_SHB',
                        },
                        {
                          text: 'Galeriden',
                          value: 'KIMDN_GLR',
                        },
                      ],
                    })}
                  />
                </Block>
              </Collapsable>
              <Collapsable title="Durumu">
                <Block color="transparent">
                  <RadioGroup
                    {...this.bindRadioGroup('durum', {
                      options: [
                        { text: 'Sıfır', value: 'ARACDRM_SF' },
                        { text: 'İkinci El', value: 'ARACDRM_IK' },
                      ],
                    })}
                    ItemContainer={{ width: '100%' }}
                    ItemsConatiner={{ flex: 1 }}
                    label=""
                  />
                </Block>
              </Collapsable>
              <Collapsable title="Takaslı">
                <Block color="transparent">
                  <RadioGroup
                    {...this.bindRadioGroup('takas', {
                      options: [
                        { text: 'Var', value: 'Var' },
                        { text: 'Yok', value: 'Yok' },
                      ],
                    })}
                    ItemContainer={{ width: '100%' }}
                    ItemsConatiner={{ flex: 1 }}
                    label=""
                  />
                </Block>
              </Collapsable>
              <Collapsable title="İlan Tarihi">
                <Block color="transparent">
                  <RadioGroup
                    {...this.bindRadioGroup('ilantarihi', {
                      options: [
                        { text: 'Son 24 Saat', value: 'son-24-saat' },
                        {
                          text: 'Son 3 Gün içinde',
                          value: 'son-3-gun-icinde',
                        },
                        {
                          text: 'Son 7 Gün içinde',
                          value: 'son-7-gun-icinde',
                        },
                        {
                          text: 'Son 15 Gün içinde',
                          value: 'son-15-gun-icinde',
                        },
                        {
                          text: 'Son 30 Gün içinde',
                          value: 'son-30-gun-icinde',
                        },
                        {
                          text: '1 aydan daha eski',
                          value: '1-aydan-daha-eski',
                        },
                      ],
                    })}
                    ItemContainer={{ width: '100%' }}
                    ItemsConatiner={{ flex: 1 }}
                    label=""
                  />
                </Block>
              </Collapsable>
              <Collapsable title="Fotograf, Video">
                <Block color="transparent">
                  <MultiCheckBoxInput
                    {...this.bindRadioGroup('videoPhoto', {
                      options: [
                        {
                          text: 'Vdeolu İlanlar',
                          value: '0',
                        },
                        {
                          text: 'Fotograflı İlanlar',
                          value: '1',
                        },
                      ],
                    })}
                  />
                </Block>
              </Collapsable>
              <Collapsable title="Kelime ile filtrele">
                <Block color="transparent">
                  <TextInput
                    {...this.bindDropDown('kelime', {})}
                    label=""
                    placeholder="Kelime"
                    renderRight={null}
                  />
                  <Block row color="transparent" center>
                    <CheckBox
                      {...this.bindCheckBox('ilanaciklamalaridahil')}
                      m3
                    />
                    <Text>İlan açıklamalarını dahil et.</Text>
                  </Block>
                </Block>
              </Collapsable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default compose(
  withProps(({ navigation, route }) => {
    const defaultFilter = route?.params?.defaultFilter || {};
    return {
      defaultValues: clone(defaultFilter),
    };
  }),
  withProps(({ navigation, route }) => useSearchResultsFilterOptions({ navigation, route })),
  withProps(useIlListOptions),
  withProps(useIlceListOptions),
  withLoadingScreen({}),
)(Filter);

const ButtonInput = compose(withProps(({ options }) => useSelection(options || [])))(
  ({
    options,
    selectedlist,
    isAllSelected,
    toggleAllSelection,
    toggleSelection,
    isSelected,
    setSelected,
    onChange,
    value,
    ...rest
  }) => {
    useEffect(() => {
      value?.length && setSelected(value);
    }, [setSelected, value]);
    return (
      <Block row card my4 shadow {...rest}>
        {(options || []).map(item => (
          <TouchableOpacity
            primaryColor={isSelected(item)}
            key={JSON.stringify(item)}
            onPress={_ => {
              onChange([item]);
              setSelected([item]);
            }}
            style={[
              equals(item, head(options || [])) && {
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
              equals(item, last(options || [])) && {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              },
            ]}
            center
            p2
            middle>
            <Text whiteColor={isSelected(item)} center middle>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </Block>
    );
  },
);

const MultiCheckBoxInput = compose(
  withProps(({ options, value }) => {
    const result = useSelection(options || []);
    useEffect(() => {
      result.setSelected(value || []);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return result;
  }),
)(
  ({
    options,
    selectedlist,
    isAllSelected,
    toggleAllSelection,
    toggleSelection,
    isSelected,
    setSelected,
    onChange,
    values,
    ...rest
  }) => {
    useEffect(() => {
      selectedlist?.length && onChange(selectedlist);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedlist]);
    return (
      <Block card my4 shadow {...rest}>
        {(options || []).map(item => (
          <TouchableOpacity
            key={JSON.stringify(item)}
            onPress={_ => {
              toggleSelection(item);
            }}
            p2
            center
            row>
            <CheckBox
              value={isSelected(item)}
              onChange={_ => {
                toggleSelection(item);
              }}
            />
            <Text primaryColor={isSelected(item)}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </Block>
    );
  },
);
