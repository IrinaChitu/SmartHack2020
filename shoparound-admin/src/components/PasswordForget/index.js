import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    {/* <h1>PasswordForget</h1> */}
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.resetPassword();
    window.location.href = '/check-email';
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  resetPassword = async () => {
    const { email } = this.state;

    const error = await this.props.firebase.doPasswordReset(email);
    if (error === null) {
      this.setState({ ...INITIAL_STATE });
    } else {
      this.setState({ error });
    }
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <div>
        <div className="limiter">
          <div
            className="container-login100"
          >
            <div className="wrap-login100">
              <form
                className="login100-form validate-form"
                onSubmit={this.onSubmit}
              >
                <span className="login100-form-title p-b-34 p-t-27">
                  {' '}
                  Reset Password{' '}
                </span>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter username"
                >
                  <input
                    className="input100"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    placeholder="Email Address"
                  />
                  <span
                    className="focus-input100"
                    data-placeholder="&#xf207;"
                  ></span>
                </div>

                <div className="contact100-form-checkbox">
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                  />

                  {error && <p style={{ color: 'white' }}>{error.message}</p>}
                </div>

                <div className="container-login100-form-btn">
                  <button
                    className="login100-form-btn"
                    disabled={isInvalid}
                    type="submit"
                  >
                    Send
                  </button>
                </div>
                {error && <p>{error.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <div className="text-center p-t-70">
    <a className="txt1" href={ROUTES.PASSWORD_FORGET}>
      {' '}
      Forgot Password?{' '}
    </a>
  </div>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };