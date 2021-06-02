import { Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { green, grey, red } from "@material-ui/core/colors";
import { formatCurrency, formatDate } from "../../services/formatter";

interface Props {
  description: string;
  amount: number;
  date: Date;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  description: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  amount: (props: Props) => ({
    color: props.amount > 0 ? green[700] : red[700],
  }),
  date: {
    color: grey[600],
    textAlign: "right",
  },
}));

function TransactionCard(props: Props) {
  const classes = useStyles(props);
  const { description, amount, date } = props;

  return (
    <Card elevation={0} className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <Typography className={classes.description}>{description}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.amount}>
            {formatCurrency(amount)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.date}>{formatDate(date)}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default TransactionCard;
