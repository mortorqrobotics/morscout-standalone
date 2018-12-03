import React from "react";
import _ from "lodash";
import Uranium from "uranium";
import PropTypes from "prop-types";
import style from "style";
import fuzzyFilterFactory from "react-fuzzy-filter";
import { View } from "react-native";
import { Link } from "@/Navigation";
import Table from "./Table";
import H from "@/H";
import Loader from "~/Basic/Loader";

const { InputFilter, FilterResults } = fuzzyFilterFactory();
const fuseConfig = {
  shouldSort: true,
  keys: ["id", "blue", "red", "time", "progress"],
};

const columns = [
  {
    title: "#",
    dataIndex: "id",
  },
  {
    title: "Time",
    dataIndex: "time",
  },
  {
    title: "Progress",
    dataIndex: "progress",
  },
  {
    title: "Red Teams",
    dataIndex: "red",
    width: 56 * 3 + 2,
  },
  {
    title: "Blue Teams",
    dataIndex: "blue",
    width: 56 * 3 + 2,
  },
];

function norm(matches) {
  return Object.entries(matches).map(val => {
    const i = val[0];
    const match = val[1];
    return {
      id: i,
      time: match.time.join(":"),
      progress: `${match.progress} of 6`,
      red: match.red.map(team => `${team.num}`),
      blue: match.blue.map(team => `${team.num}`),
    };
  });
}

function renderTeams(teams, mId) {
  return (
    <View style={style.Matches.Table.teams}>
      <View style={style.Matches.Table.Cell}>
        <Link
          routeName="Scouting"
          params={{
            match: mId,
            team: teams[1],
          }}
        >
          {teams[0]}
        </Link>
      </View>
      <View style={style.Matches.Table.Cell}>
        <Link
          routeName="Scouting"
          params={{
            match: mId,
            team: teams[1],
          }}
        >
          {teams[1]}
        </Link>
      </View>
      <View
        style={Object.assign({}, style.Matches.Table.Cell, {
          borderRightWidth: 0,
        })}
      >
        <Link
          routeName="Scouting"
          params={{
            match: mId,
            team: teams[2],
          }}
        >
          {teams[2]}
        </Link>
      </View>
    </View>
  );
}

export default
@Uranium
class Matches extends React.Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    // eslint-disable-next-line
    matches: PropTypes.object.isRequired,
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
      matches: norm(props.matches),
    };
    props.load();
  }

  shouldComponentUpdate() {
    return true;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return Object.assign({}, prevState, {
      matches: norm(nextProps.matches),
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
                handler: (match, items, Fuse) => {
                  const key = match.split(":")[0].toLowerCase();
                  const value = match.split(":")[1].toLowerCase();
                  if (_.has(key)) {
                    const fuse = new Fuse(
                      items,
                      Object.assign(
                        {},
                        {
                          keys: [key],
                        },
                      ),
                    );
                    return fuse.search(value);
                  }
                  if (key === "team") {
                    const fuse = new Fuse(
                      items,
                      Object.assign(
                        {},
                        {
                          keys: ["red", "blue"],
                        },
                      ),
                    );
                    return fuse.search(value);
                  }
                  const fuse = new Fuse(items, fuseConfig);
                  return fuse.search(`${key}:${value}`);
                },
              },
            ]}
          >
            {results => {
              const matches = results.map(match => {
                const m = Object.assign({}, match);
                const { id } = match;
                Object.entries(match).forEach(temp => {
                  const data = temp[0];
                  const value = temp[1];
                  if (
                    data !== "id" &&
                    data !== "blue" &&
                    data !== "red" &&
                    typeof data !== "object" &&
                    !React.isValidElement(value)
                  ) {
                    m[data] = (
                      <Link
                        routeName="Match"
                        params={{
                          id: m.id,
                        }}
                        style={{ alignSelf: "center" }}
                      >
                        {m[data]}
                      </Link>
                    );
                  }
                });
                m.id = (
                  <Link
                    routeName="Match"
                    params={{
                      id: m.id,
                    }}
                    style={style.Matches.Table.Link}
                  >
                    {m.id}
                  </Link>
                );
                return {
                  ...m,
                  red: renderTeams(match.red, id),
                  blue: renderTeams(match.blue, id),
                };
              });
              return (
                <Table
                  columns={columns}
                  dataSource={matches}
                  getID={match => match.id}
                />
              );
            }}
          </FilterResults>
        </View>
        <View style={style.Matches.space} />
      </View>
    );
  }
}
