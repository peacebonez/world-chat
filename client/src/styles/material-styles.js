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
    background: "#F5F7FB",
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
  sideBarHeader: {
    marginTop: 10,
    // border: "solid 1px black",
    height: 100,
    width: "85%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& div": {
      display: "flex",
    },
  },
  sideBarImgWrapper: {
    border: "solid 1px black",
    "& span": {
      width: 12,
      height: 12,
      color: "#4DED84",
      border: "solid white 1px",
      borderRadius: "50%",
      position: "relative",
      left: "-32%",
      top: "75%",
    },
  },
  sideBarImg: {
    borderRadius: "100%",
    overflow: "hidden",
    width: "70px",
    marginRight: "15px",
  },
  conversation: {
    border: "solid 1px black",
    background: "#F5F7FB",
    height: "100vh",
    width: "66.66%",
    position: "absolute",
    right: 0,
  },
  navBar: {
    boxSizing: "border-box",
    border: "solid 1px black",
    width: "100%",
    padding: "0 25px",
    height: 100,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& img": {
      width: "10%",
      borderRadius: "50%",
    },
  },
  dotMenu: {
    cursor: "pointer",
    color: "#BCC8D9",
  },
  chatWindow: {
    width: "100%",
    height: "100%",
    background: "#fff",
    marginTop: 10,
  },
}));

export default useStyles;
