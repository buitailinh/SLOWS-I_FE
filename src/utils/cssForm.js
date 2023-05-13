import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: "#ccc"
    },
    "&:after": {
      borderBottomColor: "#ccc"
    },
    "&:hover:before": {
      borderBottomColor: "#bbb"
    }
  },
  textField: {
    fontSize: "28px",
    color: "#666"
  }
}));

export default useStyles;