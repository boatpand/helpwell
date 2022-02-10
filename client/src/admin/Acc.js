import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Stack, Chip } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";

import theme_admin from "./theme_admin";
import CardItem from "../victim/CardItem";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
  GridSpacer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 100,
    justifyContent: "center",
  },
  Stack: {
    padding: theme.spacing(2),
    justifyContent: "center",
    color: "black",
  },
  Spacer1: {
    padding: theme.spacing(2),
  },
  Spancer: {
    justifyContent: "flex-end",
  },
}));

export default function Acc(props) {
  const classes = useStyles();
  const {
    Mobile,
    Firstname,
    Lastname,
    Age,
    Gender,
    Nationality,
    House_No,
    Soi,
    Road,
    Subdistrict,
    District,
    Province,
    ZIP_Code,
  } = props;
  const [info, setInfo] = useState("");
  const [congenital, setCongenital] = useState("-");
  const [request_vic, setRequest_vic] = useState([]);

  console.log("Mobile_Accordion : ", Mobile);

  useEffect(async () => {
    // console.log("MO: ", Mobile);
    await axios
      .get(`http://localhost:4000/victimuser/victim-disease/${Mobile}`)
      .then((res) => {
        //console.log("res is ", res.data);
        setCongenital(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    // console.log("MO_1: ", Mobile);
    await axios
      .get(`http://localhost:4000/request/request/${Mobile}`)
      .then((res) => {
        console.log("resquest is ", res.data);
        setRequest_vic(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
  }, [Mobile]);
  // console.log("Accordion_Mobile : ", { Mobile });
  // console.log("Accordion_congenital : ", congenital);
//   console.log("Accordion_request : ", request_vic);

  return (
    <ThemeProvider theme={theme_admin}>
      <Grid item xs={12}>
        <Accordion style={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <Typography fontFamily="Kanit">
              {Firstname}&nbsp;&nbsp;{Lastname}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontFamily="Kanit" sx={{ flexShrink: 0 }}>
                เบอร์โทรศัพท์&nbsp;:&nbsp;{Mobile}
              </Typography>
              <Typography fontFamily="Kanit">อายุ&nbsp;:&nbsp;{Age}</Typography>

              <Typography fontFamily="Kanit">
                เพศ&nbsp;:&nbsp;{Gender}
              </Typography>
              <Typography fontFamily="Kanit">
                โรคประจำตัว&nbsp;:&nbsp;{congenital.Disease}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontFamily="Kanit">
                ที่อยู่ : &nbsp;&nbsp;&nbsp;{House_No}&nbsp;&nbsp;ซอย&nbsp;
                {Soi}&nbsp;&nbsp;ถนน&nbsp;
                {Road}&nbsp;&nbsp;แขวง&nbsp;{Subdistrict}&nbsp;&nbsp;เขต&nbsp;
                {District}&nbsp;&nbsp;
                {Province}&nbsp;&nbsp;
                {ZIP_Code}
              </Typography>
            </Box>
          </AccordionDetails>
          <hr />
          <AccordionDetails>
            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
              display="block"
            >
              <Box
                ml={2.5}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" fontFamily="Kanit">
                  รายการขอความช่วยเหลือ
                </Typography>
              </Box>

              {request_vic.map((requests) => {
                return <CardItem {...requests}></CardItem>;
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </ThemeProvider>
  );
}
