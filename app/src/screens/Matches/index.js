import React from 'react';
import { View } from 'react-native';
import Uranium from 'uranium';
import style from 'style';
import Loadable from 'react-loadable';
import Loader from '@/Loader';


const MatchContainer = Loadable({
  loader: () => import('~/Matches'),
  loading: Loader,
});

@Uranium
class Matches extends React.Component {
  render() {
    return (
      <View css={style.Basic.background}>
        <MatchContainer />
      </View>
    );
  }
}

export default Matches;
