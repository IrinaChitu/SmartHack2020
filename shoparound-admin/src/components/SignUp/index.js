import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  shopName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.registerUser();
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  registerUser = async () => {
    const { shopName, email, passwordOne } = this.state;

    try {
      const user = await this.props.firebase.doCreateUserWithEmailAndPassword(
        shopName,
        email,
        passwordOne
      );
      
      this.props.history.push(ROUTES.MY_ITEMS);
      window.location.href = ROUTES.MY_ITEMS;
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { shopName, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      shopName === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="shopName"
          value={shopName}
          onChange={this.onChange}
          type="text"
          placeholder="Shop Name"
        />

        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />

        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />

        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />

        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <div className="text-center p-t">
    <a className="txt1" href={ROUTES.SIGN_UP}>
      {' '}
      Don't have an account? Sign Up{' '}
    </a>
  </div>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };