import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import PasswordChange from '../PasswordChange';
import MyItems from '../Items/MyItems';
import Account from '../Account';
import NewItemPage from '../Items/NewItem';

import ShopMap from '../ShopMap';
import EditItem from '../Items/EditItem';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import CheckEmailPage from '../PasswordForget/checkEmail';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.MY_ITEMS} component={MyItems} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChange} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.CHECK_EMAIL} component={CheckEmailPage} />

      <Route path={ROUTES.SHOP_MAP} component={ShopMap}/>

      <Route path={ROUTES.NEW_ITEM} component={NewItemPage} />
      <Route path={ROUTES.EDIT_ITEM} component={EditItem} />
    </div>
  </Router>
);

export default withAuthentication(App);