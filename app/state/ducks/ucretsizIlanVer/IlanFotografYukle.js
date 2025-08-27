import {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

/** used to comment */
export const Types = {
  UPLOAD_PHOTOS_TO_STATE: 'UPLOAD_PHOTOS_TO_STATE',
  RESET_PHOTOS: 'RESET_PHOTOS',
};

export const uploadPhotosToState = photos => ({
  type: Types.UPLOAD_PHOTOS_TO_STATE,
  payload: photos,
});

export const resetPhotos = () => ({
  type: Types.RESET_PHOTOS,
});

const initialState = [];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.UPLOAD_PHOTOS_TO_STATE:
      return action.payload;
    case Types.RESET_PHOTOS:
      return [];
    default:
      return state;
  }
};

export const useIlanFotografYukle = ({navigation}) => {
  // let params = navigation.getParam('params') || {};
  // params.yil = params.yil || "2019";
  const dispatch = useDispatch();
  // const {error, loading, data} = useSelector(state => state.IlanFotografYukle);
  /** action */
  const resetPhotosBound = useCallback(a => dispatch(resetPhotos(a)), [
    dispatch,
  ]);
  /** action */
  const uploadPhotosToStateBound = useCallback(
    a => dispatch(uploadPhotosToState(a)),
    [dispatch],
  );
  /** didmount */
  useEffect(() => {
    resetPhotosBound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    actions: {
      uploadPhotosToState: uploadPhotosToStateBound,
      resetPhotos: resetPhotosBound,
    },
  };
};
