import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme_vic from "./theme_vic";
import logo_white from "./image/logo_white_crop.png";

const useStyles = makeStyles((theme) => ({
  logoImage: {
    width: 90,
    height: 50,
  },
  Header: {
    height: "4rem",
    weight: "100%",
    padding: "0 5%",
    top: "1rem",
    justifyContent: "center",
  },
  spancer: {
    flexGrow: 1,
  },
  dash: {
    justifyContent: "center",
    marginRight: theme.spacing(5),
  },
}));

export default function Header_Vic() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme_vic}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1 }}
      >
        <AppBar position="static" className={classes.Header}>
          <Toolbar variant="dense">
            <Typography>
              <img src={logo_white} className={classes.logoImage} />
            </Typography>
            <div className={classes.spancer} />
            <Button color="inherit">Type of help</Button>
            <Button color="inherit">map</Button>
            <Typography className={classes.dash}>|</Typography>
            <Button marginLeft="10px" color="inherit">
              Profile
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
