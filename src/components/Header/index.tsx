import {
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { useState } from "react";
import { useHistory } from "react-router";
import firebaseServices from "../../services/firebase";

interface Props {
  children?: React.ReactNode;
}

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
  settingsBtn: {
    position: "absolute",
    top: theme.spacing(3),
    right: theme.spacing(2),
  },
  settingsIcon: {
    color: "#ffffff",
  },
}));

function Header({ children }: Props) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleLogout() {
    firebaseServices.signOut();
    history.push("/login");
  }

  return (
    <Grid container>
      <Grid item xs={12} className={classes.header}>
        <Typography className={classes.title}>
          dev.finance<span className={classes.dollar}>$</span>
        </Typography>
        <IconButton onClick={handleMenu} className={classes.settingsBtn}>
          <SettingsIcon className={classes.settingsIcon} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>

        {children}
      </Grid>
    </Grid>
  );
}

export default Header;
