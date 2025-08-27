import React, { useState, useCallback, useEffect } from 'react';
import { Animated, FlatList } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, CarItem } from '@components';
import {
  Block,
  Text,
  Icon,
  TouchableOpacity,
  TextInput,
  Button as Btn,
} from '@common';
import styles from './styles';
import Sort from './Sort';
import { useSearchAll } from '../../state/ducks/KategoryAramaSonuc';
import { compose, withLoadingScreen, withPagination, withProps } from '@hocs';
import {
  useSearchManagerRemover,
  useSearchManagerSaver,
} from '../../state/ducks/SearchManager';
const defaultSorting = 'newDatesFirst';
const defaultFiltering = {};
const NameInput = ({ onFinish = () => { } }) => {
  const [val, setName] = useState('');
  const [error, setError] = useState('');
  const onChangeText = useCallback(value => {
    setName(value);
  }, []);
  const onSubmit = useCallback(() => {
    if (val) {
      onFinish(val);
      setError('');
      setName('');
    } else {
      setError('Boş olamaz!');
    }
  }, [onFinish, val]);
  return (
    <Block style={{ width: '100%' }}>
      <TextInput
        value={val}
        onChangeText={onChangeText}
        error={error}
        label="İsim"
        renderRight={null}
      />
      <Btn onPress={onSubmit} primaryColor mt2>
        Kaydet
      </Btn>
    </Block>
  );
};
/** used to navigate from saved place */
//navigation.navigate('SearchResults', {modelIds, sort, filter, favId: ${id} });
const AnimatedFlatListPaginated = compose(
  withPagination((s, f) => ({ sorting: s, filtering: f })),
  withLoadingScreen({}),
)(FlatList);

export const SearchResults = compose(
  withProps(({ navigation, route }) => useSearchAll({ navigation, route })),
  withProps(({ navigation, route }) => {
    const favId = route?.params?.favId || false;
    return {
      favId,
    };
  }),
  withProps(useSearchManagerSaver),
  withProps(useSearchManagerRemover),
  React.forwardRef,
)(
  (
    {
      navigation,
      route,
      data,
      loading,
      pageNumber,
      totalCount,
      searchAll,
      modelIds,
      favId = false,
      screenProps,
      saveToSearchList,
      removeFromSearchList,
    },
    _,
  ) => {
    const innerRef = React.useRef(null);
    const attachRef = el => {
      innerRef.current = el;
    };
    const defSort = route?.params?.sorting || defaultSorting;
    const defFilter = route?.params?.filtering || defaultFiltering;
    const [sortParams, setSortParams] = useState(defSort);
    const [filterParams, setFilterParams] = useState(defFilter);
    const [modeView, setModeView] = useState('list');
    /** used to scroll to top when fılterıng or sortıng changed */
    useEffect(() => {
      innerRef?.current?.scrollToOffset({ animated: true, offset: 0 });
    }, [filterParams, sortParams]);
    const onChange = useCallback(a => {
      setSortParams(a);
    }, []);
    const onFilter = useCallback(() => {
      navigation.navigate('SearchResultsFilter', {
        modelIds: modelIds || {},
        defaultFilter: filterParams,
        onFilter: a => {
          setFilterParams(a);
        },
      });
    }, [filterParams, modelIds, navigation]);
    const onChangeView = useCallback(() => {
      setModeView(modeView === 'list' ? 'grid' : 'list');
    }, [modeView]);
    const goToDetail = useCallback(
      params => () => {
        if (params && params.ad_code) {
          navigation.navigate('CarDetail', params);
        }
      },
      [navigation],
    );
    const resolve = useCallback(
      (msg, fn = () => { }) => {
        screenProps.openModalSuccess({
          body: () => (
            <Block>
              <Text m4 p4>
                {msg?.message || 'Başarıyla Kaydedilmiştir'}
              </Text>
            </Block>
          ),
          onClose: fn,
        });
      },
      [screenProps],
    );
    const reject = useCallback(
      (msg, fn = () => { }) => {
        screenProps.openModalError({
          body: () => {
            return (
              <Block>
                <Text m4 p4>
                  {msg || 'Beklemedik Hata Oluştu'}
                </Text>
              </Block>
            );
          },
          onClose: fn,
        });
      },
      [screenProps],
    );
    const saveHelper = useCallback(
      name => {
        saveToSearchList(
          {
            name,
            metadata: { filtering: filterParams, sorting: sortParams, modelIds: modelIds || {} },
          },
          resolve,
          reject,
        );
        screenProps.closeModal();
      },
      [
        filterParams,
        modelIds,
        reject,
        resolve,
        saveToSearchList,
        screenProps,
        sortParams,
      ],
    );
    const saveSearch = useCallback(() => {
      screenProps.openModal({
        body: () => <NameInput onFinish={saveHelper} />,
      });
    }, [saveHelper, screenProps]);
    const removeSearch = useCallback(() => {
      removeFromSearchList(
        favId,
        msg => {
          resolve(msg, () => {
            setFilterParams(defaultFiltering);
            setSortParams(defaultSorting);
            navigation.setParams({
              sorting: defaultSorting,
              filtering: defaultFiltering,
              favId: false,
            });
          });
        },
        reject,
      );
    }, [favId, navigation, reject, removeFromSearchList, resolve]);
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
        <Header
          title="Arama Sonuçları"
          subTitle={`${totalCount || 0} sonuç`}
          renderLeft={() => (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          )}
          renderRight={() => (
            <Text color={BaseColor.primaryColor}>
              {favId ? 'Sil' : 'Kaydet'}
            </Text>
          )}
          onPressLeft={() => navigation.goBack()}
          onPressRight={favId ? removeSearch : saveSearch}
        />
        <Block>
          <AnimatedFlatListPaginated
            data={data || []}
            sortParams={sortParams}
            filterParams={filterParams}
            removeClippedSubviews
            pageSize={20}
            pageNumber={pageNumber}
            totalCount={totalCount}
            ListEmptyComponent={() => {
              return <Text center>Sonuç bulunamadı</Text>;
            }}
            fetch={searchAll}
            loading={loading}
            ref={attachRef}
            contentContainerStyle={{
              paddingTop: 50,
              paddingBottom: 20,
            }}
            {...modeView === 'grid' && {
              columnWrapperStyle: { marginHorizontal: 20 },
              numColumns: 2,
            }}
            scrollEventThrottle={1}
            key={modeView}
            keyExtractor={item => (item?.id || item?.ad_code || Math.random()) + ''}
            renderItem={({ item, index }) => (
              <CarItem
                grid={modeView === 'grid'}
                image={item?.thumb || ''}
                name={item?.ad_title || ''}
                title={item?.car_model || ''}
                price={item?.ad_price || ''}
                km={item?.ad_km || ''}
                style={[
                  modeView === 'grid' && {
                    marginBottom: 10,
                    marginLeft: index % 2 ? 15 : 0,
                  },
                  modeView === 'list' && {
                    marginBottom: 20,
                    paddingHorizontal: 20,
                  },
                ]}
                specialCaseText={
                  item?.isCorrect
                    ? 'h'
                    : item?.isExpertise
                      ? 'e'
                      : item?.iTrustMyCar
                        ? 'g'
                        : ''
                }
                onPress={item ? goToDetail(item) : () => { }}
              />
            )}
          />
          <Animated.View style={[styles.navbar]}>
            <Block row space="between" py4>
              <Sort onChange={onChange} value={sortParams} options={[
                {
                  value: 'newDatesFirst',
                  icon: 'sort-amount-down',
                  text: 'Önce yeni ilanlar',
                },
                {
                  value: 'newDatesLast',
                  icon: 'sort-amount-up',
                  text: 'Önce eski ilanlar',
                },
                {
                  value: 'kmLessFirst',
                  icon: 'sort-amount-down',
                  text: 'Önce Km`si düşük',
                },
                {
                  value: 'kmLessLast',
                  icon: 'sort-amount-up',
                  text: 'Önce Km`si yüksek',
                },
                {
                  value: 'priceLowFirst',
                  icon: 'sort-amount-down',
                  text: 'Önce fiyatı düşük',
                },
                {
                  value: 'priceLowLast',
                  icon: 'sort-amount-up',
                  text: 'Önce fiyatı yüksek',
                },
              ]} />
              <Block row center>
                <TouchableOpacity
                  onPress={onChangeView}
                  style={{
                    width: 30,
                    height: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name={modeView === 'list' ? 'th-large' : 'th-list'}
                    size={16}
                    color={BaseColor.grayColor}
                    solid
                  />
                </TouchableOpacity>
                <Block flex={false} style={styles.line} />
                <TouchableOpacity
                  flex={false}
                  onPress={onFilter}
                  style={styles.contentFilter}>
                  <Icon
                    name="filter"
                    size={16}
                    color={BaseColor.grayColor}
                    solid
                  />
                  <Text headline grayColor style={{ marginLeft: 5 }}>
                    Filtrele
                  </Text>
                </TouchableOpacity>
              </Block>
            </Block>
          </Animated.View>
        </Block>
      </SafeAreaView>
    );
  },
);

export default SearchResults;
