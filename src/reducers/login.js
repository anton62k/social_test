import { fromJS, Map } from 'immutable';
import {
  LOGOUT, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_BEGIN, FETCH_LOGIN_ERROR,
} from '../actions/login';

const initialState = Map(fromJS({ isFetching: false, token: null }));

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return state.set('token', null);

    case FETCH_LOGIN_BEGIN:
      return state.merge(fromJS({
        isFetching: true,
        error: null,
      }));

    case FETCH_LOGIN_SUCCESS:
      return state.merge(fromJS({
        isFetching: false,
        token: action.token,
        userId: action.profile.id,
        error: null,
      }));

    case FETCH_LOGIN_ERROR:
      return state.mergeDeep(fromJS({
        isFetching: false,
        token: null,
        error: action.data,
      }));

    default:
      return state;
  }
};

export default login;
