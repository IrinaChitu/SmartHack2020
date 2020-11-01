import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div
    style={{
      background: 'linear-gradient(to left  , #820f0d, #020300)',
    }}
  >
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : null)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <div>
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      style={{
        background: 'linear-gradient(#820f0d, #020300)',
      }}
    >
      <Navbar.Brand href='/'>Shop Around - Admin</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link
            href={ROUTES.MY_ITEMS}
            className='nav-bar-active'
            // style={{ color: 'white' }}
          >
            My items
          </Nav.Link>
          <Nav.Link href={ROUTES.NEW_ITEM}>Add new item</Nav.Link>
          <Nav.Link href={ROUTES.SHOP_MAP}>Shop map</Nav.Link>
          <Nav.Link title='account' href={ROUTES.ACCOUNT} > Account </Nav.Link>
          <Nav.Link title='signout' href='#'>
            <SignOutButton />
          </Nav.Link>
        </Nav>
    </Navbar>
  </div>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;