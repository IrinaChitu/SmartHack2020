import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    const error = await this.props.firebase.doSignInWithEmailAndPassword(
      email,
      password
    );

    if (error === null) {
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.MY_ITEMS);
    } else {
      this.setState({ error });
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, error: null });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
        <div className='limiter'>
          <div
            className='container-login100'
            style={{
              backgroundImage: `url(${require('../../images/backgroundImage.jpg')})`,
            }}
          >
            <div className='wrap-login100'>
              <form
                className='login100-form validate-form'
                onSubmit={this.onSubmit}
              >
                <span className='login100-form-title p-b-34 p-t-27'>
                  {' '}
                  Log in{' '}
                </span>

                <div
                  className='wrap-input100 validate-input'
                  data-validate='Enter username'
                >
                  <input
                    className='input100'
                    type='text'
                    name='email'
                    value={email}
                    onChange={this.onChange}
                    placeholder='Email Address'
                  />
                  <span
                    className='focus-input100'
                    data-placeholder='&#xf207;'
                  ></span>
                </div>

                <div
                  className='wrap-input100 validate-input'
                  data-validate='Enter password'
                >
                  <input
                    className='input100'
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.onChange}
                    placeholder='Password'
                  />
                  <span
                    className='focus-input100'
                    data-placeholder='&#xf191;'
                  ></span>
                </div>

                <div className='contact100-form-checkbox'>
                  <input
                    className='input-checkbox100'
                    id='ckb1'
                    type='checkbox'
                    name='remember-me'
                  />

                  {error && <p style={{ color: 'white' }}>{error.message}</p>}
                </div>

                <div className='container-login100-form-btn'>
                  <button
                    className='login100-form-btn'
                    disabled={isInvalid}
                    type='submit'
                  >
                    Log In
                  </button>
                </div>

                <PasswordForgetLink />
                <SignUpLink />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInPage };
