import React from 'react';

import { Container, Row } from 'react-bootstrap';
import { withAuthorization } from '../../Session';
import ShowItem from '../ShowItem';

class MyItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      error: null,
    };
  }

  async componentDidMount() {
    const authUser = this.props.firebase.auth.currentUser.uid;

    const itemsRef = this.props.firebase.db
      .collection('users')
      .doc(authUser)
      .collection('items');

    const snapshot = await itemsRef.get();
    if (snapshot.empty) {
      return;
    }

    let items = [];
    snapshot.forEach((item) => {
      const id = item.id;
      const { name, description, category } = item.data();
      items.push({ id, name, description, category });
    });

    this.setState({
      authUser: authUser,
      items: items,
    });
  }

  render() {
    return (
      <Container fluid>
        <Row
          xs='1'
          sm='2'
          md='3'
          lg='4'
          xl='5'
          style={{
            justifyContent: 'center',
            margin: '4%',
            // marginLeft: '5%',
            // marginRight: '5%',
          }}
        >
          {this.state.items.map(({ id, name, description, category }, idx) => {
            return (
              <ShowItem
                key={idx}
                id={id}
                name={name}
                description={description}
                category={category}
              />
            );
          })}
        </Row>
      </Container>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(MyItems);
