import {SAVE_USER_INFO, REG_USER, LOGOUT} from 'redux/constants';

const initialState = {
  user:null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_INFO:
      return {...state, user: action.payload};
    case REG_USER:
      return {...state, user: action.payload};
      case LOGOUT:
        console.log('ehere')
        console.log(action.payload)
        return {...state, user:null};
      return state;

    default:
      return state;
  }
};
