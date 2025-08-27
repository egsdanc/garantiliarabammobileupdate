import {useDispatch} from 'react-redux';
import {useCallback, useEffect} from 'react';

/** used to comment */
export const Types = {
  SET_OZELLIK: 'SET_OZELLIK',
  RESET_OZELLIK: 'RESET_OZELLIK',
};
export const setOzellik = payload => ({
  type: Types.SET_OZELLIK,
  payload,
});

export const resetOzellik = photos => ({
  type: Types.RESET_OZELLIK,
});

const initialState = {};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SET_OZELLIK:
      return action.payload;
    case Types.RESET_OZELLIK:
      return {};
    default:
      return state;
  }
};

export const useOzellik = ({navigation}) => {
  const dispatch = useDispatch();
  // const {error, loading, data} = useSelector((state) => state.OzellikReducer);
  /** action */
  const resetOzellikBound = useCallback(() => dispatch(resetOzellik()), [
    dispatch,
  ]);
  /** action */
  const setOzellikBound = useCallback(a => dispatch(setOzellik(a)), [dispatch]);
  /** didmount */
  useEffect(() => {
    resetOzellik();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    actions: {setOzellik: setOzellikBound, resetOzellik: resetOzellikBound},
  };
};
