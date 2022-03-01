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

export default function Profile_accor(props) {
  const classes = useStyles();
  const {
    // Mobile,
    // Food,
    // count_Food,
    // Medicine,
    // count_Medicine,
    // Bed,
    // count_Bed,
    // Hospital,
    // count_Hospital,
    // Home,
    // count_Home,
    // Other,
    // count_Other,
    // Option,
    // Status,
    // Status_Text,

    // Mobile,
    RequestID,
    // Other,
    // Status,
    // Status_Text,
    // date,
    help,
  } = props;

  const [Request_Detail, setRequest_Detail] = useState([]);
  const [Detail, setDetail] = useState([]);
  const [date, setDate] = useState("");
  const [Status, setStatus] = useState("");
  const [flag, setFlag] = useState(false);
  // console.log("Profile_Accor: ", RequestID);

  useEffect(() => {
    async function FetchData() {
      await axios
        .get(`http://localhost:4000/request/request-detail/${RequestID}`)
        .then((res) => {
          setStatus(res.data.Status);
          setDate(res.data.date);
          console.log(res.data.date);
        })
        .catch((err) => {
          Promise.reject(err);
        });
      await axios
        .get(`http://localhost:4000/request/request-detail-detail/${RequestID}`)
        .then((res) => {
          setDetail(res.data);
          // console.log("Detail: ", res.data);
        })
        .catch((err) => {
          Promise.reject(err);
        });
      await setFlag(true);
    }
    FetchData();
  }, []);

  useEffect(async () => {
    let details = [];
    let tmp = {};
    // console.log("Detail is ", Detail);
    for (var i = 0; i < Detail.length; i++) {
      if (Detail[i].Helpcode === "101") {
        tmp = {
          help: "อาหาร",
          option: Detail[i].Option,
          count: Detail[i].Count,
          status: Detail[i].Status,
        };
      }
      if (Detail[i].Helpcode === "102") {
        tmp = {
          help: "ยา",
          option: Detail[i].Option,
          count: Detail[i].Count,
          status: Detail[i].Status,
        };
      }
      if (Detail[i].Helpcode === "103") {
        tmp = {
          help: "เตียง",
          option: Detail[i].Option,
          count: Detail[i].Count,
          status: Detail[i].Status,
        };
      }
      if (Detail[i].Helpcode === "104") {
        tmp = {
          help: "รถนำส่งโรงพยาบาล",
          option: Detail[i].Option,
          count: Detail[i].Count,
          status: Detail[i].Status,
        };
      }
      if (Detail[i].Helpcode === "105") {
        tmp = {
          help: "รถนำส่งภูมิลำเนา",
          option: Detail[i].Option,
          count: Detail[i].Count,
          status: Detail[i].Status,
        };
      }
      if (Detail[i].Helpcode === "106") {
        tmp = {
          help: "อื่นๆ",
          option: Detail[i].Option,
          count: Detail[i].Count,
          status: Detail[i].Status,
        };
      }
      details.push(tmp);
    }
    // console.log(detail);
    await setRequest_Detail(details);
    console.log(Request_Detail);
    await setFlag(false);
  }, [flag == true]);

  const ShowDetail = () => {};

  return (
    <ThemeProvider theme={theme_vic}>
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
            <Typography
              style={{
                color: "#2F4A8A",
                fontFamily: "Kanit",
                fontSize: "1.3vw",
              }}
            >
              ความช่วยเหลือที่ต้องการ :&nbsp;&nbsp;{help}
            </Typography>
            <div className={classes.spancer} />

            <div className={classes.status}>
              {/* Status */}
              {Status === "รอการช่วยเหลือ" ? (
                <Typography
                  color="text.primary"
                  className={classes.status}
                  style={{
                    color: "#ffc107",
                    fontFamily: "Kanit",
                    fontSize: "1.2vw",
                  }}
                >
                  {Status}
                </Typography>
              ) : null}
              {Status === "กำลังช่วยเหลือ" ? (
                <Typography
                  color="text.primary"
                  className={classes.status}
                  style={{
                    color: "#adb5bd",
                    fontFamily: "Kanit",
                    fontSize: "1.2vw",
                  }}
                >
                  {Status}
                </Typography>
              ) : null}
              {Status === "ช่วยเหลือสำเร็จ" ? (
                <Typography
                  color="text.primary"
                  className={classes.status}
                  style={{
                    color: "#198754",
                    fontFamily: "Kanit",
                    fontSize: "1.2vw",
                  }}
                >
                  {Status}
                </Typography>
              ) : null}

              {/* Date */}
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
            {/* {Extract_Detail()} */}
          </AccordionSummary>
          <AccordionDetails>
            {Request_Detail.map((infos) => {
              return (
                <>
                  {infos.help == "อาหาร" ? (
                    <div style={{ width: "100%",display: "block" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          m: 2,
                        }}
                      >
                        <Typography
                          style={{
                            color: "#2F4A8A",
                            fontFamily: "Kanit",
                            fontSize: "1.2vw",
                            flexShrink: 0 
                          }}
                        >
                          จำนวนอาหารที่ต้องการ
                        </Typography>
                        <Typography
                          style={{
                            color: "#2F4A8A",
                            fontFamily: "Kanit",
                            fontSize: "1.2vw",
                            flexShrink: 0
                          }}
                        >
                          {infos.count} วัน
                        </Typography>
                      </Box>
                    </div>
                  ) : null}
                  <br />

                  {infos.help == "เตียง" ? (
                    <div style={{ width: "100%",display: "block" }}>
                      <br />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
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
                          จำนวนเตียงที่ต้องการขอ
                        </Typography>
                        <Typography
                          style={{
                            color: "#2F4A8A",
                            fontFamily: "Kanit",
                            fontSize: "1.2vw",
                          }}
                        >
                          {infos.count} เตียง
                        </Typography>
                      </Box>
                    </div>
                  ) : null}

                  
                  {/* <Typography
                    style={{
                      color: "#2F4A8A",
                      fontFamily: "Kanit",
                      fontSize: "1.2vw",
                    }}
                  >
                    {infos.help}
                  </Typography>
                  <Typography
                    style={{
                      color: "#2F4A8A",
                      fontFamily: "Kanit",
                      fontSize: "1.2vw",
                    }}
                  >
                    {infos.count}
                  </Typography> */}
                </>
              );
            })}
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
            ) : null} */}
          </AccordionDetails>
        </Accordion>
      </Grid>

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
