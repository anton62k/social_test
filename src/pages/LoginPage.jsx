import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import LoginInfo from '../components/LoginInfo';
import loginSelector from '../selectors/login';

const LoginPage = ({ isAuth, location: { state } }) => (
  isAuth
    ? <Redirect to={(state && state.referrer) || '/profile'} />
    : (
      <React.Fragment>
        <LoginForm />
        <LoginInfo />
      </React.Fragment>
    )
);

LoginPage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      referrer: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  isAuth: loginSelector.getToken(state) !== null,
});

export default withRouter(connect(mapStateToProps)(LoginPage));
