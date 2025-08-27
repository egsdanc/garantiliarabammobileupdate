import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '@components';
import styles from './styles';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { BaseColor, FontFamily } from '@config';
import moment from 'moment';

export default class ExpertiseDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
      checkInTime: new Date().toLocaleDateString('tr'),
      checkoutTime: new Date().toLocaleDateString('tr'),
      modalVisible: false,
      checkedDate: '',
    };
    LocaleConfig.locales.tr = {
      monthNames: [
        'Ocak',
        'Şubat',
        'Mart',
        'Nisan',
        'Mayıs',
        'Haziran',
        'Temmuz',
        'Ağustos',
        'Eylül',
        'Ekim',
        'Kasım',
        'Aralık',
      ],
      monthNamesShort: [
        'Oca',
        'Şub',
        'Mar',
        'Nis',
        'May',
        'Haz',
        'Tem',
        'Ağu',
        'Eyl',
        'Eki',
        'Kas',
        'Ara',
      ],
      dayNames: [
        'Pazartesi',
        'Salı',
        'Çarşamba',
        'Perşembe',
        'Cuma',
        'Cumartesi',
        'Pazar',
      ],
      dayNamesShort: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
      today: 'Bugün',
    };
    LocaleConfig.defaultLocale = 'tr';
  }

  openModal(open) {
    this.setState({
      modalVisible: open,
    });
  }

  render() {
    const { style, checkOutTime, onCancel, onChange } = this.props;
    const { modalVisible, checkInTime } = this.state;
    return (
      <View style={[styles.contentPickDate, style]}>
        <Modal
          isVisible={modalVisible}
          backdropColor="rgba(0, 0, 0, 0.5)"
          backdropOpacity={1}
          animationIn="fadeIn"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View style={styles.contentModal}>
            <View style={styles.contentCalendar}>
              <Calendar
                style={{
                  borderRadius: 8,
                }}
                markedDates={this.state.markedDates}
                current={moment().format('YYYY-MM-DD')}
                minDate={moment().format('YYYY-MM-DD')}
                maxDate={moment()
                  .add(1, 'M')
                  .format('YYYY-MM-DD')}
                onDayPress={day => {
                  this.setState({
                    markedDates: {
                      [day.dateString]: {
                        selected: true,
                        marked: true,
                        selectedColor: 'blue',
                      },
                    },
                    checkedDate: day.dateString,
                  });
                }}
                onDayLongPress={day => {
                  this.setState({
                    markedDates: {
                      [day]: {
                        selected: true,
                        marked: true,
                        selectedColor: 'blue',
                      },
                    },
                  });
                }}
                monthFormat={'dd-MM-yyyy'}
                onMonthChange={month => { }}
                theme={{
                  textSectionTitleColor: BaseColor.textPrimaryColor,
                  selectedDayBackgroundColor: BaseColor.primaryColor,
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: BaseColor.primaryColor,
                  dayTextColor: BaseColor.textPrimaryColor,
                  textDisabledColor: BaseColor.grayColor,
                  dotColor: BaseColor.primaryColor,
                  selectedDotColor: '#ffffff',
                  arrowColor: BaseColor.primaryColor,
                  monthTextColor: BaseColor.textPrimaryColor,
                  textDayFontFamily: FontFamily.default,
                  textMonthFontFamily: FontFamily.default,
                  textDayHeaderFontFamily: FontFamily.default,
                  textMonthFontWeight: 'bold',
                  textDayFontSize: 14,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 14,
                }}
              />
              <View style={styles.contentActionCalendar}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modalVisible: false });
                    onCancel();
                  }}>
                  <Text body1>Kapat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modalVisible: false });
                    onChange(this.state.checkedDate);
                  }}>
                  <Text body1 primaryColor>
                    Seç
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.itemPick} onPress={() => { }}>
          <Text caption1 light style={{ marginBottom: 5 }}>
            Bugün
          </Text>
          <Text headline semibold>
            {checkInTime}
          </Text>
        </TouchableOpacity>
        <View style={styles.linePick} />
        <TouchableOpacity
          style={styles.itemPick}
          onPress={() => this.openModal(true)}>
          <Text caption1 light style={{ marginBottom: 5 }}>
            Son Tarih
          </Text>
          <Text headline semibold>
            {(checkOutTime || '')
              .split('-')
              .reverse()
              .join('.')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ExpertiseDatePicker.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  checkInTime: PropTypes.string,
  checkOutTime: PropTypes.string,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
};

ExpertiseDatePicker.defaultProps = {
  style: {},
  checkInTime: new Date().toLocaleDateString('tr'),
  checkOutTime: new Date().toLocaleDateString('tr'),
  onCancel: () => { },
  onChange: () => { },
};
