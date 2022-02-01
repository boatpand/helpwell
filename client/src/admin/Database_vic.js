import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Grid, Stack, Chip } from "@mui/material";
import { Fastfood } from "@mui/icons-material";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";

import theme_admin from "./theme_admin";
import Header_admin from "./Header_admin";
import Accordion_vic from "./Accordion_vic";

const fontSize = 22;

const useStyles = makeStyles((theme) => ({
  GridSpacer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 100,
    justifyContent: "center",
  },
  Stack: {
    padding: theme.spacing(1.5),
    justifyContent: "center",
  },
  Spacer1: {
    justifyContent: "center",
  },
  Spancer: {
    justifyContent: "flex-end",
  },
}));

export default function Database_vic(props) {
  const classes = useStyles();
  const GetStateParam = useLocation().state;
  const { Mobile } = GetStateParam;

  const [info_vic, setInfo_vic] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/victimuser/`)
      .then((res) => {
        console.log("res is ", res.data);
        setInfo_vic(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
  }, []);

  console.log("info_vic : ", info_vic);
  console.log("info_mobile : ", Mobile);

  return (
    <ThemeProvider theme={theme_admin}>
      <Header_admin />
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Stack direction="row" spacing={1} className={classes.Stack}>
            <Link
              to={{
                pathname: `/admin/database/victims`,
                state: { Mobile: Mobile },
              }}
            >
              <Chip label="victim" variant="outlined"/>
            </Link>
            <Link
              to={{
                pathname: `/admin/database/helpers`,
                state: { Mobile: Mobile },
              }}
            >
            <Chip label="helper" variant="outlined"/>
            </Link>
          </Stack>

          {Object.keys(info_vic).length !== 0 ? (
            <Grid
              container
              spacing={1}
              justify="center"
              alignItems="center"
              display="block"
              className={classes.Spacer1}
            >
              {info_vic.map((info_vics) => {
                return <Accordion_vic {...info_vics}></Accordion_vic>;
              })}
            </Grid>
          ) : null}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </ThemeProvider>
  );
}
