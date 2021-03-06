export default visible => ({
  Top: {
    Link: {
      backgroundColor: "orange"
    },
    Left: {
      "@media screen and (min-aspect-ratio: 1/1)": {
        flexDirection: "row"
      },
      flexDirection: "column"
    },
    Right: {
      "@media screen and (min-aspect-ratio: 1/1)": {
        flexDirection: "row"
      },
      flexDirection: "column"
    },
    Button: {
      height: "25px",
      width: "25px"
    },
    User: {
      visibility: visible ? "visible" : "hidden",
      height: visible ? undefined : 0,
      width: visible ? undefined : 0,
      overflow: "hidden",
      alignSelf: "flex-start",
      "@media screen and (min-aspect-ratio: 1/1)": {
        alignSelf: "flex-end"
      }
    }
  },
  Button: {
    height: "3vh",
    width: "3vh",
    minHeight: "25px",
    minWidth: "25px",
    zIndex: 9999,
    position: "relative",
    marginLeft: "5px",
    marginTop: "5px",
    borderRadius: "40vh",
    backgroundColor: "orange",
    boxShadow: "-2.5px 2.5px 5px grey",
    borderColor: "black",
    "@media screen and (min-aspect-ratio: 1/1)": {
      visibility: "hidden",
      height: 0,
      width: 0,
      minHeight: 0,
      minWidth: 0,
      margin: 0,
      padding: 0,
      border: 0
    },
    "@media print": {
      visibility: "hidden",
      height: 0,
      width: 0,
      margin: 0,
      padding: 0,
      border: 0
    }
  },
  Container: {
    flexDirection: "row",
    height: "100vh",
    "@media screen and (min-aspect-ratio: 1/1)": {
      flexDirection: "column"
    }
  },
  App: {
    "@media screen and (min-aspect-ratio: 1/1)": {
      marginLeft: 0,
      transition: "0s"
    },
    flex: 1,
    height: "100%",
    position: "relative",
    paddingLeft: "9px",
    boxShadow: "-10px 0px 5px gray",
    marginLeft: "-34px",
    backgroundColor: "white",
    transition: "0.5s",
    zIndex: 1
  },
  Nav: {
    "@media screen and (min-aspect-ratio: 1/1)": {
      flexDirection: "row",
      width: "100%",
      visibility: "visible",
      boxShadow: "0px 10px 5px grey",
      zIndex: 1,
      transition: "0s"
    },
    "@media print": {
      visibility: "hidden",
      height: 0,
      width: 0
    },
    zIndex: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    visibility: visible ? "visible" : "hidden",
    backgroundColor: "orange",
    transition: "0.5s",
    width: visible ? "100px" : "0px",
    overflowX: "hidden"
  }
});
