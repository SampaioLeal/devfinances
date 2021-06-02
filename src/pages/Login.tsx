import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import firebaseServices from "../services/firebase";
// import firebase from "firebase/app";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  loginBtn: {
    marginTop: theme.spacing(4),
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 22,
  },
  dollar: {
    color: theme.palette.primary.main,
  },
}));

function Login() {
  const history = useHistory();
  const classes = useStyles();

  async function handleLogin() {
    try {
      const result = await firebaseServices.signInWithGoogle();

      history.push("/");

      // const credential = result.credential as firebase.auth.OAuthCredential;
      // const token = credential.accessToken;
      // const user = result.user;
    } catch (err) {
      // const errorCode = err.code;
      // const errorMessage = err.message;
      // const email = err.email;
      // const credential = err.credential;
    }
  }

  return (
    <Container className={classes.root}>
      <Typography className={classes.title}>
        dev.finance<span className={classes.dollar}>$</span>
      </Typography>
      <Button
        onClick={handleLogin}
        className={classes.loginBtn}
        variant="contained"
        color="primary"
      >
        Entrar com o Google
      </Button>
    </Container>
  );
}

export default Login;
