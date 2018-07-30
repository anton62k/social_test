import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { getMessagesByThread, getThreadById } from '../selectors/index';
import { fetchMessages, sendMessage } from '../actions/messages';
import MessageItem from '../components/MessageItem';

const MAX_LENGTH_TEXT = 64;
const PLACEHOLDER = 'Введите сообщение';

class MessagesPage extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { text: '' };
  }

  componentDidMount() {
    const { requestMessages } = this.props;
    requestMessages();
  }

  onChange(e) {
    const text = e.target.value;
    this.setState({ text: text.substr(0, MAX_LENGTH_TEXT) });
  }

  onSubmit(e) {
    const { text } = this.state;
    const { onSend } = this.props;
    onSend(text);

    this.setState({ text: '' });
    e.preventDefault();
  }

  render() {
    const { text } = this.state;
    const { messages, available } = this.props;

    if (available) {
      return (
        <div>
          {messages.valueSeq().map(item => (
            <MessageItem key={item.get('id')} id={item.get('id')} />
          ))}
          <form onSubmit={this.onSubmit} className="message-form">
            <input
              placeholder={PLACEHOLDER}
              className="message-input"
              type="text"
              name=""
              value={text}
              onChange={this.onChange}
            />
          </form>
        </div>
      );
    }
    return null;
  }
}

MessagesPage.propTypes = {
  available: PropTypes.bool.isRequired,
  messages: PropTypes.instanceOf(Map).isRequired,
  onSend: PropTypes.func.isRequired,
  requestMessages: PropTypes.func.isRequired,
};

const getThreadId = (props) => {
  const { match: { params: { threadId } } } = props;
  return parseInt(threadId, 10);
};

const mapStateToProps = (state, props) => {
  const threadId = getThreadId(props);
  return {
    available: Boolean(getThreadById(state, threadId)),
    messages: getMessagesByThread(state, parseInt(threadId, 10)),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const threadId = getThreadId(props);
  return {
    requestMessages: () => dispatch(fetchMessages(threadId)),
    onSend: message => dispatch(sendMessage(threadId, message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
