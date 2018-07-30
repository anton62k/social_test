import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLogin } from '../actions/login';
import loginSelector from '../selectors/login';

const DEFAULT_EMAIL = 'test1@test.com';
const DEFAULT_PASSWORD = 'test';

const Button = ({ onClick, disabled }) => (
  <button
    type="submit"
    className="blue-button left-item"
    onClick={onClick}
    disabled={disabled}
  >
    Enter
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const Input = ({
  type, value, onChange, disabled, isError,
}) => (
  <input
    className={`login-page-input login-page-item ${isError ? 'login-page-input-error' : ''}`}
    type={type}
    name={type}
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

const Title = ({ text }) => (
  <div className="login-page-label left-item">
    {text}
  </div>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

const Form = ({ children }) => (
  <div className="login-page-form">
    {children}
  </div>
);

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);

    this.state = { email: DEFAULT_EMAIL, password: DEFAULT_PASSWORD };
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onLogin() {
    const { email, password } = this.state;
    const { onLogin } = this.props;
    onLogin(email, password);
  }

  render() {
    const { email, password } = this.state;
    const { isError, disabled } = this.props;
    return (
      <Form>
        <Title text="Email" />
        <Input
          type="email"
          value={email}
          onChange={this.onChangeEmail}
          disabled={disabled}
          isError={isError}
        />
        <Title text="Password" />
        <Input
          type="password"
          value={password}
          onChange={this.onChangePassword}
          disabled={disabled}
          isError={isError}
        />
        <Button
          onClick={this.onLogin}
          disabled={disabled}
          isError={isError}
        />
      </Form>
    );
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  disabled: loginSelector.getIsFetching(state),
  isError: Boolean(loginSelector.getError(state)),
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(fetchLogin(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
