import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_vic from "./theme_vic";

import logo_white from "./image/logo_white_crop.png";

const useStyles = makeStyles((theme) => ({
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

export default function Header_Vic(props) {
  const classes = useStyles();
  const GetStateParam = useLocation().state;
  const { Mobile } = GetStateParam ;
  console.log("Header_Mobile : ", Mobile);
  return (
    <ThemeProvider theme={theme_vic}>
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
                pathname: `/victims`,
                state: { Mobile: Mobile },
              }}
            >
              <Typography>
                <img src={logo_white} className={classes.logoImage} />
              </Typography>
            </Link>
            <div className={classes.spancer} />
            <Link
              to={{
                pathname: `/victims`,
                state: { Mobile: Mobile },
              }}
            >
              <Button fontFamily="Kanit" color="inherit">
                ความต้องการ
              </Button>
            </Link>
            <Link
              to={{
                pathname: `/victims/map`,
                state: { Mobile: Mobile },
              }}
            >
              <Button color="inherit">map</Button>
            </Link>
            <Typography>|&nbsp;</Typography>
            <Link
              to={{
                pathname: `/victims/profile`,
                state: { Mobile: Mobile },
              }}
            >
              <Button color="inherit">Profile</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
