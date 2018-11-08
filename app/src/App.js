import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Matches from 'screen/Matches';
import Match from 'screen/Match';
import Index from 'screen/Index';
import Settings from 'screen/Settings';
import { Route, Router, Switch } from '@/react-router';
import { View, Text } from 'react-native';
import H from '@/H';
import Navigation from '~/TopNav';
import store from 'store';
import initialize from 'actions/Basic/init';

const unsub = store.subscribe(() => store.getState());
store.dispatch(initialize);
unsub();

// eslint-disable-next-line
function dataDumper(props){
  return (
    <H level={6}>
      {JSON.stringify(props)}
    </H>
  );
}


// eslint-disable-next-line
class BackButton extends React.Component {
  static contextTypes = {
    // eslint-disable-next-line
    router: PropTypes.object,
  };

  render() {
    const {
      context,
    } = this;
    return (
      <Text onClick={context.router.history.goBack}>
        Back
      </Text>
    );
  }
}

function NotFoundError() {
  return (
    <View>
      <H level={1}>
        Page not found
      </H>
      <BackButton />
    </View>
  );
}

export default () => (
  <Provider store={store}>
    <Router>
      <View>
        <Navigation />
        <Switch>
          <Route path="/index" exact component={Index} />
          <Route path="/" exact component={Index} />
          <Route path="/Matches" exact component={Matches} />
          <Route path="/Profile" exact component={Settings} />
          <Route path="/Match/:id" component={Match} />
          <Route component={NotFoundError} />
        </Switch>
      </View>
    </Router>
  </Provider>
);
