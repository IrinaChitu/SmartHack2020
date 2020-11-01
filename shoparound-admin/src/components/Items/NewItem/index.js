import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Card, Row } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

import { withAuthorization } from '../../Session';

const NewItemPage = () => (
  <div>
    <NewItemForm />
  </div>
);

const INITIAL_STATE = {
  name: '',
  description: '',
  category: '',
  id_shelf: null,
  error: null,
};

class NewItemFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.addNewItem();
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addNewItem = () => {
    const currUser = this.props.firebase.auth.currentUser.uid;
    const { name, description, category, id_shelf } = this.state;

    this.props.firebase.db
      .collection('users')
      .doc(currUser)
      .collection('items')
      .add({
        name: name,
        description: description,
        category: category,
        id_shelf,
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        window.location.href = ROUTES.MY_ITEMS;
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error });
      });
  };

  render() {
    const { name, description, category, error } = this.state;

    const isInvalid = name === '' || description === '' || category === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Container fluid>
          <Row
            xs='1'
            sm='2'
            md='2'
            lg='3'
            xl='4'
            style={{
              justifyContent: 'center',
              margin: '4%',
            }}
          >
            <Card
              // key={this.props.id}
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
                  <input
                    name='name'
                    value={name}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Item name'
                    className='form-control'
                    style={{ backgroundColor: '#87BFFF', textAlign: 'center' }}
                  />
                  <br />
                  <input
                    name='description'
                    value={description}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Description'
                    className='form-control'
                    style={{ backgroundColor: '#87BFFF', textAlign: 'center' }}
                  />
                  <br />
                  <input
                    name='category'
                    value={category}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Category'
                    className='form-control'
                    style={{ backgroundColor: '#87BFFF', textAlign: 'center' }}
                  />
                </Card.Title>
              </Card.Body>
              <Card.Footer
                className='d-flex justify-content-around'
                style={{ margin: '3%' }}
              >
                <button
                  type='button'
                  disabled={isInvalid}
                  type='submit'
                  className='btn btn-outline-info'
                  style={{ width: '40%' }}
                >
                  Add new item
                </button>
              </Card.Footer>
            </Card>
            {error && <p style={{ color: 'white' }}>{error.message}</p>}{' '}
          </Row>
        </Container>
      </form>
    );
  }
}

const condition = (authUser) => !!authUser;

const NewItemForm = compose(withRouter, withFirebase)(NewItemFormBase);

export default withAuthorization(condition)(NewItemPage);

export { NewItemForm };
