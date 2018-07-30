import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { getSortedThreads } from '../selectors/index';
import ThreadItem from '../components/ThreadItem';
import { fetchThreads } from '../actions/threads';

class ThreadsPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchThreads());
  }

  render() {
    const { items } = this.props;

    return (
      <React.Fragment>
        {items.valueSeq().map((item) => {
          const id = item.get('id');
          return <ThreadItem key={id} threadId={id} />;
        })}
      </React.Fragment>
    );
  }
}

ThreadsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.instanceOf(Map).isRequired,
};

const mapStateToProps = state => ({
  items: getSortedThreads(state),
});

export default connect(mapStateToProps)(ThreadsPage);
