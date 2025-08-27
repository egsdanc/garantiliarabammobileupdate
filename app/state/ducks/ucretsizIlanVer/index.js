const {combineReducers} = require('redux');
import KategoriReducer from './KategoriReducer';
import IlanFotografYukle from './IlanFotografYukle';
import IletisimReducer from './IletisimReducer';
import OzellikReducer from './OzellikReducer';
import PaketReducer from './PaketReducer';

export default combineReducers({
  KategoriReducer,
  IlanFotografYukle,
  IletisimReducer,
  OzellikReducer,
  PaketReducer,
});
