import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from './reducers';
import createSagaMiddleware from 'redux-saga'
import storage from '@react-native-async-storage/async-storage'; //  AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { Sagas } from "./sagas"
import whiteList from './whiteList';
import { persistStore, persistReducer } from 'redux-persist';


const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: whiteList,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

// init store with redux persist
persistStore(store);

sagaMiddleware.run(Sagas)

export default store;