import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={SignIn} />
    <Route path='/signup' component={SignUp} />
    <Route path='/forgot-password' component={ForgotPassword} />
    <Route path='/reset-password' component={ResetPassword} />

    <Route path='/profile' component={Profile} isPrivate />
    <Route path='/dashboard' component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
