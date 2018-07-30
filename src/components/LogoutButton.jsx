import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/login';

const LogoutButton = ({ onLogout }) => (
  <button type="button" onClick={onLogout} className="blue-button">
    Exit
  </button>
);

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(LogoutButton);
