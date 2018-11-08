import React from 'react';
import {
  View,
} from 'react-native';
import Uranium from 'uranium';
import style from 'style';
import Loadable from 'react-loadable';
import Loader from '@/Loader';


const Match = props => Loadable({
  loader: () => import('~/Match/index.js'),
  loading: Loader,
  render(loaded) {
    // eslint-disable-next-line
    const Match = loaded.default(props.match.params.id);
    return <Match />;
  },
});

@Uranium
class MatchScreen extends React.Component {
  render() {
    const {
      props,
    } = this;
    return (
      <View css={style.Basic.background}>
        {React.createElement(Match(props))}
      </View>
    );
  }
}

export default MatchScreen;
