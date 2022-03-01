import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, Button, Box } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_vic from "./theme_vic";
import Header_Vic from "./Header_vic";
import CardItem from "./CardItem";

const useStyles = makeStyles((theme) => ({
  Spacer1: {
    padding: theme.spacing(1),
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
  const { Mobile } = GetStateParam;
  // console.log("Profile_Mobile : ", Mobile);

  const [info, setInfo] = useState("");
  const [congenital, setCongenital] = useState("-");
  const [request, setRequest] = useState([]);
  const [RequestID, setRequestID] = useState([]);
  const [flag, setFlag] = useState(false);
  const [Request_Detail, setRequest_Detail] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/victimuser/victim-profile/${Mobile}`)
      .then((res) => {
        // console.log("res is ", res.data);
        setInfo(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    axios
      .get(`http://localhost:4000/victimuser/victim-disease/${Mobile}`)
      .then((res) => {
        // console.log("res is ", res.data);
        setCongenital(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    axios
      .get(`http://localhost:4000/request/request/${Mobile}`)
      .then((res) => {
        setRequest(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    setFlag(true)
  }, []);

  useEffect(() => {
    // console.log("Flag: ", flag)
    // console.log("RequestID: ",RequestID)
    // axios
    //     .get(`http://localhost:4000/request/request-detailed/${RequestID}`)
    //     .then((res) => {
    //       console.log("detail is ", res.data);
    //       setRequest_Detail(res.data);
    //       // console.log(Request_Detail[0].RequestID);
    //     })
    //     .catch((err) => {
    //       Promise.reject(err);
    //     });

  }, [flag])

  

  // console.log("Profile_info : ", info);
  // console.log("Profile_request : ", request);
  return (
    <ThemeProvider theme={theme_vic}>
      <Header_Vic Mobile={Mobile} />

      <div className={classes.Spacer1} />
      <Grid container direction="row" justifyContent="space-around">
        <Grid item xs={1} alignItems="center"></Grid>
        <Grid item xs={10} alignItems="center">
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 2,
              }}
            >
              <Typography
                fontFamily="Kanit"
                color="#2F4A8A"
                sx={{ flexShrink: 0 }}
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.8vw",
                }}
              >
                Profile
              </Typography>
              <Typography>
                <Link
                  to={{
                    pathname: `/victims/profile/edit`,
                    state: { Mobile: Mobile },
                  }}
                  style={{ textDecorationLine: "none" }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ fontFamily: "Kanit", fontSize: "1.1vw" }}
                  >
                    Edit Profile
                  </Button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link
                  to={{
                    pathname: `/`,
                    // state: { Mobile: Mobile },
                  }}
                  style={{ textDecorationLine: "none" }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ fontFamily: "Kanit", fontSize: "1.1vw" }}
                  >
                    sign out
                  </Button>
                </Link>
              </Typography>
            </Box>
          </div>
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 2,
              }}
            >
              <Typography
                fontFamily="Kanit"
                color="#2F4A8A"
                sx={{ flexShrink: 0 }}
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              >
                ชื่อ - สกุล : &nbsp;&nbsp;&nbsp;{info.Firstname}
                &nbsp;&nbsp;&nbsp;&nbsp; {info.Lastname}
              </Typography>

              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              >
                เบอร์โทรศัพท์ : &nbsp;&nbsp;&nbsp;{info.Mobile}
              </Typography>
            </Box>
          </div>

          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 2,
              }}
            >
              <Typography
                fontFamily="Kanit"
                color="#2F4A8A"
                sx={{ flexShrink: 0 }}
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              >
                อายุ : &nbsp;&nbsp;&nbsp;{info.Age}
              </Typography>

              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              >
                เพศ : &nbsp;&nbsp;&nbsp;{info.Gender}
              </Typography>
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              >
                โรคประจำตัว : &nbsp;&nbsp;&nbsp;{congenital.Disease}
              </Typography>
            </Box>
          </div>

          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 2,
              }}
            >
              <Typography
                fontFamily="Kanit"
                color="#2F4A8A"
                sx={{ flexShrink: 0 }}
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              >
                ที่อยู่ : &nbsp;&nbsp;&nbsp;{info.House_No}&nbsp;&nbsp;ซอย&nbsp;
                {info.Soi}&nbsp;&nbsp;ถนน&nbsp;
                {info.Road}&nbsp;&nbsp;แขวง&nbsp;{info.Subdistrict}
                &nbsp;&nbsp;เขต&nbsp;
                {info.District}&nbsp;&nbsp;
                {info.Province}&nbsp;&nbsp;
                {info.ZIP_Code}
              </Typography>
            </Box>
          </div>
          <hr />

          {Object.keys(request).length !== 0 ? (
            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
              display="block"
            >
              <div style={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: 2,
                  }}
                >
                  <Typography
                    fontFamily="Kanit"
                    color="#2F4A8A"
                    sx={{ flexShrink: 0 }}
                    style={{
                      color: "#2F4A8A",
                      fontFamily: "Kanit",
                      fontSize: "1.5vw",
                    }}
                  >
                    รายการการขอความช่วยเหลือ
                  </Typography>
                </Box>
              </div>

              {request.map((requests) => {
                return <CardItem {...requests}></CardItem>;
              })}
            </Grid>
          ) : null}
        </Grid>
        <Grid item xs={1} alignItems="center"></Grid>
      </Grid>
    </ThemeProvider>
  );
}
