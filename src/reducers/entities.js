import { fromJS, Map } from 'immutable';
import { FETCH_LOGIN_SUCCESS, LOGOUT } from '../actions/login';
import { FETCH_MESSAGES_SUCCESS, SEND_MESSAGE_SUCCESS } from '../actions/messages';
import { FETCH_THREADS_SUCCESS } from '../actions/threads';
import threadNormalizer from './normalizer/threadNormalizer';

const initialState = Map(fromJS({
  users: {},
  threads: {},
  messages: {},
}));

const entitiesReducer = (state = initialState, action) => {
  const { data, type } = action;

  switch (type) {
    case FETCH_THREADS_SUCCESS:
      const { entities: threadsResponse } = threadNormalizer.getList(data);
      return state.mergeDeep(Map(fromJS(threadsResponse)));

    case FETCH_MESSAGES_SUCCESS:
      const { entities: messagesResponse } = threadNormalizer.getItem(data);
      return state.mergeDeep(Map(fromJS(messagesResponse)));

    case SEND_MESSAGE_SUCCESS:
      return state.mergeDeep(Map(fromJS({
        messages: {
          [data.id]: data,
        },
      })));

    case FETCH_LOGIN_SUCCESS:
      const { profile } = action;
      return state.mergeDeep(Map(fromJS({
        users: {
          [profile.id]: profile,
        },
      })));

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default entitiesReducer;
