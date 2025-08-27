import React, {
  Component,
  Children,
  cloneElement,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Text, Button, Icon, MapArray, ErrorLabel, Label } from '../../';
import styles from './styles';
import Modal from 'react-native-modal';
import { BaseColor } from '@config';
const { height } = Dimensions.get('screen');
import { withHideFormElement } from '../../../hocs/withHideFormElement';
import { compose, withProps } from '../../../hocs';
import {
  without,
  append,
  ifElse,
  intersection,
  equals,
  always,
  contains,
  includes,
} from 'ramda';

export const useSelection = data => {
  const safeData = data || [];
  const [selectedlist, setSelectedList] = useState([]);
  /** will add and remove the selection  */
  // toggleSelection :: a → [a]||[]
  const toggleSelection = useCallback(
    value =>
      setSelectedList(prevList => {
        const currentList = prevList || [];
        return ifElse(contains(value), without([value]), append(value))(currentList);
      }),
    [],
  );
  const setSelected = useCallback(values => {
    /** if values is exists inside options */
    // intersection(values, data) &&
    setSelectedList(values || []);
  }, []);
  /** hepsinin sechilmish oldugu hakkinda bir bilgi */
  // isAllSelected :: [{*}] → [{*}] → Boolean
  const isAllSelected = selectedlist && safeData ? equals(intersection(selectedlist, safeData), safeData) : false;
  // toggleAllSelection :: Boolean → [{*}] → [{*}]||[]
  const toggleAllSelection = useCallback(() => {
    setSelectedList(always(isAllSelected ? [] : safeData));
  }, [isAllSelected, safeData]);
  // isSelected :: {*} → Boolean
  const isSelected = useCallback(value => selectedlist ? includes(value, selectedlist) : false, [
    selectedlist,
  ]);
  return {
    selectedlist,
    isAllSelected,
    toggleAllSelection,
    toggleSelection,
    isSelected,
    setSelected,
  };
};

class DropDownMultiComp extends Component {
  /** add selected to the ordered list */
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  /** remove the pill while modal closed */
  _onPillRemove = selectedItem => () => {
    this.props.toggleSelection(selectedItem);
    this.props.onChange(
      ifElse(
        contains(selectedItem),
        without([selectedItem]),
        append(selectedItem),
      )(this.props.selectedlist),
    );
  };
  /** a function used to ope the modal */
  _openModal = () => {
    this.options = this.props.selectedlist;
    this.setState({ modalVisible: true });
  };
  /**
   * a function to select
   * @param {Array} value array of selected objects
   */
  _onSelect = selectedItem => () => {
    this.props.toggleSelection(selectedItem);
  };
  /** a function to trigger the selection onChange */
  _onApply = () => {
    const { onChange } = this.props;
    this.setState({ modalVisible: false }, () => {
      onChange(this.props.selectedlist);
    });
  };
  /** a function used to preserve changes if cancelled */
  _onCancel = () => {
    this.setState({ modalVisible: false });
    this.props.setSelected(this.options);
    this.props.onChange(this.options);
  };
  /** renders Modal */
  renderModal = () => {
    const { modalVisible } = this.state;
    return (
      <Modal
        isVisible={modalVisible}
        onBackdropPress={this._onCancel}
        onSwipeComplete={this._onCancel}
        onRequestClose={this._onCancel}
        swipeDirection={['down']}
        style={[styles.Modal, this.props.modalStyle]}
        propagateSwipe>
        <View
          style={[
            styles.modalContentContainer,
            this.props.modalContentContainerStyle,
          ]}>
          <View
            style={[styles.contentSwipeDown, this.props.contentSwipeDownStyle]}>
            <View
              style={[styles.lineSwipeDown, this.props.lineSwipeDownStyle]}
            />
            {this.renderLabel(
              styles.modalLabelStyle,
              this.props.modalLabelStyle,
            )}
          </View>
          <ScrollView
            style={[{ height: height * 0.6 }, this.props.scrollListStyle]}
            showsHorizontalScrollIndicator={false}>
            <MapArray array={this.props.options || []}>
              {({ key, object, ...rest }, index) => (
                <TouchableOpacity
                  style={[
                    styles.ModalContentAction,
                    this.props.modalContentActionStyle,
                  ]}
                  key={JSON.stringify(object)}
                  onPress={this._onSelect(object)}>
                  {this.renderer(
                    { ...object, checked: this.props.isSelected(object) },
                    'renderItem',
                  )}
                  {this.props.isSelected(object) &&
                    this.renderer(object, 'checkedIcon')}
                </TouchableOpacity>
              )}
            </MapArray>
          </ScrollView>
          <Button
            full
            style={{ marginTop: 10, marginBottom: 20 }}
            onPress={this._onApply}>
            {this.props.translate(this.props.applyBtnText)}
          </Button>
        </View>
      </Modal>
    );
  };
  /** renders right side of the listItem */
  renderer = (object = {}, keyVal = '') => {
    let component = this.props[keyVal];
    let key = JSON.stringify(object);
    return typeof component === 'function'
      ? component({ key, object })
      : Children.map(component, child => cloneElement(child, { key, object }));
  };
  /** renders label at the top */
  renderLabel = (...inlineStyles) => {
    const { label, required } = this.props;
    return (
      <Label
        labelStyle={StyleSheet.flatten(inlineStyles)}
        label={label}
        required={required}
      />
    );
  };
  /** renders error label at the bottom */
  renderError = (...inlineStyles) => {
    const { error } = this.props;
    return (
      <ErrorLabel errorStyle={StyleSheet.flatten(inlineStyles)} error={error} />
    );
  };
  /** render dropdown icon and handle opening modal */
  renderDropDownIcon = () => {
    return (
      <TouchableOpacity
        style={[styles.renderDropDownIcon, this.props.renderDropDownIconStyle]}
        onPress={this._openModal}>
        {this.props.loading ? (
          <ActivityIndicator
            animating={this.props.loading}
            size="small"
            color={BaseColor.primaryColor}
          />
        ) : (
          this.props.icon
        )}
      </TouchableOpacity>
    );
  };
  /** renders list of checked pills */
  renderPills = () => {
    let { selectedlist } = this.props;
    return (
      <MapArray array={selectedlist || []}>
        {({ key, object, ...rest }, index) => {
          return (
            <View
              style={[styles.pillContainer, this.props.pillContainerStyle]}
              key={object.value + key + index}>
              {this.renderer(object, 'renderPill')}
              <TouchableOpacity
                style={[
                  styles.renderPillIconContainer,
                  this.props.renderPillIconStyle,
                ]}
                onPress={this._onPillRemove(object)}>
                {this.renderer(object, 'renderPillIcon')}
              </TouchableOpacity>
            </View>
          );
        }}
      </MapArray>
    );
  };
  render() {
    const {
      style,
      labelStyle,
      placeholder,
      error,
      errorStyle,
      selectedlist,
    } = this.props;
    let selected = selectedlist.length && selectedlist[0].text;
    const Tag = !selected ? Text : View;
    return (
      <>
        {this.renderLabel(labelStyle)}
        {this.renderModal()}
        <View
          style={[styles.mainContainer, error && { borderColor: 'red' }, style]}>
          <Tag
            style={[
              styles.renderPills,
              !selected
                ? { color: BaseColor.primaryTextColor, padding: 2, margin: 2 }
                : {},
              this.props.renderPillsStyle,
            ]}>
            {!selected ? placeholder : this.renderPills()}
          </Tag>
          {this.renderDropDownIcon()}
        </View>
        {this.renderError(errorStyle)}
      </>
    );
  }
}

DropDownMultiComp.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderPillIconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modalStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  errorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  modalContentContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  contentSwipeDownStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  lineSwipeDownStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modalLabelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  scrollListStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modalContentActionStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  renderDropDownIconStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  pillContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderPillsStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool,
  icon: PropTypes.node,
  placeholder: PropTypes.string,

  label: PropTypes.string,
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
    }),
  ),
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        text: PropTypes.string,
      }),
    ),
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  onRemoveItem: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]),
  renderPill: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]),
  renderPillIcon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]),
  checkedIcon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]),
  maxSelectionCount: PropTypes.number,
  onSelectionItemChange: PropTypes.func,
  translate: PropTypes.func,
  required: PropTypes.bool,
};

DropDownMultiComp.defaultProps = {
  style: {},
  renderPillIconStyle: {},
  modalStyle: {},
  modalContentContainerStyle: {},
  contentSwipeDownStyle: {},
  lineSwipeDownStyle: {},
  modalLabelStyle: {},
  scrollListStyle: {},
  modalContentActionStyle: {},
  renderDropDownIconStyle: {},
  pillContainerStyle: {},
  renderPillsStyle: {},
  errorStyle: {},
  error: '',
  loading: false,
  icon: <Icon name="chevron-down" size={18} color={BaseColor.primaryColor} />,
  renderItem: ({ object }) => (
    <Text body2 semibold primaryColor={object.checked}>
      {object.text}
    </Text>
  ),
  renderPill: ({ object }) => (
    <Text body2 semibold primaryColor>
      {object.text}
    </Text>
  ),
  renderPillIcon: (
    <Icon
      name="ios-close-circle-outline"
      type="ionicon"
      size={20}
      color={BaseColor.primaryColor}
    />
  ),
  applyBtnText: 'Uygula',
  checkedIcon: <Icon name="check" size={14} color={BaseColor.primaryColor} />,
  placeholder: '',
  label: '',
  labelStyle: {},
  options: [],
  value: [],
  maxSelectionCount: Infinity,
  onChange: (value, orderedoptions) => console.warn('onChange'),
  onRemoveItem: (item, options) => console.warn('onRemoveItem'),
  onSelectionItemChange: (selectedItem, orderedoptions) =>
    console.warn('onSelectionItemChange'),
  translate: key => key,
  required: false,
};
export const DropDownMulti = compose(
  withHideFormElement,
  withProps(({ value, options }) => {
    const result = useSelection(options || []);
    useEffect(() => {
      result.setSelected(value || []);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return result;
  }),
)(DropDownMultiComp);
export default DropDownMulti;
