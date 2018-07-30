import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { getOwnUser } from '../selectors/index';

const ProfilePage = ({ user }) => (
  <div className="profile-text">
    {user.get('firstName')} {user.get('lastName')}
  </div>
);

ProfilePage.propTypes = {
  user: PropTypes.instanceOf(Map).isRequired,
};

const mapStateToProps = state => ({
  user: getOwnUser(state),
});

export default connect(mapStateToProps)(ProfilePage);
