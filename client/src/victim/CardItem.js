import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_vic from "./theme_vic";
import {
  Card,
  Grid,
  CardActions,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Profile_accor from "./Profile_accor";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    display: "block",
    margin: "0px auto",
  },
  status: {
    display: "grid",
    justifyContent: "flex-end",
  },
  spancer: {
    flexGrow: 1,
    flexShrink: 0,
  },
}));

export default function CardItem(props) {
  const classes = useStyles();
  const {
    Mobile,
    Food,
    count_Food,
    Medicine,
    count_Medicine,
    Bed,
    count_Bed,
    Hospital,
    count_Hospital,
    Home,
    count_Home,
    Other,
    count_Other,
    Option,
    Status,
    Status_Text,

    // Mobile,
    RequestID,
    // Other,
    // Status,
    // Status_Text,
    date,
  } = props;
  // console.log(RequestID);
  const [flag, setFlag] = useState(false);

  const [Request, setRequest] = useState([]);
  const [Request_Detail, setRequest_Detail] = useState([]);

  useEffect(() => {
    async function FetchRequestDetail() {
      await axios
        .get(`http://localhost:4000/request/request/${Mobile}`)
        .then((res) => {
          setRequest(res.data);
        })
        .catch((err) => {
          Promise.reject(err);
        });
      await axios
        .get(`http://localhost:4000/request/request-detailed/${RequestID}`)
        .then((res) => {
          // console.log("detail is ", res.data);
          setRequest_Detail(res.data);
          // console.log(Request_Detail[0].RequestID);
        })
        .catch((err) => {
          Promise.reject(err);
        });
      await setFlag(true);
    }
    FetchRequestDetail();
  }, []);

  useEffect(() => {
    console.log("Request Detail: ", Request_Detail);
    Extract_Detail();
  }, [flag]);

  // console.log("Request_Detail[0].RequestID: ",Request_Detail[0].RequestID);
  const [res, setRes] = useState([]);
  var help_count = [];

  const Extract_Detail = () => {
    console.log("Request.length: ", Request.length);
    console.log("Request_Detail.length: ", Request_Detail.length);
    for (var i = 0; i < Request.length; i++) {
      for (var j = 0; j < Request_Detail.length; j++) {
        if (Request[i].RequestID == Request_Detail[j].RequestID) {
          let code = Request_Detail[j].Helpcode; // 101, 102, ..., 105, VARCHAR
          if (code == "101") {
            help_count.push({
              key: "อาหาร",
              value: Request_Detail[j].Count,
            });
          }
          else if (code == "102") {
            help_count.push({
              key: "ยา",
              value: Request_Detail[j].Count,
            });
          }
          else if (code == "103") {
            help_count.push({
              key: "หาเตียง",
              value: Request_Detail[j].Count,
            });
          }
          else if (code == "104") {
            help_count.push({
              key: "รถนำส่งโรงพยาบาล",
              value: Request_Detail[j].Count,
            });
          }
          else if (code == "105") {
            help_count.push({
              key: "รถนำส่งลำเนา",
              value: Request_Detail[j].Count,
            });
          }
          else if (code != '') {
            help_count.push({
              key: code,
              value: Request_Detail[j].Count,
            });
          }
          // setRes((res) => [...res, code]); // res = ['101', '102'] ตามรอบที่ i
        }
      }
      let data = [
        {
          Mobile: Mobile,
          RequestID: RequestID,
          Other: Other,
          Status: Status,
          Status_Text: Status_Text,
          date: date,
          Helpcode: help_count, //['101', '102']
        },
      ];
      console.log("res: ", res);
      console.log("tmp: ", help_count);

      <Typography>Card Item</Typography>
      data.map((datas) => {
        return <Profile_accor {...datas}></Profile_accor>;
      });
    }
  };

  return (
    <ThemeProvider theme={theme_vic}>
      {Extract_Detail()}
      {/* <Grid item xs={12}>
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
            <Typography
              style={{
                color: "#2F4A8A",
                fontFamily: "Kanit",
                fontSize: "1.3vw",
              }}
            >
              ความช่วยเหลือที่ต้องการ :&nbsp;&nbsp;
            </Typography>
            <div className={classes.spancer} />

            <div className={classes.status}>
              {/* Status
              {Status === "รอการช่วยเหลือ" ? (
                  <Typography
                    color="text.primary"
                    className={classes.status}
                    style={{ color: "#ffc107", fontFamily: "Kanit", fontSize: "1.2vw" }}
                  >
                    {Status}
                  </Typography>        
              ) : null}
              {Status === "กำลังช่วยเหลือ" ? (
                <Typography
                  color="text.primary"
                  className={classes.status}
                  style={{ color: "#adb5bd", fontFamily: "Kanit" , fontSize: "1.2vw" }}
                >
                  {Status}
                </Typography>
              ) : null}
              {Status === "ช่วยเหลือสำเร็จ" ? (
                <Typography
                  color="text.primary"
                  className={classes.status}
                  style={{ color: "#198754", fontFamily: "Kanit", fontSize: "1.2vw"  }}
                >
                  {Status}
                </Typography>
              ) : null}

              <Typography
                style={{
                  color: "#6c757d",
                  fontFamily: "Kanit",
                  fontSize: "1.0vw",
                }}
              >
                ขอความช่วยเหลือเมื่อ :
                {" วันที่ " +
                  date.slice(8, 10) +
                  " / " +
                  date.slice(5, 7) +
                  " / " +
                  date.slice(0, 4) +
                  "   " +
                  " เวลา " +
                  date.slice(11, 16) +
                  " น."}
              </Typography>
            </div>
            {/* {Food ? (
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                }}
              >
                &nbsp;อาหาร&nbsp;
                {Extract_Detail()}
              </Typography>
            ) : null} */}
      {/* {Extract_Detail()} 
          </AccordionSummary>
          <AccordionDetails>
            {/* Food 
            {Food ? (
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
                    style={{ color: "#6c757d", fontFamily: "Kanit" }}
                  >
                    จำนวนอาหารที่ต้องการ
                  </Typography>

                  <Typography style={{ color: "#6c757d", fontFamily: "Kanit" }}>
                    {count_Food}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
                  </Typography>
                </Box>
              </div>
            ) : null}
          </AccordionDetails>
          <hr />
        </Accordion>
      </Grid> */}

      {/* <Grid item>
        <Card className={classes.root}>
          <CardContent>
            {/* Status 
            {Status === "รอการช่วยเหลือ" ? (
              <Typography
                color="text.primary"
                className={classes.status}
                style={{ color: "#ffc107", fontFamily: "Kanit" }}
              >
                {Status}
              </Typography>
            ) : null}
            {Status === "กำลังช่วยเหลือ" ? (
              <Typography
                color="text.primary"
                className={classes.status}
                style={{ color: "#adb5bd", fontFamily: "Kanit" }}
              >
                {Status}
              </Typography>
            ) : null}
            {Status === "ช่วยเหลือสำเร็จ" ? (
              <Typography
                color="text.primary"
                className={classes.status}
                style={{ color: "#198754", fontFamily: "Kanit" }}
              >
                {Status}
              </Typography>
            ) : null}

            {/* Topic Help 
            <div style={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  m: 2,
                }}
              >
                <Typography
                  style={{
                    color: "#2F4A8A",
                    fontFamily: "Kanit",
                    fontSize: "1.2vw",
                  }}
                >
                  ความช่วยเหลือที่ต้องการ :&nbsp;&nbsp;
                </Typography>
                {Food ? (
                  <Typography
                    style={{
                      color: "#2F4A8A",
                      fontFamily: "Kanit",
                      fontSize: "1.2vw",
                    }}
                  >
                    &nbsp;อาหาร&nbsp;
                  </Typography>
                ) : null}
                {Bed ? (
                  <Typography
                    style={{
                      color: "#2F4A8A",
                      fontFamily: "Kanit",
                      fontSize: "1.2vw",
                    }}
                  >
                    &nbsp;หาเตียง&nbsp;
                  </Typography>
                ) : null}
                {Medicine ? (
                  <Typography
                    style={{
                      color: "#2F4A8A",
                      fontFamily: "Kanit",
                      fontSize: "1.2vw",
                    }}
                  >
                    &nbsp;ยา&nbsp;
                  </Typography>
                ) : null}
                {Hospital ? (
                  <Typography
                    style={{
                      color: "#2F4A8A",
                      fontFamily: "Kanit",
                      fontSize: "1.2vw",
                    }}
                  >
                    &nbsp;นำส่งโรงพยาบาล&nbsp;
                  </Typography>
                ) : null}
                {Home ? (
                  <Typography
                    style={{
                      color: "#2F4A8A",
                      fontFamily: "Kanit",
                      fontSize: "1.2vw",
                    }}
                  >
                    &nbsp;นำส่งภูมิลำเนา&nbsp;
                  </Typography>
                ) : null}
                {count_Other !== 0 ? (
                  <Typography
                    style={{
                      color: "#2F4A8A",
                      fontFamily: "Kanit",
                      fontSize: "1.2vw",
                    }}
                  >
                    &nbsp;อื่นๆ&nbsp;
                  </Typography>
                ) : null}
              </Box>
            </div>

            {/* Food 
            {Food ? (
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
                    style={{ color: "#6c757d", fontFamily: "Kanit" }}
                  >
                    จำนวนอาหารที่ต้องการ
                  </Typography>

                  <Typography style={{ color: "#6c757d", fontFamily: "Kanit" }}>
                    {count_Food}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
                  </Typography>
                </Box>
              </div>
            ) : null}

            {/* Medicine 
            {Medicine ? (
              <div style={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: 2,
                  }}
                >
                  <Typography
                    sx={{ flexShrink: 0 }}
                    style={{ color: "#6c757d", fontFamily: "Kanit" }}
                  >
                    จำนวนยาที่ต้องการ
                  </Typography>
                  <div className={classes.Spacer} />
                  <Typography style={{ color: "#6c757d", fontFamily: "Kanit" }}>
                    {count_Medicine}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
                  </Typography>
                </Box>
              </div>
            ) : null}

            {/* Bed 
            {Bed ? (
              <div style={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: 2,
                  }}
                >
                  <Typography
                    sx={{ flexShrink: 0 }}
                    style={{ color: "#6c757d", fontFamily: "Kanit" }}
                  >
                    จำนวนเตียงที่ต้องการขอ
                  </Typography>
                  <div className={classes.Spacer} />
                  <Typography style={{ color: "#6c757d", fontFamily: "Kanit" }}>
                    {count_Bed}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
                  </Typography>
                </Box>
              </div>
            ) : null}

            {/* Hospital 
            {Hospital ? (
              <div style={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: 2,
                  }}
                >
                  <Typography
                    sx={{ flexShrink: 0 }}
                    style={{ color: "#6c757d", fontFamily: "Kanit" }}
                  >
                    จำนวนผู้ป่วยที่ต้องการรถนำส่งโรงพยาบาล
                  </Typography>
                  <div className={classes.Spacer} />
                  <Typography style={{ color: "#6c757d", fontFamily: "Kanit" }}>
                    {count_Hospital}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
                  </Typography>
                </Box>
              </div>
            ) : null}

            {/* Home 
            {Home ? (
              <div style={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: 2,
                  }}
                >
                  <Typography
                    sx={{ flexShrink: 0 }}
                    style={{ color: "#6c757d", fontFamily: "Kanit" }}
                  >
                    จำนวนผู้ป่วยที่ต้องการรถนำส่งภูมิลำเนา
                  </Typography>
                  <div className={classes.Spacer} />
                  <Typography style={{ color: "#6c757d", fontFamily: "Kanit" }}>
                    {count_Home}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
                  </Typography>
                </Box>
              </div>
            ) : null}

            {/* Other 
            {count_Other ? (
              <div style={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: 2,
                  }}
                >
                  <Typography
                    sx={{ flexShrink: 0 }}
                    style={{ color: "#6c757d", fontFamily: "Kanit" }}
                  >
                    {Other}
                  </Typography>
                  <div className={classes.Spacer} />
                  <Typography style={{ color: "#6c757d", fontFamily: "Kanit" }}>
                    {count_Other}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ชุด
                  </Typography>
                </Box>
              </div>
            ) : null}

            {/* รายละเอียด Option 
            <div style={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: 2,
                }}
              >
                <Typography
                  sx={{ flexShrink: 0 }}
                  style={{ color: "#6c757d", fontFamily: "Kanit" }}
                >
                  รายละเอียด :
                </Typography>
                <div className={classes.Spacer} />
                <Typography style={{ color: "#6c757d", fontFamily: "Kanit" }}>
                  {Option}
                </Typography>
              </Box>
            </div>

            {/* ความคืบหน้า Status text 
            <div style={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: 2,
                }}
              >
                <Typography
                  sx={{ flexShrink: 0 }}
                  style={{ color: "#6c757d", fontFamily: "Kanit" }}
                >
                  ความคืบหน้า :
                </Typography>
                <div className={classes.Spacer} />
                <Typography style={{ color: "#6c757d", fontFamily: "Kanit" }}>
                  {Status_Text}
                </Typography>
              </Box>
            </div>
          </CardContent>
        </Card>
      </Grid> */}
    </ThemeProvider>
  );
}
