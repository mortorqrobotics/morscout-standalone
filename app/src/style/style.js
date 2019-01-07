export default {
  Index: {
    background: {}
  },
  Basic: {
    Align: {
      center: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
      }
    }
  },
  Matches: {
    Table: {
      Cell: {
        borderRightWidth: 1,
        borderRightColor: "#d6d7da",
        height: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        flex: 1
      },
      teams: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
      },
      Link: {
        alignSelf: "stretch",
        textAlign: "center",
        display: "inline-block"
      }
    },
    Input: {
      main: {
        width: 272
      }
    },
    back: {
      flex: 8,
      minWidth: 272
    },
    space: {
      flex: 1
    },
    main: {
      flexDirection: "row",
      alignItems: "flex-start"
    }
  }
};
