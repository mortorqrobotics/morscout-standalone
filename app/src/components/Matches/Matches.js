import React from "react";
import _ from "lodash";
import Uranium from "uranium";
import PropTypes from "prop-types";
import style from "style";
import fuzzyFilterFactory from "react-fuzzy-filter";
import { View } from "react-native";
import Match from "./Match";
import H from "@/H";
import Loader from "~/Basic/Loader";

const { InputFilter, FilterResults } = fuzzyFilterFactory();
const fuseConfig = {
  shouldSort: true,
  keys: ["id", "blue", "red", "time", "progress"]
};

export default
@Uranium
class Matches extends React.Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    matches: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        time: PropTypes.instanceOf(Date).isRequired,
        progress: PropTypes.shape({
          max: PropTypes.number.isRequired,
          current: PropTypes.number.isRequired
        }).isRequired,
        red: PropTypes.arrayOf(PropTypes.number).isRequired,
        blue: PropTypes.arrayOf(PropTypes.number).isRequired
      }).isRequired
    ).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      matches: props.matches
    };
    props.load();
  }

  shouldComponentUpdate() {
    return true;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return Object.assign({}, prevState, {
      matches: nextProps.matches
    });
  }

  render() {
    const { state } = this;
    if (state.matches.length === 0) {
      return <Loader />;
    }
    return (
      <View style={style.Matches.main}>
        <View style={style.Matches.space} />
        <View style={style.Matches.back}>
          <View css={style.Basic.Align.center}>
            <H style={style.Basic.Title} level={1}>
              All Matches
            </H>
          </View>
          <View css={style.Basic.Align.center}>
            <InputFilter
              debounceTime={200}
              inputProps={{ style: style.Matches.Input.main }}
            />
          </View>
          <FilterResults
            items={state.matches}
            fuseConfig={fuseConfig}
            prefilters={[
              {
                regex: /\S+:\S+/g,
                handler: (search, matches, Fuse) => {
                  const key = search.split(":")[0].toLowerCase();
                  const value = search.split(":")[1].toLowerCase();
                  const items = matches.map(match => ({
                    id: match.id,
                    time: `${new Date(match.time).getHours()}:${new Date(
                      match.time
                    ).getMinutes()}`,
                    red: match.red,
                    blue: match.blue,
                    progress: `${match.progress.current} of ${
                      match.progress.max
                    }`
                  }));
                  if (_.has(key)) {
                    const fuse = new Fuse(
                      items,
                      Object.assign(
                        {},
                        {
                          keys: [key]
                        }
                      )
                    );
                    return fuse.search(value);
                  }
                  if (key === "team") {
                    const fuse = new Fuse(
                      items,
                      Object.assign(
                        {},
                        {
                          keys: ["red", "blue"]
                        }
                      )
                    );
                    return fuse.search(value);
                  }
                  const fuse = new Fuse(items, fuseConfig);
                  return fuse.search(`${key}:${value}`);
                }
              }
            ]}
          >
            {results =>
              results.map(match => <Match match={match} key={match.id} />)
            }
          </FilterResults>
        </View>
        <View style={style.Matches.space} />
      </View>
    );
  }
}
