import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import devTools from 'remote-redux-devtools';

import rootReducer from './src/redux';

const persistConfig = {
  key: 'root',
  storage,
  debug: true, // for useful debug info
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState) {
  /**
   * Create store with remote-devtools. Do it only
   * in development to reduce performance issues.
   */
  if (__DEV__) {
    const finalCreateStore = compose(
      applyMiddleware(thunkMiddleware),
      devTools(),
    )(createStore);

    const store = finalCreateStore(persistedReducer, initialState);
    const persistor = persistStore(store);

    return {store, persistor};
  } else {
    const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore);
    const store = finalCreateStore(persistedReducer, initialState);
    const persistor = persistStore(store);

    return {store, persistor};
  }
}
