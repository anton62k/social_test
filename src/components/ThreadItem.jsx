import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';
import { getLastMessageByThread, getOwnUser, getUserByThreadId } from '../selectors/index';

const OWN_TEXT = 'Я: ';

const Message = ({ text, isOwn }) => (
  <div className="thread-item-message">{isOwn ? OWN_TEXT : ''}{text}</div>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isOwn: PropTypes.bool.isRequired,
};

const ThreadItem = ({
  threadId, isOwn, user, message,
}) => (
  <Link to={`/threads/${threadId}/`} className="thread-item">
    <div className="thread-item-nick">{user.get('firstName')} {user.get('lastName')}</div>

    {message && message.get('text')
      ? <Message text={message.get('text')} isOwn={isOwn} /> : null}
  </Link>
);

ThreadItem.propTypes = {
  isOwn: PropTypes.bool,
  user: PropTypes.instanceOf(Map).isRequired,
  message: PropTypes.instanceOf(Map),
  threadId: PropTypes.number.isRequired,
};

ThreadItem.defaultProps = {
  message: undefined,
  isOwn: false,
};

const mapStateToProps = (state, { threadId }) => {
  const message = getLastMessageByThread(state, threadId);

  return {
    isOwn: message && (getOwnUser(state).get('id') === message.get('userId')),
    user: getUserByThreadId(state, threadId),
    message,
  };
};

export default connect(mapStateToProps)(ThreadItem);
