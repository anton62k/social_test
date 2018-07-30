import api from './api';

export const FETCH_THREADS_BEGIN = 'FETCH_THREADS_BEGIN';
export const FETCH_THREADS_SUCCESS = 'FETCH_THREADS_SUCCESS';
export const FETCH_THREADS_ERROR = 'FETCH_THREADS_ERROR';

export const fetchThreadsBegin = () => ({
  type: FETCH_THREADS_BEGIN,
});

export const fetchThreadsSuccess = data => ({
  type: FETCH_THREADS_SUCCESS,
  data,
});

export const fetchThreadsError = data => ({
  type: FETCH_THREADS_ERROR,
  data,
});

export const fetchThreads = () => async (dispatch) => {
  dispatch(fetchThreadsBegin());

  const result = await api.getThreads();
  const { data, errors } = result;

  if (errors) dispatch(fetchThreadsError(result));
  else dispatch(fetchThreadsSuccess(data));
};
