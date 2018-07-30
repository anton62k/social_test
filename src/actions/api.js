import axios from 'axios';

const http = axios.create({
  baseURL: 'http://82.202.226.25:3030/',
});

http.defaults.headers.post.Accept = 'application/json';
http.defaults.headers.post['Content-Type'] = 'application/json';

async function login(email, password) {
  try {
    const { data } = await http.post('authentication', {
      email,
      password,
      strategy: 'local',
    });
    return data;
  } catch (e) {
    return e.response.data;
  }
}

async function profile() {
  const { data } = await http.get('profile');
  return data;
}

async function getThreads() {
  const { data } = await http.get('conversation');
  return data;
}

async function getMessages(threadId) {
  const { data } = await http.get(`conversation/${threadId}`);
  return data;
}

async function sendMessage(threadId, text) {
  const { data } = await http.post('message', {
    threadId,
    text,
  });
  return data;
}

function setToken(token) {
  http.defaults.headers.common.Authorization = token;
}

export default {
  login,
  getThreads,
  getMessages,
  sendMessage,
  profile,
  setToken,
};
