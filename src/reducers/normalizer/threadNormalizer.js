import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users');
const message = new schema.Entity('messages');
const thread = new schema.Entity('threads', {
  friend: user,
  messages: [message],
});

const threadList = [thread];

export default {
  getItem: data => normalize(data, thread),
  getList: data => normalize(data, threadList),
};
