import { combineReducers } from 'redux';
import payment from './Payment';
import product from './product';
import user from './user';
const rootReducer = combineReducers({ user, product, payment });
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
