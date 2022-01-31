import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, Button } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_vic from "./theme_vic";
import Header_Vic from "./Header_vic";
import CardItem from "./CardItem";

const fontSize = 22;

const useStyles = makeStyles((theme) => ({
  Spacer1: {
    padding: theme.spacing(2),
  },
  Spacer2: {
    marginRight: theme.spacing(50),
  },
  Spacer3: {
    marginRight: theme.spacing(2),
  },
  Spancer: {
    marginRight: theme.spacing(110),
  },
}));

export default function Profile_vic(props) {
  const classes = useStyles();
  const GetStateParam = useLocation().state;
  const { Mobile } = GetStateParam || {};
  console.log("Profile_Mobile : ", Mobile);

  const [info, setInfo] = useState("");
  const [congenital, setCongenital] = useState("-");
  const [request, setRequest] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/victimuser/victim-profile/${Mobile}`)
      .then((res) => {
        console.log("res is ", res.data);
        setInfo(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    axios
      .get(`http://localhost:4000/victimuser/victim-disease/${Mobile}`)
      .then((res) => {
        console.log("res is ", res.data);
        setCongenital(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    axios
      .get(`http://localhost:4000/request/request/${Mobile}`)
      .then((res) => {
        console.log("res is ", res.data);
        setRequest(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
  }, []);

  console.log("Profile_info : ", info);
  console.log("Profile_request : ", request);
  return (
    <ThemeProvider theme={theme_vic}>
      <Header_Vic />
      <div className={classes.Spacer1} />
      <Grid container direction="row">
        <Typography
          ml={30}
          align="left"
          fontFamily="Kanit"
          fontSize={fontSize}
          variant="h5"
          color="text.primary"
        >
          Profile
        </Typography>
        <div className={classes.Spancer} />

        <Link
          to={{
            pathname: `/victims/profile/edit`,
            state: { Mobile: Mobile },
          }}
        >
          <Button variant="outlined" size="small">
            Edit Profile
          </Button>
        </Link>
        <div className={classes.Spacer3} />
        <Link
          to={{
            pathname: `/`,
            // state: { Mobile: Mobile },
          }}
        >
          <Button variant="outlined" size="small">
            sign out
          </Button>
        </Link>
      </Grid>

      <div className={classes.Spacer1} />
      <Grid container direction="row">
        <Typography
          ml={35}
          align="left"
          fontFamily="Kanit"
          fontSize={fontSize}
          variant="h5"
          color="text.primary"
        >
          ชื่อ - สกุล : &nbsp;&nbsp;&nbsp;{info.Firstname}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp; {info.Lastname}
        </Typography>
        <div className={classes.Spacer2} />
        <Typography
          mr={30}
          align="right"
          fontFamily="Kanit"
          fontSize={fontSize}
          variant="h5"
          color="text.primary"
        >
          เบอร์โทรศัพท์ : &nbsp;&nbsp;&nbsp;{info.Mobile}
        </Typography>
      </Grid>
      <div className={classes.Spacer1} />
      <Grid container direction="row">
        <Typography
          ml={35}
          mr={30}
          align="left"
          fontFamily="Kanit"
          fontSize={fontSize}
          variant="h5"
          color="text.primary"
        >
          อายุ : &nbsp;&nbsp;&nbsp;{info.Age}
        </Typography>

        <Typography
          mr={30}
          align="right"
          fontFamily="Kanit"
          fontSize={fontSize}
          variant="h5"
          color="text.primary"
        >
          เพศ : &nbsp;&nbsp;&nbsp;{info.Gender}
        </Typography>

        <Typography
          mr={30}
          align="right"
          fontFamily="Kanit"
          fontSize={fontSize}
          variant="h5"
          color="text.primary"
        >
          โรคประจำตัว : &nbsp;&nbsp;&nbsp;{congenital.Disease}
        </Typography>
      </Grid>
      <div className={classes.Spacer1} />
      <Typography
        ml={35}
        align="left"
        fontFamily="Kanit"
        fontSize={fontSize}
        variant="h5"
        color="text.primary"
      >
        ที่อยู่ : &nbsp;&nbsp;&nbsp;{info.House_No}&nbsp;&nbsp;ซอย&nbsp;
        {info.Soi}&nbsp;&nbsp;ถนน&nbsp;
        {info.Road}&nbsp;&nbsp;แขวง&nbsp;{info.Subdistrict}&nbsp;&nbsp;เขต&nbsp;
        {info.District}&nbsp;&nbsp;
        {info.Province}&nbsp;&nbsp;
        {info.ZIP_Code}
      </Typography>
      <hr />
      {Object.keys(request).length !== 0 ? (
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          display="block"
        >
          <div className={classes.Spacer1} />
          <Typography
            ml={35}
            align="left"
            fontFamily="Kanit"
            fontSize={fontSize}
            variant="h5"
            color="text.primary"
          >
            รายการขอความช่วยเหลือ
          </Typography>

          {request.map((requests) => {
            return <CardItem {...requests}></CardItem>;
          })}
        </Grid>
      ) : null}
    </ThemeProvider>
  );
}
