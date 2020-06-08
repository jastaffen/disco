import { combineReducers } from 'redux';

import user from './user';
import categories from './categories';
import alerts from './alerts';

export default combineReducers({
    user,
    categories,
    alerts
});