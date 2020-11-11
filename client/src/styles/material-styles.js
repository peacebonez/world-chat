import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
    textAlign: "center",
  },
  flexRowCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flexColumnCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  messengerContainer: {
    border: "solid 1px black",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "flex-start",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  sideBar: {
    border: "solid 1px black",
    height: "100vh",
    width: "33.33%",
    background: "#F5F7FB",
    position: "absolute",
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sideHeader: {
    border: "solid 1px black",
    height: 100,
    width: "100%",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& div": {
      display: "flex",
    },
    "& svg": {
      cursor: "pointer",
    },
  },
  sideBarImgWrapper: {
    "& span": {
      width: 12,
      height: 12,
      color: "#4DED84",
      border: "solid white 1px",
      borderRadius: "100%",
      position: "absolute",
      left: 80,
      top: 70,
    },
  },
  sideBarImg: {
    borderRadius: "100%",
    overflow: "hidden",
    width: "75px",
    marginRight: "15px",
  },
  conversation: {
    border: "solid 1px black",
    background: "lightblue",
    height: "100vh",
    width: "66.66%",
    position: "absolute",
    right: 0,
  },
  navBar: {},
}));

export default useStyles;
