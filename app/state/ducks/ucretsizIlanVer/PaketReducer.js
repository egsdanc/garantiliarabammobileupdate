import {useDispatch} from 'react-redux';
import {useCallback, useEffect} from 'react';

/** used to comment */
export const Types = {
  SET_PAKET: 'SET_PAKET',
  RESET_PAKET: 'RESET_PAKET',
};
export const setPaket = payload => ({
  type: Types.SET_PAKET,
  payload,
});

export const resetPaket = () => ({
  type: Types.RESET_PAKET,
});

const initialState = {};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SET_PAKET:
      return action.payload;
    case Types.RESET_PAKET:
      return {};
    default:
      return state;
  }
};

export const usePaket = ({navigation}) => {
  // let params = navigation.getParam("params") || {};
  // params.yil = params.yil || "2019";
  const dispatch = useDispatch();
  // const {error, loading, data} = useSelector((state) => state.PaketReducer);
  /** action */
  const resetPaketBound = useCallback(a => dispatch(resetPaket(a)), [dispatch]);
  /** action */
  const setPaketBound = useCallback(a => dispatch(setPaket(a)), [dispatch]);
  /** didmount */
  useEffect(() => {
    resetPaketBound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    actions: {setPaket: setPaketBound, resetPaket: resetPaketBound},
  };
};
