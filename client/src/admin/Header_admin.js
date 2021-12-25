import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_admin from "./theme_admin";

import logo_white from "./image/logo-white-crop.png";

const useStyles = makeStyles(() => ({
  logoImage: {
    width: 120,
    height: 50,
  },
  Header: {
    height: "4rem",
    weight: "100%",
    padding: "0 5%",
    justifyContent: "center",
  },
  spancer: {
    flexGrow: 1,
  },
}));

export default function Header_admin() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme_admin}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1 }}
      >
        <AppBar position="static" className={classes.Header}>
          <Toolbar>
            <Link
              to={{
                pathname: `/admin`,
              }}
            >
              <Typography>
                <img src={logo_white} className={classes.logoImage} />
              </Typography>
            </Link>
            <div className={classes.spancer} />
            <Link
              to={{
                pathname: `/admin/database`,
              }}
            >
              <Button fontFamily="Kanit" color="secondary">
                databaseeeeeeee
              </Button>
            </Link>
            <Link
              to={{
                pathname: `/admin/map`,
              }}
            >
              <Button color="secondary">map</Button>
            </Link>
            <Typography color="secondary">|&nbsp;</Typography>
            <Link
              to={{
                pathname: `/admin/information`,
              }}
            >
              <Button color="secondary">information</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
