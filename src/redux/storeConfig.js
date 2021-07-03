import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers, applyMiddleware, createStore} from 'redux';
import {authReducer} from 'redux/reducer';
import {persistReducer, persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(createLogger()));

let persistedStore = persistStore(store);

export {store, persistedStore};
