import {
  Card,
  makeStyles,
  SvgIconTypeMap,
  Typography,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { formatCurrency } from "../../services/formatter";

interface Props {
  name: string;
  amount: number;
  special?: boolean;

  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  iconColor?: string;
}

const useStyles = makeStyles((theme) => ({
  root: ({ special }: Props) => ({
    padding: theme.spacing(2),
    textAlign: "left",
    backgroundColor: special ? theme.palette.primary.light : "white",
  }),
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: ({ special, iconColor }: Props) => ({
    color: special ? "white" : iconColor ?? "black",
  }),
  title: ({ special }: Props) => ({
    color: special
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
  }),
  amount: ({ special }: Props) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 36,
    color: special
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
  }),
}));

function HeaderCard(props: Props) {
  const classes = useStyles(props);
  const { name, amount } = props;

  return (
    <Card elevation={0} className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title}>{name}</Typography>
        <props.icon className={classes.icon} />
      </div>

      <Typography className={classes.amount}>
        {formatCurrency(amount)}
      </Typography>
    </Card>
  );
}

export default HeaderCard;
