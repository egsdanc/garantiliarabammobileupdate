import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

/** used to comment */
export const Types = {
  SET_KATEGORI: 'SET_KATEGORI',
  RESET_KATEGORI: 'RESET_KATEGORI',
};

export const setKategori = payload => ({
  type: Types.SET_KATEGORI,
  payload,
});

export const resetKategori = photos => ({
  type: Types.RESET_KATEGORI,
});

const initialState = '';

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SET_KATEGORI:
      return action.payload;
    case Types.RESET_KATEGORI:
      return [];
    default:
      return state;
  }
};

export const useKategori = ({navigation}) => {
  const dispatch = useDispatch();
  // const {} = useSelector((state) => state.KategoriReducer);
  /** action */
  const setKategoriBound = useCallback(a => dispatch(setKategori(a)), [
    dispatch,
  ]);
  /** action */
  const resetKategoriBound = useCallback(() => dispatch(resetKategori()), [
    dispatch,
  ]);
  /** didmount */
  useEffect(() => {
    resetKategoriBound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    setKategoriBound: setKategoriBound,
    resetKategori: resetKategoriBound,
  };
};
