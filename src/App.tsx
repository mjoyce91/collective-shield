import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import { buildEndpointUrl } from './utilities';
import User from './models/User';
import HomeView from './components/HomeView';
import LoginView from './components/LoginView';
import MakerView from './components/MakerView';
import RequestView from './components/RequestView';
// import NewRequestView from './components/NewRequestView';
import WorkView from './components/WorkView';

import './scss/app.scss';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .get(buildEndpointUrl('me'))
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        if (err.response !== null && err.response.status === 401) {
          history.push('/login');
          return null;
        }
      });
  }, []);

  return (
    <>
      <Navbar user={user} />

      <main className="main">
        <Container>
          {user ? (
            <>
              {/* <Route path="/" exact component={NewRequestView} /> */}
              <Route path="/">
                <HomeView user={user} />
              </Route>

              <Route path="/makers">
                <MakerView />
              </Route>

              <Route path="/requests">
                <RequestView />
              </Route>

              <Route path="/work">
                <WorkView user={user} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/login">
                <LoginView />
              </Route>
            </>
          )}
        </Container>
      </main>
    </>
  );
};

export default App;
