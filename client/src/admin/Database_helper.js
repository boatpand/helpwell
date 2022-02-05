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
import Accordion_helper from "./Accordion_helper";

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

export default function Database_helper(props) {
  const classes = useStyles();
  const GetStateParam = useLocation().state;
  const { Mobile } = GetStateParam;

  const [info_helper, setInfo_helper] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/helperuser/`)
      .then((res) => {
        console.log("res is ", res.data);
        setInfo_helper(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
  }, []);

  return (
    <ThemeProvider theme={theme_admin}>
      <Header_admin Mobile={Mobile}/>
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
              <Chip label="victim" variant="outlined" />
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

          {Object.keys(info_helper).length !== 0 ? (
            <Grid
              container
              spacing={1}
              justify="center"
              alignItems="center"
              display="block"
              className={classes.Spacer1}
            >
              {info_helper.map((info_helpers) => {
                return <Accordion_helper {...info_helpers}></Accordion_helper>;
              })}
            </Grid>
          ) : null}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </ThemeProvider>
  );
}
