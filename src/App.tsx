import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Home from "./pages/Home";
import theme from "./styles/theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import authStore from "./stores/auth";
import Loader from "./components/Loader/inex";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";

function App() {
  useEffect(() => {
    authStore.listen();
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>

      <Loader />
    </ThemeProvider>
  );
}

export default App;
