import api from './api';

export const FETCH_MESSAGES_BEGIN = 'FETCH_MESSAGES_BEGIN';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_ERROR = 'FETCH_MESSAGES_ERROR';
export const SEND_MESSAGE_BEGIN = 'SEND_MESSAGE_BEGIN';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';

export const fetchMessagesBegin = () => ({
  type: FETCH_MESSAGES_BEGIN,
});

export const fetchMessagesSuccess = data => ({
  type: FETCH_MESSAGES_SUCCESS,
  data,
});

export const fetchMessagesError = data => ({
  type: FETCH_MESSAGES_ERROR,
  data,
});

export const sendMessageBegin = () => ({
  type: SEND_MESSAGE_BEGIN,
});

export const sendMessageSuccess = data => ({
  type: SEND_MESSAGE_SUCCESS,
  data,
});


export const fetchMessages = threadId => async (dispatch) => {
  dispatch(fetchMessagesBegin());

  const result = await api.getMessages(threadId);
  const { errors } = result;

  if (errors) dispatch(fetchMessagesError(result));
  else dispatch(fetchMessagesSuccess(result));
};

export const sendMessage = (threadId, text) => async (dispatch) => {
  dispatch(sendMessageBegin());
  dispatch(sendMessageSuccess(await api.sendMessage(threadId, text)));
};
