import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00838f",
      light: "#4fb3bf",
      dark: "#005662",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F0F2F5",
    },
  },
});

export default theme;
