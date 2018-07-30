import api from './api';
import localStorage from './localStorage';

export const LOGOUT = 'LOGOUT';
export const FETCH_LOGIN_BEGIN = 'FETCH_LOGIN_BEGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_ERROR = 'FETCH_LOGIN_ERROR';

export const fetchLoginBegin = (email, password) => ({
  type: FETCH_LOGIN_BEGIN,
  email,
  password,
});

export const fetchLoginSuccess = (token, profile) => ({
  type: FETCH_LOGIN_SUCCESS,
  token,
  profile,
});

export const fetchLoginError = data => ({
  type: FETCH_LOGIN_ERROR,
  data,
});

export const fetchLogin = (email, password) => async (dispatch, getState) => {
  const { login: { isFetching } } = getState();

  if (!isFetching) {
    localStorage.removeToken();
    dispatch(fetchLoginBegin(email, password));

    const result = await api.login(email, password);
    const { accessToken: token, errors } = result;

    if (errors) dispatch(fetchLoginError(result));
    else {
      localStorage.setToken(token);
      api.setToken(token);

      dispatch(fetchLoginSuccess(token, await api.profile()));
    }
  }
};

export const initialToken = () => async (dispatch) => {
  const token = localStorage.getToken();
  if (token) {
    api.setToken(token);
    dispatch(fetchLoginSuccess(token, await api.profile()));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeToken();
  dispatch({
    type: LOGOUT,
  });
};
