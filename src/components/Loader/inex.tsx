import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import authStore from "../../stores/auth";
import transactionsStore from "../../stores/transactions";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Loader: React.FC = () => {
  const classes = useStyles();

  return (
    <Backdrop
      className={classes.backdrop}
      open={authStore.loading || transactionsStore.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default observer(Loader);
