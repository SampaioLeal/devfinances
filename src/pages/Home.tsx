import { Container, Fab, Grid, makeStyles } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import HeaderCard from "../components/HeaderCard";
import TransactionCard from "../components/TransactionCard";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import AddRondedIcon from "@material-ui/icons/AddRounded";
import Header from "../components/Header";
import { useEffect } from "react";
import authStore from "../stores/auth";
import transactionsStore from "../stores/transactions";
import { observer } from "mobx-react-lite";
import useModal from "../hooks/useModal";
import AddTransaction from "../components/TransactionForm/Add";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.dark,
    textAlign: "center",
    paddingTop: theme.spacing(4),
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 22,
  },
  dollar: {
    color: theme.palette.primary.light,
  },
  container: {
    marginTop: theme.spacing(4),
  },
  card: {
    marginBottom: -theme.spacing(4),
  },
  content: {
    marginTop: theme.spacing(6),
    backgroundColor: theme.palette.background.default,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function Home() {
  const [addModal, openAddModal, closeAddModal] = useModal();
  const classes = useStyles();
  const total =
    (transactionsStore.userInfo?.inputs || 0) -
    (transactionsStore.userInfo?.outputs || 0);

  useEffect(() => {
    if (authStore.user!.uid) {
      transactionsStore.getUserInfo(authStore.user!.uid);
    }
  }, []);

  return (
    <>
      <Header>
        <Container className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={4} className={classes.card}>
              <HeaderCard
                name="Renda"
                amount={transactionsStore.userInfo?.inputs || 0}
                icon={ArrowUpwardRoundedIcon}
                iconColor={green[600]}
              />
            </Grid>
            <Grid item xs={4} className={classes.card}>
              <HeaderCard
                name="Despesas"
                amount={transactionsStore.userInfo?.outputs || 0}
                icon={ArrowDownwardRoundedIcon}
                iconColor={red[600]}
              />
            </Grid>
            <Grid item xs={4} className={classes.card}>
              <HeaderCard
                name="Disponível"
                amount={total}
                icon={AttachMoneyRoundedIcon}
                special
              />
            </Grid>
          </Grid>
        </Container>
      </Header>

      <Grid container>
        <Grid item xs={12} className={classes.content}>
          <Container>
            <Grid container spacing={2}>
              {transactionsStore.transactions.map((transaction) => (
                <Grid item xs={12} key={transaction.id}>
                  <TransactionCard
                    description={transaction.description}
                    amount={transaction.amount}
                    date={transaction.date}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>

        <Fab onClick={openAddModal} className={classes.fab} color="primary">
          <AddRondedIcon />
        </Fab>

        {addModal && (
          <AddTransaction open={addModal} handleClose={closeAddModal} />
        )}
      </Grid>
    </>
  );
}

export default observer(Home);
