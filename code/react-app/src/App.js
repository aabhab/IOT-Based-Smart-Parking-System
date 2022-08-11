import React from "react";
import { BrowserRouter as Router, Switch , Route ,useHistory,Redirect  } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import Slots from "./pages/Slots/Slots";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Home from "./pages/Home/Home";
import Reservations from "./pages/Reservations/Reservations"
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';



function App(props) {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const oktaAuth = new OktaAuth({
    issuer: 'https://dev-81472287.okta.com/oauth2/default',
    clientId: '0oa3xffj63hOO6Ovp5d7',
    redirectUri: window.location.origin + '/login/callback',
    onAuthRequired: onAuthRequired,
    pkce: true
  });

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
return (
  <Router>
  <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Navbar />
        <Route exact path="/" component={Home} />
        <SecureRoute path='/slots' component={Slots} />
        <SecureRoute path="/profile" exact={true} component={Profile} />
        <SecureRoute path="/reservations" exact={true} component={Reservations} />
        <Route path="/payment" component={Payment} />
        <Route path='/login' component={Login} />
        <Route path='/login/callback' component={LoginCallback} />
  </Security>
  </Router>
  );
}
export default App;
