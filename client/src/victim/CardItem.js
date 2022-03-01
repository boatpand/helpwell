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
  const [flag, setFlag] = useState(null);

  const [Request, setRequest] = useState([]);
  const [Request_Detail, setRequest_Detail] = useState([]);

  const [Helpcode_state, setHelpcode_state] = useState([]);
  const [Otherhelp_state, setOtherhelp_state] = useState([]);
  const [Option_state, setOption_state] = useState([]);
  const [RequestID_state, setRequestID_state] = useState([]);
  const [Helptopic, setHelptopic] = useState("");

  useEffect(() => {
    const FetchRequestDetail = async () => {
      let Helpdetail_list = [];
      let Otherhelp = [];
      await axios
        .get(`http://localhost:4000/request/request-detail-detail/${RequestID}`)
        .then((res) => {
          // setRequest_Detail(res.data);
          Helpdetail_list.push(res.data);
          console.log("res: ", res.data);
        })
        .catch((err) => {
          Promise.reject(err);
        });
      // Helpdetail_list.push(Request_Detail);
      // console.log("Helpdetail_list: ", Helpdetail_list);

      if (Other === "") {
        Otherhelp.push("ไม่มี");
      } else {
        Otherhelp.push(Other);
      }

      let helpcode = [];
      let helpcode_list = [];
      let option = [];
      let option_list = [];
      let request_id = [];
      let request_id_list = [];
      for (var i = 0; i < Helpdetail_list.length; i++) {
        for (var j = 0; j < Helpdetail_list[i].length; j++) {
          helpcode.push(Helpdetail_list[i][j].Helpcode);
          option.push(Helpdetail_list[i][j].Option);
          request_id.push(Helpdetail_list[i][j].RequestID);
        }
        helpcode_list.push(helpcode);
        option_list.push(option);
        request_id_list.push(request_id);
        helpcode = [];
        option = [];
        request_id = [];
      }
      console.log(helpcode_list);
      console.log(request_id_list);

      await setHelpcode_state(helpcode_list);
      await setOtherhelp_state(Otherhelp);
      await setOption_state(option_list);
      await setRequestID_state(request_id_list);
      await setFlag("1")

      //   const eventTable = () => {
      //     var topics = [];
      //     var t ="";
      //     console.log(Helpcode_state)
      //     for (var y = 0; y < Helpcode_state.length; y++) {
      //         if (Helpcode_state[y].indexOf("101") >-1) {
      //           t= t+"อาหาร"+" "
      //         }
      //         if (Helpcode_state[y].indexOf("102") >-1) {
      //           t= t+"ยา"+" "
      //         }
      //         if (Helpcode_state[y].indexOf("103") >-1) {
      //           t= t+"เตียง"+" "
      //         }
      //         if (Helpcode_state[y].indexOf("104") >-1) {
      //           t= t+"รถนำส่งโรงพยาบาล"+" "
      //         }
      //         if (Helpcode_state[y].indexOf("105") >-1) {
      //           t= t+"รถนำส่งภูมิลำเนา"+" "
      //         }
      //         if (Otherhelp_state[y]!=="ไม่มี") {
      //           t= t+this.state.Otherhelp_state[y]+" "
      //         }

      //       console.log(RequestID_state[y][0])
      //       var tmp = {
      //         help:t,
      //         // Victim_Mobile: this.state.helpRequest[y].Mobile,
      //         RequestID: RequestID_state[y][0],
      //         // Status: this.state.helpRequest[y].Status,
      //         // Status_Text: this.state.helpRequest[y].Status_Text,
      //         // date: this.state.helpRequest[y].date,
      //       }
      //       t=""
      //       topics.push(tmp);
      //     }
      //     console.log(topics);
      //     // topics.reverse()
      //     return topics.map((res,i)=>{
      //       return <Profile_accor obj={res} key={i} Mobile={Mobile}/>
      //     });
      // }
    }
    FetchRequestDetail();
  }, []);

  function eventTable() {
    var topics = [];
    var t = "";
    console.log("Event Table");
    console.log(Helpcode_state);
    for (var y = 0; y < Helpcode_state.length; y++) {
      if (Helpcode_state[y].indexOf("101") > -1) {
        t = t + "อาหาร" + " ";
      }
      if (Helpcode_state[y].indexOf("102") > -1) {
        t = t + "ยา" + " ";
      }
      if (Helpcode_state[y].indexOf("103") > -1) {
        t = t + "เตียง" + " ";
      }
      if (Helpcode_state[y].indexOf("104") > -1) {
        t = t + "รถนำส่งโรงพยาบาล" + " ";
      }
      if (Helpcode_state[y].indexOf("105") > -1) {
        t = t + "รถนำส่งภูมิลำเนา" + " ";
      }
      if (Otherhelp_state[y] !== "ไม่มี") {
        t = t + Otherhelp_state[y] + " ";
      }

      // console.log(RequestID_state[y][0])
      console.log(t);
      var tmp = {
        help: t,
        // Victim_Mobile: this.state.helpRequest[y].Mobile,
        RequestID: RequestID_state[y][0],
        // Status: this.state.helpRequest[y].Status,
        // Status_Text: this.state.helpRequest[y].Status_Text,
        // date: this.state.helpRequest[y].date,
      };
      t = "";
      topics.push(tmp); // topic= [{},{}]
    }
    console.log(topics);
    // topics.reverse()
    return topics.map((res, i) => {
      return <Profile_accor {...res} />;
    });
  }

  return (
    <ThemeProvider theme={theme_vic}>
      {flag === "1" ? eventTable() : null}
      {/* {Extract_Detail()} */}
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
