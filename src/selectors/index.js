import loginSelector from './login';

export const getCollection = (state, collectionId) => state.entities.get(collectionId);

export const getEntity = (state, collectionId, entityId) => {
  const collection = state.entities.get(collectionId);
  return collection ? collection.get(String(entityId)) : null;
};

export const getThreads = state => getCollection(state, 'threads');

export const getUsers = state => getCollection(state, 'users');

export const getMessages = state => getCollection(state, 'messages');

export const getMessagesByThread = (state, threadId) => getMessages(state)
  .filter(value => value.get('threadId') === threadId)
  .toOrderedMap()
  .sortBy(item => item.get('id'));

export const getLastMessageByThread = (state, threadId) => getMessagesByThread(state, threadId)
  .last();

export const getUserByThreadId = (state, threadId) => {
  const thread = getThreads(state).get(threadId.toString());
  return getUsers(state).get(thread.get('friend').toString());
};

export const getThreadById = (state, threadId) => getEntity(state, 'threads', threadId);

export const getSortedThreads = state => getThreads(state)
  .sortBy(item => item.get('id'));

export const getMessageById = (state, messageId) => getEntity(state, 'messages', messageId);

export const getUserById = (state, userId) => getEntity(state, 'users', userId);

export const getOwnUser = state => getEntity(state, 'users', loginSelector.getUserId(state));
