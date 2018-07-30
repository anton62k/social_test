import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { getMessageById, getUserById } from '../selectors/index';


const MessageItem = ({ message, user }) => (
  <div className="message-item">
    <div className="message-item-nick">
      {user.get('firstName')} {user.get('lastName')}
    </div>
    <div className="message-item-text">
      {message.get('text')}
    </div>
  </div>
);

MessageItem.propTypes = {
  message: PropTypes.instanceOf(Map).isRequired,
  user: PropTypes.instanceOf(Map).isRequired,
};

const mapStateToProps = (state, props) => {
  const { id } = props;
  const message = getMessageById(state, id);
  return {
    message,
    user: getUserById(state, message.get('userId')),
  };
};

export default connect(mapStateToProps)(MessageItem);
