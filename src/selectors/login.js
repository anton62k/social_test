const getToken = state => state.login.get('token');

const getIsFetching = state => state.login.get('isFetching');

const getError = state => state.login.get('error');

const getUserId = state => state.login.get('userId');

export default {
  getToken,
  getIsFetching,
  getError,
  getUserId,
};
