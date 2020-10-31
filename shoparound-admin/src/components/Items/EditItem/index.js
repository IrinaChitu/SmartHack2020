import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Card } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

import { withAuthorization } from '../../Session';

const EditItemPage = () => (
  <div>
    <EditItemForm />
  </div>
);

const INITIAL_STATE = {
  authUser: null,
  id: null,
  name: '',
  description: '',
  category: '',
  error: null,
};

class EditItemFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  async componentDidMount() {
    const authUser = this.props.firebase.auth.currentUser.uid;
    const query = new URLSearchParams(this.props.location.search);
    const id = query.get('id');

    const item = await this.props.firebase.db
      .collection('users')
      .doc(authUser)
      .collection('items')
      .doc(id)
      .get();

    const { name, description, category } = item.data();

    this.setState({
      authUser,
      id,
      name,
      description,
      category,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.updateItem();
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateItem = () => {
    const { authUser, id, name, description, category } = this.state;

    this.props.firebase.db
      .collection('users')
      .doc(authUser)
      .collection('items')
      .doc(id)
      .update({
        name: name,
        description: description,
        category: category,
      });

    this.setState({ ...INITIAL_STATE });
    this.props.history.push(ROUTES.MY_ITEMS);
  };

  render() {
    const { name, description, category, error } = this.state;

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
            {' '}
            <Card
              style={{
                backgroundColor: 'rgba(223,25,22,0.4)',
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
                    style={{ backgroundColor: '#F9DCDC', textAlign: 'center' }}
                  />
                  <input
                    name='description'
                    value={description}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Description'
                    className='form-control'
                    style={{ backgroundColor: '#F9DCDC', textAlign: 'center' }}
                  />
                  <input
                    name='category'
                    value={category}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Category'
                    className='form-control'
                    style={{ backgroundColor: '#F9DCDC', textAlign: 'center' }}
                  />
                </Card.Title>
              </Card.Body>
              <Card.Footer
                className='d-flex justify-content-around'
                style={{ margin: '3%' }}
              >
                <button
                  type='button'
                  // type="submit"
                  onClick={this.onSubmit}
                  className='btn btn-outline-info'
                  style={{ width: '40%' }}
                >
                  Update
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

const condition = (authUser) => !!authUser;

const EditItemForm = compose(withRouter, withFirebase)(EditItemFormBase);

export default withAuthorization(condition)(EditItemPage);

export { EditItemForm };