import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/index';

export const ReduxProvider = ({ children }) => (
    <Provider store={store}>
        {children}
    </Provider>
); 