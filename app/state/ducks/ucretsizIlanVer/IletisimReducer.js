import {useDispatch} from 'react-redux';
import {useCallback, useEffect} from 'react';

/** used to comment */
export const Types = {
  SET_ILETISIM: 'SET_ILETISIM',
};
export const setIletisim = payload => ({
  type: Types.SET_ILETISIM,
  payload,
});

const initialState = {};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SET_ILETISIM:
      return action.payload;
    default:
      return state;
  }
};
export const useIletisim = ({navigation}) => {
  //  let params = navigation.getParam("params") || {};
  // params.yil = params.yil || "2019";
  const dispatch = useDispatch();
  //  const {error, loading, data} = useSelector((state) => state.IletisimReducer);
  /** action */
  const setIletisimBound = useCallback(a => dispatch(setIletisim(a)), [
    dispatch,
  ]);
  /** didmount */
  useEffect(() => {
    setIletisimBound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    actions: {
      setIletisim: setIletisimBound,
    },
  };
};
