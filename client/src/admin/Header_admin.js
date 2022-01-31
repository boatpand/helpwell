import React from "react";
import { useLocation } from "react-router";
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

export default function Header_admin(props) {
  const classes = useStyles();
  const GetStateParam = useLocation().state;
  const { Mobile } = GetStateParam ;
  console.log()
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
                pathname: `/admin/database`,
                state: { Mobile: Mobile },
              }}
            >
              <Typography>
                <img src={logo_white} className={classes.logoImage} />
              </Typography>
            </Link>
            <div className={classes.spancer} />
            <Link
              style={{textDecorationLine:"none", fontFamily:"Kanit", fontSize:"1.3vw", color:"#ffffff"}}
              to={{
                pathname: `/admin/database`,
                state: { Mobile: Mobile },
              }}
            >
              ฐานข้อมูล
            </Link>
            <Typography>&nbsp;&nbsp;&nbsp;</Typography>

            <Link
              style={{textDecorationLine:"none", fontFamily:"Kanit", fontSize:"1.3vw", color:"#ffffff"}}
              to={{
                pathname: `/admin/map`,
                state: { Mobile: Mobile },
              }}
            >
            แผนที่
            </Link>
            <Typography>&nbsp;&nbsp;&nbsp;</Typography>

            <Typography color="secondary" style={{fontSize:"1.3vw"}}>|&nbsp;&nbsp;&nbsp;</Typography>
            <Link
              style={{textDecorationLine:"none", fontFamily:"Kanit", fontSize:"1.3vw", color:"#ffffff"}}
              to={{
                pathname: `/admin/information`,
                state: { Mobile: Mobile },
              }}
            >
            information
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
