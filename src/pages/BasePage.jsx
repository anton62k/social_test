import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ThreadsPage from './ThreadsPage';
import ProfilePage from './ProfilePage';
import MessagesPage from './MessagesPage';
import LogoutButton from '../components/LogoutButton';

const Menu = () => (
  <div className="menu">
    <Link to="/profile/" className="menu-item left-item">
      Моя страница
    </Link>
    <Link to="/threads/" className="menu-item left-item">
      Сообщения
    </Link>
    <LogoutButton />
  </div>
);

const BasePage = () => (
  <React.Fragment>
    <Menu />
    <main className="page">
      <Switch>
        <Route exact path="/(|profile)/" component={ProfilePage} />
        <Route exact path="/threads/" component={ThreadsPage} />
        <Route path="/threads/:threadId" component={MessagesPage} />
      </Switch>
    </main>
  </React.Fragment>
);

export default BasePage;
