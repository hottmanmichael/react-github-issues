
import { combineReducers } from 'redux';

import ui from './ui';

const appReducer = combineReducers({
    ui: ui
});

export default function(state, action) {
    if (action.type === 'LOGOUT_USER') {
        state = undefined;
    }
    return appReducer(state, action);
}
