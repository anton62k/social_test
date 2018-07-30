import React from 'react';
import PropTypes from 'prop-types';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from '../pages/LoginPage';
import BasePage from '../pages/BasePage';
import loginSelector from '../selectors/login';

const Main = ({ isAuth, location: { pathname } }) => (
  <div className="main">
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route
        path="/"
        render={() => (
          isAuth ? (
            <BasePage />
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { referrer: pathname },
            }}
            />
          )
        )}
      />
    </Switch>
  </div>
);

const mapStateToProps = state => ({
  isAuth: loginSelector.getToken(state) !== null,
});

Main.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps)(Main));
