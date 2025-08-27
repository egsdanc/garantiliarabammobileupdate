import withProps from './withProps';
import React, {useCallback, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {BaseColor} from '@config';
import {defaultTo, merge, mergeAll} from 'ramda';
export const withPagination = (fn = undefined) =>
  withProps(
    ({
      fetch = ({pageSize, pageNumber, totalCount}) =>
        console.error(
          'provide fetch function with {pageSize, pageNumber, totalCount} params to wrapped Component',
        ),
      data = [],
      totalCount = 0,
      pageSize = 20,
      pageNumber = 0,
      loading = false,
      onEndReachedThreshold,
      onEndReached,
      sortParams,
      filterParams,
    }) => {
      const merger = useCallback(
        () =>
          fn
            ? fn(sortParams, filterParams)
            : merge(defaultTo({}, sortParams), defaultTo({}, filterParams)),
        [sortParams, filterParams],
      );
      /** sonraki request yamasi ichin hazirlandi */
      const onEndReachedBound = useCallback(
        ({distanceFromEnd}) => {
          distanceFromEnd > 0 &&
            fetch &&
            fetch(mergeAll([{pageSize, pageNumber: pageNumber + 1}, merger()])); // reducerden gelen fonksıyon
          onEndReached && onEndReached(); // normal propsların geçmesıne ızın vermek
        },
        [fetch, pageSize, pageNumber, merger, onEndReached],
      );
      const onRefresh = useCallback(() => {
        fetch && fetch(mergeAll([{pageSize, pageNumber: 0}, merger()]));
      }, [fetch, merger, pageSize]);
      useEffect(() => {
        onRefresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [sortParams, filterParams]);
      // totalCount === !0 &&
      // totalCount !== data.length &&
      // data.length > 0 &&
      // onEndReachedBound,
      const onEndReachedThresholdComputed =
        (0.9 - data.length / totalCount) / 2;
      return {
        data: data,
        loading,
        onEndReached: onEndReachedBound,
        onEndReachedThreshold:
          onEndReachedThreshold || onEndReachedThresholdComputed,
        refreshControl: (
          <RefreshControl
            colors={[BaseColor.primaryColor]}
            tintColor={BaseColor.primaryColor}
            refreshing={loading}
            onRefresh={onRefresh}
          />
        ),
      };
    },
  );

export default withPagination;
