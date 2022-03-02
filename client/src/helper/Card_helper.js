import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
// import theme_vic from "./theme_vic";
import Helper_accor from "./Helper_accor";
import {
  Card,
  Grid,
  CardActions,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Button,
} from "@material-ui/core";

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
  textLink: {
    color: "inherit",
    textDecoration: "inherit",
  },

  spancer: {
    flexGrow: 1,
  },
}));

export default function Card_helper(props) {
  const classes = useStyles();
  const {
    Helper_Mobile,
    RequestID,
    Status,
    Date,
  } = props;

  const [request_detail, setRequest_detail] = useState([]);
  const [info, setInfo] = useState([]);
  const [flag, setFlag] = useState(0);
  const [other, setOther] = useState("")
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
        .get(`http://localhost:4000/request/request-detail/${RequestID}`)
        .then((res) => {
          setOther(res.data.Other)
        })
        .catch((err) => {
          Promise.reject(err);
        });
      await axios
        .get(`http://localhost:4000/request/request-detail-detail/${RequestID}`)
        .then((res) => {
          Helpdetail_list.push(res.data);
          console.log("res: ", res.data);
        })
        .catch((err) => {
          Promise.reject(err);
        });

      if (other === "") {
        Otherhelp.push("ไม่มี");
      } else {
        Otherhelp.push(other);
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
        RequestID: RequestID_state[y][0],
      };
      t = "";
      topics.push(tmp); 
    }
    console.log(topics);
    return topics.map((res) => {
      return <Helper_accor {...res} />;
    });
  }

  return (
    <>
      {flag === "1" ? eventTable() : null}
    </>
  );
}

  // useEffect(() => {
  //   async function fetchRequest() {
  //     await axios
  //       .get(`http://localhost:4000/request/request-detail/${RequestID}`)
  //       .then((res) => {
  //         console.log("res_request is ", res.data);
  //          setRequest_detail(res.data);
  //          setFlag(1);
  //       })
  //       .catch((err) => {
  //         Promise.reject(err);
  //       });

  //     // console.log("in fetch");
  //     // console.log("MOBILE : ", request_detail.Mobile);
  //     // console.log("MOBILE is  : ", request_detail);
  //     // let Mobile = request_detail.Mobile;
  //     // console.log("MOBILE : ", Mobile);
  //   }

  //   // function fetchInfo(Mobile) {
  //   //   axios
  //   //     .get(`http://localhost:4000/victimuser/victim-profile/${Mobile}`)
  //   //     .then((res) => {
  //   //       console.log("res is ", res.data);
  //   //       setInfo(res.data);
  //   //     })
  //   //     .catch((err) => {
  //   //       Promise.reject(err);
  //   //     });
  //   // }

  //   fetchRequest();
  //   // let Mobile_vic = request_detail.Mobile;
  //   // console.log(Mobile_vic);
  //   // fetchInfo(Mobile_vic);
  // }, []);

  // useEffect(() => {
  //   async function fetchInfo() {
  //     if(flag===1){
  //       let Mobile = request_detail.Mobile;
  //       console.log(Mobile)
  //       await axios
  //       .get(`http://localhost:4000/victimuser/victim-profile/${Mobile}`)
  //       .then((res) => {
  //         // console.log("res is ", res.data);
  //         setInfo(res.data);
  //       })
  //       .catch((err) => {
  //         Promise.reject(err);
  //       });
  //     }
  //   }
  //   fetchInfo();
  // }, [flag]);



  // return (
  //   <Grid item>
  //     <Card className={classes.root}>
  //       <CardContent>
  //         {/* Status */}
  //         {Status === "รอการช่วยเหลือ" ? (
  //           <Typography
  //             color="text.primary"
  //             className={classes.status}
  //             style={{ color: "#ffc107", fontFamily: "Kanit" }}
  //           >
  //             {Status}
  //           </Typography>
  //         ) : null}
  //         {Status === "กำลังช่วยเหลือ" ? (
  //           <Typography
  //             color="text.primary"
  //             className={classes.status}
  //             style={{ color: "#6c757d", fontFamily: "Kanit" }}
  //           >
  //             {Status}
  //           </Typography>
  //         ) : null}
  //         {Status === "ช่วยเหลือสำเร็จ" ? (
  //           <Typography
  //             color="text.primary"
  //             className={classes.status}
  //             style={{ color: "#198754", fontFamily: "Kanit" }}
  //           >
  //             {Status}
  //           </Typography>
  //         ) : null}
  //         <div style={{ width: "100%" }}>
  //           <Box
  //             sx={{
  //               display: "flex",
  //               m: 2,
  //             }}
  //           >
  //             <Typography
  //               style={{ color: "#90D1CB", fontFamily: "Kanit" }}
  //             >
  //               ความช่วยเหลือที่ต้องการ :&nbsp;&nbsp;
  //             </Typography>
  //             {request_detail.Food ? (
  //               <Typography style={{ color: "#90D1CB", fontFamily: "Kanit" }}>
  //                 &nbsp;อาหาร&nbsp;
  //               </Typography>
  //             ) : null}
  //             {request_detail.Bed ? (
  //               <Typography style={{ color: "#90D1CB", fontFamily: "Kanit" }}>
  //                 &nbsp;หาเตียง&nbsp;
  //               </Typography>
  //             ) : null}
  //             {request_detail.Medicine ? (
  //               <Typography style={{ color: "#90D1CB", fontFamily: "Kanit" }}>
  //                 &nbsp;ยา&nbsp;
  //               </Typography>
  //             ) : null}
  //             {request_detail.Hospital ? (
  //               <Typography style={{ color: "#90D1CB", fontFamily: "Kanit" }}>
  //                 &nbsp;นำส่งโรงพยาบาล&nbsp;
  //               </Typography>
  //             ) : null}
  //             {request_detail.Home ? (
  //               <Typography style={{ color: "#90D1CB", fontFamily: "Kanit" }}>
  //                 &nbsp;นำส่งภูมิลำเนา&nbsp;
  //               </Typography>
  //             ) : null}
  //           </Box>
  //         </div>
  //         <div style={{ width: "100%" }}>
  //           <Box
  //             sx={{
  //               display: "flex",
  //               m: 2,
  //             }}
  //           >
  //             <Typography
  //               sx={{ flexShrink: 0 }}
  //               style={{ color: "#707070", fontFamily: "Kanit" }}
  //             >
  //               รายละเอียด : &nbsp;
  //             </Typography>
  //             <div className={classes.Spacer} />
  //             <Typography style={{ color: "#707070", fontFamily: "Kanit" }}>
  //               {request_detail.Option}
  //             </Typography>
  //           </Box>
  //         </div>
  //         <div style={{ width: "100%" }}>
  //           <Box
  //             sx={{
  //               display: "flex",
  //               m: 2,
  //             }}
  //           >
  //             <Typography
  //               sx={{ flexShrink: 0 }}
  //               style={{ color: "#707070", fontFamily: "Kanit" }}
  //             >
  //               ที่อยู่ : &nbsp;
  //             </Typography>
  //             <div className={classes.Spacer} />
  //             <Typography style={{ color: "#707070", fontFamily: "Kanit" }}>
  //               {info.House_No}&nbsp;&nbsp;ซอย&nbsp;
  //               {info.Soi}&nbsp;&nbsp;ถนน&nbsp;
  //               {info.Road}&nbsp;&nbsp;แขวง&nbsp;{info.Subdistrict}
  //               &nbsp;&nbsp;เขต&nbsp;
  //               {info.District}&nbsp;&nbsp;
  //               {info.Province}&nbsp;&nbsp;
  //               {info.ZIP_Code}
  //             </Typography>
  //           </Box>
  //         </div>
  //         <div style={{ width: "100%" }}>
  //           <Box
  //             sx={{
  //               display: "flex",
  //               m: 2,
  //             }}
  //           >
  //             <Typography
  //               sx={{ flexShrink: 0 }}
  //               style={{ color: "#707070", fontFamily: "Kanit" }}
  //             >
  //               ช่องทางติดต่อ : &nbsp;
  //             </Typography>
  //             <div className={classes.Spacer} />
  //             <Typography style={{ color: "#707070", fontFamily: "Kanit" }}>
  //               {request_detail.Mobile}
  //             </Typography>
  //           </Box>
  //         </div>
          /* {Food ? (
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
                  style={{ color: "#2F4A8A", fontFamily: "Kanit" }}
                >
                  จำนวนอาหารที่ต้องการ
                </Typography>

                <Typography style={{ color: "#2F4A8A", fontFamily: "Kanit" }}>
                  {count_Food}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
                </Typography>
              </Box>
            </div>
          ) : null}
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
                  style={{ color: "#2F4A8A", fontFamily: "Kanit" }}
                >
                  จำนวนยาที่ต้องการ
                </Typography>
                <div className={classes.Spacer} />
                <Typography style={{ color: "#2F4A8A", fontFamily: "Kanit" }}>
                  {count_Medicine}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
                </Typography>
              </Box>
            </div>
          ) : null}
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
                  style={{ color: "#2F4A8A", fontFamily: "Kanit" }}
                >
                  จำนวนผู้ป่วยที่หาเตียง
                </Typography>
                <div className={classes.Spacer} />
                <Typography style={{ color: "#2F4A8A", fontFamily: "Kanit" }}>
                  {count_Bed}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
                </Typography>
              </Box>
            </div>
          ) : null}
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
                  style={{ color: "#2F4A8A", fontFamily: "Kanit" }}
                >
                  จำนวนผู้ป่วยที่นำส่งโรงพยาบาล
                </Typography>
                <div className={classes.Spacer} />
                <Typography style={{ color: "#2F4A8A", fontFamily: "Kanit" }}>
                  {count_Hospital}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
                </Typography>
              </Box>
            </div>
          ) : null}
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
                  style={{ color: "#2F4A8A", fontFamily: "Kanit" }}
                >
                  จำนวนผู้ป่วยที่นำส่งภูมิลำเนา
                </Typography>
                <div className={classes.Spacer} />
                <Typography style={{ color: "#2F4A8A", fontFamily: "Kanit" }}>
                  {count_Home}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
                </Typography>
              </Box>
            </div>
          ) : null}
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
                  style={{ color: "#2F4A8A", fontFamily: "Kanit" }}
                >
                  จำนวนผู้ป่วยที่นำส่งภูมิลำเนา
                </Typography>
                <div className={classes.Spacer} />
                <Typography style={{ color: "#2F4A8A", fontFamily: "Kanit" }}>
                  {count_Home}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
                </Typography>
              </Box>
            </div>
          ) : null}
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
                  style={{ color: "#2F4A8A", fontFamily: "Kanit" }}
                >
                  {Other}
                </Typography>
                <div className={classes.Spacer} />
                <Typography style={{ color: "#2F4A8A", fontFamily: "Kanit" }}>
                  {count_Other}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ชุด
                </Typography>
              </Box>
            </div>
          ) : null}
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
                style={{ color: "#2F4A8A", fontFamily: "Kanit" }}
              >
                รายละเอียด
              </Typography>
              <div className={classes.Spacer} />
              <Typography style={{ color: "#2F4A8A", fontFamily: "Kanit" }}>
                {Option}
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
                sx={{ flexShrink: 0 }}
                style={{ color: "#2F4A8A", fontFamily: "Kanit" }}
              >
                ความคืบหน้า
              </Typography>
              <div className={classes.Spacer} />
              <Typography style={{ color: "#2F4A8A", fontFamily: "Kanit" }}>
                {Status_Text}
              </Typography>
            </Box>
          </div> 
        </CardContent>
      </Card>
    </Grid>
  );
            */
