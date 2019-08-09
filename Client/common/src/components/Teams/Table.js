/**
 * Copied from react-native-simple-table and modified
 */

import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import PropTypes from "prop-types";

const DEFAULT_HEIGHT = 240;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
    // justifyContent: 'space-between'
  },
  content: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    // flex: 1,
    height: 30 // DEFAULT_HEIGHT,
  },
  headerItem: {
    height: 30,
    // width: DEFAULT_COLUMN_WIDTH,
    // flex: 1,
    backgroundColor: "#efefef",
    borderRightWidth: 1,
    borderRightColor: "#dfdfdf",
    alignItems: "center",
    justifyContent: "center"
  },
  dataView: {
    flexGrow: 1
  },
  dataViewContent: {},
  row: {
    flexDirection: "row",
    backgroundColor: "#fbfbfb",
    borderBottomWidth: 1,
    borderBottomColor: "#dfdfdf"
  },
  cell: {
    minHeight: 25,
    // width: DEFAULT_COLUMN_WIDTH,
    flex: 1,
    backgroundColor: "transparent",
    borderRightWidth: 1,
    borderRightColor: "#dfdfdf",
    alignItems: "stretch",
    justifyContent: "center"
  }
});

class Table extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        dataIndex: PropTypes.string.isRequired,
        width: PropTypes.number
      })
    ).isRequired,
    height: PropTypes.number,
    // eslint-disable-next-line
      dataSource: PropTypes.array.isRequired,
    renderCell: PropTypes.func
  };

  static defaultProps = {
    height: DEFAULT_HEIGHT,
    renderCell: undefined
  };

  // eslint-disable-next-line
    _renderCell(cellData, col) {
    const style = {}; // { width: col.width || this.props.columnWidth || DEFAULT_COLUMN_WIDTH };
    return (
      <View key={col.dataIndex} style={[styles.cell, style]}>
        {cellData}
      </View>
    );
  }

  _renderHeader() {
    const { columns } = this.props;
    return columns.map((col, index) => {
      const style = { flex: 1 }; // { width: col.width || columnWidth || DEFAULT_COLUMN_WIDTH };
      return (
        <View key={index} style={[styles.headerItem, style]}>
          <Text>{col.title}</Text>
        </View>
      );
    });
  }

  _renderRow(rowData) {
    let { renderCell } = this.props;
    const { columns } = this.props;
    if (!renderCell) {
      // eslint-disable-next-line
        renderCell = this._renderCell.bind(this);
    }
    return (
      <View
        style={styles.row}
        onResponderRelease={() => {}}
        key={Math.floor(Math.random() * 100 + 1)}
      >
        {columns.map(col => renderCell(rowData[col.dataIndex], col))}
      </View>
    );
  }

  render() {
    const { dataSource, height } = this.props;
    return (
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { height },
          styles.container
        ]}
        horizontal
        bounces={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            {/* eslint-disable-next-line */}
              {this._renderHeader()}
          </View>
          <ScrollView
            style={styles.dataView}
            contentContainerStyle={styles.dataViewContent}
          >
            {/* eslint-disable-next-line no-underscore-dangle */}
            {dataSource.map((rowData, index) =>
              // eslint-disable-next-line no-underscore-dangle
              this._renderRow(rowData, index)
            )}
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

export default Table;
