import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Grid, Stack, Chip, Input } from "@mui/material";
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

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [flag, setFlag] = useState(0);

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

  useEffect(() => {
    setFiltered(
      info_helper.filter((searchValue) => {
        return Object.values(searchValue)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
    setFlag(0);
    
  }, [search, info_helper, flag]);
  
  const onChange = (e) =>{
    setSearch(e.target.value);
    setFlag(1)
  }

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
              style={{textDecorationLine:"none", fontFamily:"Kanit"}}
            >
              <Chip label="victim" variant="outlined" />
            </Link>
            <Link
              to={{
                pathname: `/admin/database/helpers`,
                state: { Mobile: Mobile },
              }}
              style={{textDecorationLine:"none", fontFamily:"Kanit"}}
            >
            <Chip label="helper" variant="outlined"/>
            </Link>
          </Stack>

          <Input
            style={{ width: "100%", fontFamily: "Kanit", marginBottom: "1%" }}
            icon="search"
            placeholder="Search"
            onChange={onChange}
          />
          
          {filtered.map((item) => {
            return (
              <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                display="block"
                className={classes.Spacer1}
              >
                
                <Accordion_helper {...item}></Accordion_helper>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </ThemeProvider>
  );
}
