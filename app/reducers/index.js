import { combineReducers } from 'redux';
import * as ducks from '../state/ducks';
import register from './register';

// ducks içindeki tüm reducer'ları combineReducers'a ekle
const rootReducer = combineReducers({
  register,
  ...ducks,
});

export default rootReducer;
