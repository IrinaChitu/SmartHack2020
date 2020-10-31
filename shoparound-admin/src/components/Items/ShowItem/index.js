import React from 'react';

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
      <div>
        <h3 key={this.props.idx}>Name: {this.props.name}</h3>
        <h3 >Description: {this.props.description}</h3>
        <h3 >Category: {this.props.category}</h3>
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
      </div>
    );
  }
}

export default withFirebase(ShowItem);