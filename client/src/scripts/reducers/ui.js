/* eslint-disable */
import {UI} from '../helpers/reduxConstants';

const initialState = {
  alerts: [],
  sections: [],
  current_section: 'home'
};

function ui(state = initialState, action) {
  switch (action.type) {
    case UI.IS_LOADING:
      return Object.assign({}, state, {
        isLoading: true
      });
    case UI.IS_LOADING_COMPLETE:
      return Object.assign({}, state, {
        isLoading: false
      });
    case UI.UPDATE_PAGE:
      return Object.assign({}, state, {
        current_section: action.page,
        isUpdatingPage: true
      });
    case UI.UPDATE_PAGE_COMPLETE:
      return Object.assign({}, state, {
        isUpdatingPage: false
      });
    default: return state;
  }
}

//
// class UIAlert {
//     constructor(type, msg) {
//         this.type = type;
//         this.msg = msg;
//     }
// }

// const alertInit = new UIAlert('warning', 'An error has occured.');
// function alert(state = alertInit, action) {
//     switch(action.type) {
//         case UI.ALERT_ERROR:
//             return new UIAlert('error', action.msg);
//             break;
//         case UI.ALERT_SUCCESS:
//             return new UIAlert('success', action.msg);
//             break;
//         default: return state;
//     }
// }
//
export default ui;
