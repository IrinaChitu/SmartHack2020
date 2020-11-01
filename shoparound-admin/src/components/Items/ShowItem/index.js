import React from 'react';

import { Card } from 'react-bootstrap';

import * as ROUTES from '../../../constants/routes';
import { withFirebase } from '../../Firebase';

class ShowItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    const authUser = this.props.firebase.auth.currentUser.uid;
    this.setState({ authUser: authUser });
  }

  deleteItem = async () => {
    const res = await this.props.firebase.db
      .collection('users')
      .doc(this.state.authUser)
      .collection('items')
      .doc(this.props.id)
      .delete();

    window.location.reload();
  };

  render() {
    return (
      <Card
        key={this.props.id}
        style={{
          marginLeft: '2.5%',
          marginRight: '2.5%',
          height: '97%',
          backgroundColor: '#ADD7F6',
          borderRadius: '25px',
        }}
      >
        <Card.Body>
          <Card.Title
            key={this.props.idx}
            style={{ color: 'white', textAlign: 'center' }}
          >
            {this.props.name}
          </Card.Title>
          <Card.Subtitle
            className='mb-2 text-muted'
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            {this.props.category}
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer
          className='d-flex justify-content-around'
          style={{ margin: '3%' }}
        >
          <button
            type='button'
            className='btn btn-outline-info'
            style={{ width: '40%' }}
            onClick={() => {
              window.location.href = `${ROUTES.EDIT_ITEM}?id=${this.props.id}`;
            }}
          >
            Edit
          </button>

          <button
            type='button'
            className='btn btn-outline-danger'
            style={{ width: '40%' }}
            onClick={this.deleteItem}
          >
            Delete
          </button>
        </Card.Footer>
      </Card>
    );
  }
}

export default withFirebase(ShowItem);
