import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';
import payment from './Payment';
import product from './product';
import user from './user';

const persistConfig = {
  key: 'root',
  storage: session,
  whitelist: ['user'],
};

const rootReducer = combineReducers({ user, product, payment });
export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
