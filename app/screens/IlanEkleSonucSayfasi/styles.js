import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  navigationItemActive: {
    backgroundColor: BaseColor.black,
    height: 30,
    borderRadius: 10,
    marginLeft: 20,
  },
  navigationItem: {
    color: '#ffffff',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 15,
    marginTop: 5,
  },
  map: {
    height: 700,
    width: 700,
  },
  modal: {
    position: 'absolute',
    zIndex: 100,
    elevation: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150,
  },
  modalContent: {
    padding: 20,
    backgroundColor: BaseColor.whiteColor,
  },
  modalBtn: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {height: 1},
    shadowColor: BaseColor.grayColor,
    shadowOpacity: 1.0,
    backgroundColor: BaseColor.whiteColor,
    marginVertical: 10,
  },
  modalBtnRed: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {height: 1},
    shadowColor: BaseColor.grayColor,
    shadowOpacity: 1.0,
    backgroundColor: 'red',
    marginVertical: 10,
  },
  //form 
  form: {
    padding: 20,
    width: '100%',
    height: 260
  },
  selectInput:{
    marginBottom: 10
  }
});
