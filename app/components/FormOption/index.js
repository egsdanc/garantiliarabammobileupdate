import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Button, Icon } from '@components';
import styles from './styles';
import Modal from 'react-native-modal';
import { BaseColor } from '@config';
import { SafeAreaView } from 'react-native-safe-area-context';
export default class FormOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      option: props.option,
      value: props.value,
    };
  }

  componentDidMount() {
    const { option, value } = this.state;
    this.setState({
      option: option.map(item => {
        return {
          ...item,
          checked: item.value == value,
        };
      }),
    });
  }

  openModal() {
    const { value } = this.state;
    this.setState({
      modalVisible: true,
      option: this.props.option.map(item => {
        return {
          ...item,
          checked: item.value === value,
        };
      }),
    });
  }

  onSelect(select) {
    this.setState({
      option: this.state.option.map(item => {
        return {
          ...item,
          checked: item.value === select.value,
        };
      }),
    });
  }

  onApply() {
    const { option } = this.state;
    const { onChange } = this.props;
    const selected = option.filter(item => item.checked);
    if (selected.length > 0) {
      this.setState(
        {
          value: selected[0],
          modalVisible: false,
        },
        () => {
          onChange(selected[0]?.value);
        },
      );
    }
  }

  render() {
    const { style, label } = this.props;
    const { modalVisible, option, value } = this.state;
    return (
      <View>
        <Modal isVisible={modalVisible} style={styles.bottomModal}>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: '#fff', paddingTop: 50 }}>
            <ScrollView style={styles.contentFilterBottom}>
              {option.map((item, index) => (
                <TouchableOpacity
                  style={styles.contentActionModalBottom}
                  key={item.value}
                  onPress={() => this.onSelect(item)}>
                  <Text body2 semibold primaryColor={item.checked}>
                    {item.text}
                  </Text>
                  {item.checked && (
                    <Icon
                      name="check"
                      size={14}
                      color={BaseColor.primaryColor}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.btnContainer}>
              <Button
                full
                style={{ marginTop: 10, marginBottom: 20 }}
                onPress={() => this.onApply()}>
                Uygula
              </Button>
            </View>
          </SafeAreaView>
        </Modal>
        <TouchableOpacity
          style={[styles.contentForm, style]}
          onPress={() => this.openModal()}>
          <Text caption2 light style={{ marginBottom: 5 }}>
            {label}
          </Text>
          <Text body1 semibold>
            {value?.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

FormOption.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  value: PropTypes.string,
  option: PropTypes.array,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
};

FormOption.defaultProps = {
  style: {},
  label: 'Seat Class',
  value: 'Economy',
  option: [
    {
      value: 'Economy',
      text: 'Economy Class',
    },
    {
      value: 'Business',
      text: 'Business Class',
    },
    {
      value: 'First',
      text: 'First Class',
    },
    {
      value: 'Normal',
      text: 'Normal Class',
    },
  ],
  onCancel: () => { },
  onChange: () => { },
};
