import React from 'react';
import { Row } from 'react-bootstrap';

import { withAuthorization } from '../Session';

class ShopMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      isToggled: false,
      toggledIdShelf: null,
      items: [],
      shelves: [],
      itemsOnCurrentShelf: [],
      addedItems: {},
    };
  }

  allowDrop = (ev) => {
    ev.preventDefault();
  };

  drag = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id);
  };

  drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
  };

  addShelf = (ev) => {
    this.setState({
      isToggled: !this.state.isToggled,
    });

    if (this.state.isToggled) {
      ev.target.src = '../../images/shelf.png';
      document.getElementById('productList').style.visibility = 'visible';

      this.setState({
        toggledIdShelf: ev.target.id,
      });

      let coords = ev.target.id.split('|');

      const authUser = this.props.firebase.auth.currentUser.uid;

      try {
        const item = this.props.firebase.db
          .collection('users')
          .doc(authUser)
          .collection('shelves')
          .doc(ev.target.id)
          .set({
            x: coords[0],
            y: coords[1],
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      if (ev.target.src == '') ev.target.src = '../../images/plusShelf.png';
      document.getElementById('productList').style.visibility = 'hidden';

      this.setState({
        toggledIdShelf: null,
      });
    }
  };

  drawMap = () => {
    document.getElementById('productList').style.visibility = 'hidden';

    var nrRow = 15;
    var nrCol = 25;
    var gridTable = document.createElement('TABLE');
    for (var i = 0; i < nrRow; i++) {
      var gridRow = document.createElement('TR');
      for (var j = 0; j < nrCol; j++) {
        var gridCell = document.createElement('TD');
        var gridPlus = document.createElement('IMG');
        gridPlus.id = `${i}|${j}`;
        gridPlus.src = '../../images/plusShelf.png';

        let flag = false;
        for (let item of this.state.items) {
          if (item.id_shelf === gridPlus.id) {
            gridPlus.src = '../../images/shelf.png';
            flag = true;
            break;
          } else {
            gridPlus.src = '../../images/plusShelf.png';
          }
        }

        if (!flag) {
          for (let shelf of this.state.shelves) {
            if (shelf === gridPlus.id) {
              gridPlus.src = '../../images/shelf.png';
              break;
            } else {
              gridPlus.src = '../../images/plusShelf.png';
            }
          }
        }

        gridPlus.addEventListener('click', this.addShelf);
        gridPlus.classList.add('plus');
        gridCell.classList.add('grid');
        gridCell.appendChild(gridPlus);
        gridRow.appendChild(gridCell);
      }
      gridTable.appendChild(gridRow);
    }
    document.getElementById('gridSpace').appendChild(gridTable);
  };

  getItems = async () => {
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
      const { name, description, category, id_shelf } = item.data();
      items.push({ id, name, description, category, id_shelf });
    });

    const shelvesRef = this.props.firebase.db
      .collection('users')
      .doc(authUser)
      .collection('shelves');

    let shelves = [];
    const shelvesSnapshot = await shelvesRef.get();
    if (shelvesSnapshot.empty) {
      return;
    }

    shelvesSnapshot.forEach((item) => {
      const id = item.id;
      shelves.push(id);
    });

    this.setState({
      authUser: authUser,
      items: items,
      shelves: shelves,
    });
  };

  markItemOnShelf = (id, id_shelf) => {
    const authUser = this.props.firebase.auth.currentUser.uid;

    const item = this.props.firebase.db
      .collection('users')
      .doc(authUser)
      .collection('items')
      .doc(id)
      .update({
        id_shelf: id_shelf,
      });
  };

  unmarkItemOnShelf = (id) => {
    const authUser = this.props.firebase.auth.currentUser.uid;

    this.props.firebase.db
      .collection('users')
      .doc(authUser)
      .collection('items')
      .doc(id)
      .update({
        id_shelf: null,
      });

    this.setState({
      toggledIdShelf: null,
    });

    this.getItems();
  };

  markAddedItems = () => {
    document.getElementById('productList').style.visibility = 'hidden';
    this.getItems();
  };

  async componentDidMount() {
    await this.getItems();
    this.drawMap();
  }

  render() {
    const { items } = this.state;

    return (
      <div>
        <h1>Shop map</h1>
        <div id='gridSpace'></div>
        <div id='productList'>
          <div className='w3-container'>
            <div className='w3-card-4' style={{ width: '100%' }}>
              <header className='w3-container w3-light-grey'>
                <h4>Add a product to current shelf</h4>
              </header>
              <div className='w3-container'>
                <div id='checkboxes'>
                  <ul>
                    {items.map(({ id, name, id_shelf }, idx) => {
                      if (id_shelf === null) {
                        return (
                          <li key={idx}>
                            <input
                              type='checkbox'
                              onClick={() => {
                                this.markItemOnShelf(
                                  id,
                                  this.state.toggledIdShelf
                                );
                              }}
                            />
                            {name}
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>
              <header className='w3-container w3-light-grey'>
                <h4>Existing products</h4>
              </header>
              <div className='w3-container'>
                <div id='checkboxes'>
                  <ul>
                    {items.map(({ id, name, id_shelf }, idx) => {
                      if (
                        id_shelf !== null &&
                        id_shelf === this.state.toggledIdShelf
                      ) {
                        return (
                          <li key={idx}>
                            <input
                              type='checkbox'
                              checked={true}
                              onClick={() => {
                                this.unmarkItemOnShelf(id);
                              }}
                            />
                            {name}
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>
              <button
                className='w3-button w3-block w3-dark-grey'
                onClick={() => {
                  this.markAddedItems();
                }}
              >
                Done
              </button>
              <button
                className='w3-button w3-block w3-dark-grey'
                onClick={async () => {
                  const authUser = this.props.firebase.auth.currentUser.uid;

                  const item = this.props.firebase.db
                    .collection('users')
                    .doc(authUser)
                    .collection('shelves')
                    .doc(this.state.toggledIdShelf)
                    .delete();

                  var itemsRef = this.props.firebase.db
                    .collection('users')
                    .doc(authUser)
                    .collection('items');

                  const snapshot = await itemsRef.get();
                  if (snapshot.empty) {
                    return;
                  }

                  snapshot.forEach((item) => {
                    const authUser = this.props.firebase.auth.currentUser.uid;

                    const { id_shelf } = item.data();
                    if (id_shelf === this.state.toggledIdShelf) {
                      const res = this.props.firebase.db
                        .collection('users')
                        .doc(authUser)
                        .collection('items')
                        .doc(item.id)
                        .update({
                          id_shelf: null,
                        });
                    }
                  });

                  this.getItems();

                  document.getElementById(this.state.toggledIdShelf).src =
                    '../../images/plusShelf.png';
                  document.getElementById('productList').style.visibility =
                    'hidden';
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ShopMap);
