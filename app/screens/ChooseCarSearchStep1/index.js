import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Text } from '@components';
import { Icon, TouchableOpacity, Text as Txt, Block } from '@common';
import LinearGradient from 'react-native-linear-gradient';
import Voice from '@react-native-voice/voice';
import {
  getCategoryList,
  setCategoryList,
  useCategoryList,
} from '../../state/ducks/KategoryArama/index';
import { useDispatch, useSelector } from 'react-redux';
import { compose, withProps, withLoadingScreen, withErrorHandler } from '@hocs';
import { slice, prop, map, join, pipe, equals } from 'ramda';
import { TextInput } from '../../commonComponents';
import { SpeechRecognizedEvent } from '@react-native-voice/voice';
import { SpeechErrorEvent } from '@react-native-voice/voice';
import { SpeechResultsEvent } from '@react-native-voice/voice';

const ListingPage = 'SearchResults';
const modelIds = 'modelIds';
const initial = { id: 1, title: 'Tüm Vasıta İlanları' };
const FlatListL = withLoadingScreen({})(FlatList);
let timeout;
const InitDelay = 3000;

const ChooseCarSearchSteper = ({ navigation, data = [], loading }, _) => {
  const [current, setCurrent] = useState([{ ...initial }]);
  const [searchedText, setSearchedText] = useState('');
  const [isTalking, setIsTalking] = useState(false);
  const handleTimeout = () => {
    setIsTalking(false);
    Voice.destroy();
    clearTimeout(timeout);
    // navigation.navigate(ListingPage, {
    //   sorting: 'newDatesLast',
    //   filtering: {
    //     kelime: searchedText,
    //   },
    //   modelIds: '--',
    // });
  };

  const setVoiceProps = () => {
    Voice.onSpeechStart = (e: any) => {
    };
    Voice.onSpeechRecognize = (e: SpeechRecognizedEvent) => {
    };
    Voice.onSpeechEnd = (e: any) => {
      clearTimeout(timeout);
    };
    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      clearTimeout(timeout);
    };
    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      if (e != null && e.value != undefined) {
        setSearchedText(e.value[0]);
        setTimeout(() => {
          navigation.navigate(ListingPage, {
            sorting: 'newDatesFirst',
            filtering: {
              kelime: e.value[0],
            },
            modelIds: '--',
          });
        }, 1500);
      }
    };
    Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
      if (e != null && e.value != undefined) {
        setSearchedText(e.value[0]);
        setTimeout(() => {
          navigation.navigate(ListingPage, {
            sorting: 'newDatesFirst',
            filtering: {
              kelime: e.value[0],
            },
            modelIds: '--',
          });
        }, 1500);
      }
    };
  };

  const dispatch = useDispatch();
  /** data bosh gelince listeleme sayfasina git */
  useEffect(() => {
    if (data.length === 0 && current.length !== 1) {
      dispatch(setCategoryList([{}]));
      navigation.navigate(ListingPage, {
        [modelIds]: pipe(
          map(prop('id')),
          join('-'),
        )(current),
      });
      setCurrent(slice(0, -1));
    }
    setVoiceProps();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [current, data, dispatch, navigation]);
  useEffect(() => {

    dispatch(getCategoryList(current.slice(-1)[0]?.id));
  }, [current, dispatch]);
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title="Kategori Seçimi"
        renderRight={() => {
          return (
            <TouchableOpacity
              px2
              flex={false}
              color="transparent"
              onPress={() => {
                setCurrent([{ ...initial }]);
              }}>
              <Icon
                type="ionicon"
                name="ios-reload"
                size={20}
                color="black"
                style={{ display: current.length > 1 ? 'flex' : 'none' }}
              />
            </TouchableOpacity>
          );
        }}
      />
      {current.length <= 1 && (
        <View style={{ padding: 5, height: 70 }} noflex>
          <TextInput
            value={searchedText}
            onChangeText={text => {
              setSearchedText(text);
            }}
            onSubmitEditing={event => {
              navigation.navigate(ListingPage, {
                sorting: 'newDatesFirst',
                filtering: {
                  kelime: searchedText,
                },
                modelIds: '--',
              });
            }}
            placeholder={'Kelime veya İlan numarası ile arama yapın'}
            renderRight={() => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (searchedText == '') {
                      //search
                      if (Voice.isAvailable()) {
                        Voice.stop();
                        Voice.start('tr-TR').then(() => {
                          setIsTalking(true);
                          timeout = setTimeout(handleTimeout, InitDelay);
                        });
                      }
                    } else {
                      setSearchedText('');
                    }
                  }}
                  center
                  middle>
                  <Icon
                    name={searchedText != '' ? 'times' : 'microphone'}
                    size={20}
                    color={
                      isTalking ? BaseColor.primaryColor : BaseColor.grayColor
                    }
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <View>

      </View>
      <Block noflex>
        <FlatListL
          data={data || []}
          ListHeaderComponent={() =>
            equals([initial], current) === false && (
              <TouchableOpacity
                smallCard
                row
                padding={[10, 10]}
                margin={[3, 10]}
                center
                space="between"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: BaseColor.fieldColor,
                }}
                onPress={() => {
                  navigation.navigate(ListingPage, {
                    [modelIds]: pipe(
                      map(prop('id')),
                      join('-'),
                    )(current),
                  });
                }}>
                <Text body1 style={{ color: '#000000' }}>
                  Tümünü Seç
                </Text>
                <Icon
                  name="arrow-right"
                  size={14}
                  color={BaseColor.primaryColor}
                />
              </TouchableOpacity>
            )
          }
          stickyHeaderIndices={[0]}
          loading={loading}
          keyExtractor={(item, index) => `${item?.id + index}`}
          renderItem={({ item }) =>
            item?.isActive && (
              <TouchableOpacity
                smallCard
                row
                padding={[10, 10]}
                margin={[3, 10]}
                center
                space="between"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: BaseColor.fieldColor,
                }}
                onPress={() => {
                  setCurrent(arr => [
                    ...arr,
                    { title: item?.title, id: item?.id },
                  ]);
                }}>
                <Text body1 style={{ color: '#000000' }}>
                  {item?.title}
                </Text>
                <Icon
                  name="arrow-right"
                  size={14}
                  color={BaseColor.primaryColor}
                />
              </TouchableOpacity>
            )
          }
        />
      </Block>
    </SafeAreaView>
  );
};
export default compose(
  withProps(() => {
    const { error, loading, data } = useSelector(state => state.KategoryArama);
    const { dismissError } = useCategoryList();
    return {
      dismissError,
      error,
      loading,
      data,
    };
  }),
  withErrorHandler,
  React.forwardRef,
)(ChooseCarSearchSteper);
