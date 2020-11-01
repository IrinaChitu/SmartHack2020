import React, { Component } from 'react';
import { Row, Container, Card } from 'react-bootstrap';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.changePassword();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changePassword = async () => {
    const { passwordOne } = this.state;

    const error = await this.props.firebase.doPasswordUpdate(passwordOne);
    if (error === null) {
      this.setState({ ...INITIAL_STATE });
    } else {
      this.setState({ error });
    }
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Container fluid>
          <Row
            xs='1'
            sm='2'
            md='2'
            lg='3'
            xl='4'
            style={{ justifyContent: 'center' }}
          >
            <Card
              style={{
                backgroundColor: '#ADD7F6',
                borderRadius: '25px',
              }}
            >
              <Card.Body
                style={{
                  borderRadius: '30px',
                }}
              >
                <Card.Title style={{ color: 'white', textAlign: 'center' }}>
                  Email: {this.props.user.email}
                  <br />
                  <br />
                  <Card.Text> Change your password</Card.Text> <br />
                  <input
                    name='passwordOne'
                    value={passwordOne}
                    onChange={this.onChange}
                    type='password'
                    placeholder='New Password'
                    className='form-control'
                    style={{ backgroundColor: '#87BFFF', textAlign: 'center' }}
                  />{' '}
                  <br />
                  <input
                    name='passwordTwo'
                    value={passwordTwo}
                    onChange={this.onChange}
                    type='password'
                    placeholder='Confirm New Password'
                    className='form-control'
                    style={{ backgroundColor: '#87BFFF', textAlign: 'center' }}
                  />{' '}
                </Card.Title>
              </Card.Body>
              <Card.Footer className='d-flex justify-content-around'>
                <button
                  type='button'
                  disabled={isInvalid}
                  type='submit'
                  // onClick={this.onSubmit}
                  className='btn btn-outline-info'
                  style={{ width: '40%' }}
                >
                  Update password
                </button>
              </Card.Footer>
            </Card>

            {error && <p>{error.message}</p>}
          </Row>
        </Container>
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
