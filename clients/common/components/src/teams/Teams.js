import React from "react";
import _ from "lodash";
import Uranium from "uranium";
import PropTypes from "prop-types";
import style from "style";
import fuzzyFilterFactory from "react-fuzzy-filter";
import { View } from "react-native";
import H from "@/H";
import Loader from "~/basic/Loader";

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
    // eslint-disable-next-line
    teams: PropTypes.object.isRequired,
    /* arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      time: PropTypes.arrayOf(PropTypes.number),
      blue: PropTypes.(PropTypes.shape({
        num: PropTypes.number,
        id: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
      })),
     })).isRequired, */
  };

  constructor(props) {
    super(props);
    this.state = {
      teams: props.teams
    };
    props.load();
  }

  shouldComponentUpdate() {
    return true;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return Object.assign({}, prevState, {
      teams: nextProps.teams
    });
  }

  render() {
    const { teams } = this.state;
    if (teams.length === 0) {
      return <Loader />;
    }
    return (
      <View style={style.Matches.main}>
        <View style={style.Matches.space} />
        <View style={style.Matches.back}>
          <View css={style.Basic.Align.center}>
            <H style={style.Basic.Title} level={1}>
              All Teams
            </H>
          </View>
          <View css={style.Basic.Align.center}>
            <InputFilter
              debounceTime={200}
              inputProps={{ style: style.Matches.Input.main }}
            />
          </View>
          <FilterResults
            items={teams}
            fuseConfig={fuseConfig}
            prefilters={[
              {
                regex: /\S+:\S+/g,
                handler: (match, items, Fuse) => {
                  const key = match.split(":")[0].toLowerCase();
                  const value = match.split(":")[1].toLowerCase();
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
            {results => {
              const matches = Array.isArray(results)
                ? results.map(team => Object.assign({}, team))
                : results;
              return JSON.stringify(matches);
            }}
          </FilterResults>
        </View>
        <View style={style.Matches.space} />
      </View>
    );
  }
}
