import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Typography, TextField, Box, Button, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_vic from "./theme_vic";
import Header_Vic from "./Header_vic";
import { default as uuid } from "node-uuid";

const useStyles = makeStyles((theme) => ({
  GridSpacer: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: 500,
    justifyContent: "center",
  },
  Spacer: {
    marginLeft: theme.spacing(5),
  },
  Spacer1: {
    padding: theme.spacing(2),
  },
  Spancer: {
    marginLeft: theme.spacing(125),
  },
  paper: {
    alignItems: "center",
    display: "block",
    margin: "0px auto",
    padding: theme.spacing(2, 8),
    marginLeft: theme.spacing(9),
    fontFamily: "Kanit",
  },
}));

export default function Summary(props) {
  const classes = useStyles();
  const history = useHistory();
  const GetStateParam = useLocation().state.data;
  const {
    Mobile,
    count_Food,
    count_Medicine,
    count_Bed,
    count_Hospital,
    count_Home,
    count_Other,
    name_Other,
  } = GetStateParam;

  console.log(Mobile);

  const [request, setRequest] = useState([]);

  const [requestID, setRequestID] = useState(uuid.v4());

  const [name_Food, setname_Food] = useState(count_Food !== 0 ? true : false);
  const [option_Food, setoption_Food] = useState("");
  const [status_Food, setstatus_Food] = useState("รอการช่วยเหลือ");

  const [name_Medicine, setname_Medicine] = useState(
    count_Medicine !== 0 ? true : false
  );
  const [option_Medicine, setoption_Medicine] = useState("");
  const [status_Medicine, setstatus_Medicine] = useState("รอการช่วยเหลือ");

  const [name_Bed, setname_Bed] = useState(count_Bed !== 0 ? true : false);
  const [option_Bed, setoption_Bed] = useState("");
  const [status_Bed, setstatus_Bed] = useState("รอการช่วยเหลือ");

  const [name_Hospital, setname_Hospital] = useState(
    count_Hospital !== 0 ? true : false
  );
  const [option_Hospital, setoption_Hospital] = useState("");
  const [status_Hospital, setstatus_Hospital] = useState("รอการช่วยเหลือ");

  const [name_Home, setname_Home] = useState(count_Home !== 0 ? true : false);
  const [option_Home, setoption_Home] = useState("");
  const [status_Home, setstatus_Home] = useState("รอการช่วยเหลือ");

  const [option_Other, setoption_Other] = useState(""); // หมายเหตุอื่นๆ
  const [status_Other, setstatus_Other] = useState("รอการช่วยเหลือ");

  const [status_Request, setstatus_Request] = useState("รอการช่วยเหลือ");
  const [Status_Text, set_Status_Text] = useState(""); //ความคืบหน้า

  const handleFood = (event) => {
    setoption_Food(event.target.value);
  };
  const handleMedicine = (event) => {
    setoption_Medicine(event.target.value);
  };
  const handleBed = (event) => {
    setoption_Bed(event.target.value);
  };
  const handleHospital = (event) => {
    setoption_Hospital(event.target.value);
  };
  const handleHome = (event) => {
    setoption_Home(event.target.value);
  };
  const handleOther = (event) => {
    setoption_Other(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      Mobile: Mobile,
      RequestID: requestID,
      Other: name_Other,
      Status: status_Request,
      Status_Text: Status_Text,
    };
    await axios
      .post(`http://localhost:4000/request/insert`, data)
      .then((res) => {
        console.log("post id : ", res.data);
        history.push({
          pathname: "/victims",
          state: { Mobile: Mobile },
        });
      })
      .catch((err) => {
        Promise.reject(err);
      });

    //  Food
    if (name_Food) {
      let data_Item = {
        RequestID: requestID,
        Helpcode: "101",
        Count: count_Food,
        Option: option_Food,
        Status: status_Food,
      };
      await axios
        .post(`http://localhost:4000/request/insert-detailed`, data_Item)
        .then((res) => {
          console.log("post item : ", res.data);
        })
        .catch((err) => {
          Promise.reject(err);
        });
    }

    //  Medicine
    if (name_Medicine) {
      let data_Item = {
        RequestID: requestID,
        Helpcode: "102",
        Count: count_Medicine,
        Option: option_Medicine,
        Status: status_Medicine,
      };
      await axios
        .post(`http://localhost:4000/request/insert-detailed`, data_Item)
        .then((res) => {
          console.log("post item : ", res.data);
        })
        .catch((err) => {
          Promise.reject(err);
        });
    }

    //  Bed
    if (name_Bed) {
      let data_Item = {
        RequestID: requestID,
        Helpcode: "103",
        Count: count_Bed,
        Option: option_Bed,
        Status: status_Bed,
      };
      await axios
        .post(`http://localhost:4000/request/insert-detailed`, data_Item)
        .then((res) => {
          console.log("post item : ", res.data);
        })
        .catch((err) => {
          Promise.reject(err);
        });
    }

    //  Hospital
    if (name_Hospital) {
      let data_Item = {
        RequestID: requestID,
        Helpcode: "104",
        Count: count_Hospital,
        Option: option_Hospital,
        Status: status_Hospital,
      };
      await axios
        .post(`http://localhost:4000/request/insert-detailed`, data_Item)
        .then((res) => {
          console.log("post item : ", res.data);
        })
        .catch((err) => {
          Promise.reject(err);
        });
    }

    //  Home
    if (name_Home) {
      let data_Item = {
        RequestID: requestID,
        Helpcode: "105",
        Count: count_Home,
        Option: option_Home,
        Status: status_Home,
      };
      await axios
        .post(`http://localhost:4000/request/insert-detailed`, data_Item)
        .then((res) => {
          console.log("post item : ", res.data);
        })
        .catch((err) => {
          Promise.reject(err);
        });
    }

    //  Other
    if (count_Other != 0) {
      let data_Item = {
        RequestID: requestID,
        Helpcode: name_Other,
        Count: count_Other,
        Option: option_Other,
        Status: status_Other,
      };
      await axios
        .post(`http://localhost:4000/request/insert-detailed`, data_Item)
        .then((res) => {
          console.log("post item : ", res.data);
        })
        .catch((err) => {
          Promise.reject(err);
        });
    }
  };

  return (
    <ThemeProvider theme={theme_vic}>
      <Header_Vic />

      <div className={classes.Spacer1} />
      <Grid container direction="row" justifyContent="space-around">
        <Grid item xs={2} alignItems="center"></Grid>
        <Grid item xs={8} alignItems="center">
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                p: 1,
                m: 1,
              }}
            >
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.7vw",
                }}
              >
                ยืนยันการขอความช่วยเหลือ
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 2,
              }}
            >
              <Typography
                fontFamily="Kanit"
                variant="body1"
                color="text.secondary"
                style={{
                  fontFamily: "Kanit",
                  fontSize: "1.1vw",
                }}
              >
                {/* ที่อยู่สำหรับการช่วยเหลือ :&nbsp;&nbsp;&nbsp;
                {info.House_No}&nbsp;&nbsp;ซอย&nbsp;
                {info.Soi}&nbsp;&nbsp;ถนน&nbsp;
                {info.Road}&nbsp;&nbsp;แขวง&nbsp;{info.Subdistrict}
                &nbsp;&nbsp;เขต&nbsp;
                {info.District}&nbsp;&nbsp;
                {info.Province}&nbsp;&nbsp;
                {info.ZIP_Code} */}
              </Typography>
            </Box>
          </div>

          {/* Food */}
          {name_Food ? (
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
                  จำนวนอาหารที่ต้องการ
                </Typography>

                <Typography
                  style={{
                    color: "#2F4A8A",
                    fontFamily: "Kanit",
                    fontSize: "1.3vw",
                  }}
                >
                  {count_Food}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
                </Typography>
              </Box>
              <TextField
                style={{ width: "50%" }}
                fontFamily="Kanit"
                multiline
                rows={2}
                autoFocus
                margin="dense"
                id="name"
                label="หมายเหตุด้านอาหาร"
                type="text"
                fullWidth
                variant="outlined"
                value={option_Food}
                onChange={handleFood}
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              />
            </div>
          ) : null}

          {/* Medicine */}
          {name_Medicine ? (
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
                  จำนวนยาที่ต้องการ
                </Typography>

                <Typography
                  style={{
                    color: "#2F4A8A",
                    fontFamily: "Kanit",
                    fontSize: "1.3vw",
                  }}
                >
                  {count_Medicine}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
                </Typography>
              </Box>
              <TextField
                style={{ width: "50%" }}
                fontFamily="Kanit"
                multiline
                rows={2}
                autoFocus
                margin="dense"
                id="name"
                label="หมายเหตุด้านยา"
                type="text"
                fullWidth
                variant="outlined"
                value={option_Medicine}
                onChange={handleMedicine}
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              />
            </div>
          ) : null}

          {/* Bed */}
          {name_Bed ? (
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
                  จำนวนเตียงที่ต้องการขอ
                </Typography>

                <Typography
                  style={{
                    color: "#2F4A8A",
                    fontFamily: "Kanit",
                    fontSize: "1.3vw",
                  }}
                >
                  {count_Bed}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
                </Typography>
              </Box>
              <TextField
                style={{ width: "50%" }}
                fontFamily="Kanit"
                multiline
                rows={2}
                autoFocus
                margin="dense"
                id="name"
                label="หมายเหตุด้านผู้ป่วยที่ขอเตียง"
                type="text"
                fullWidth
                variant="outlined"
                value={option_Bed}
                onChange={handleBed}
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              />
            </div>
          ) : null}

          {/* Hospital */}
          {name_Hospital ? (
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
                  จำนวนผู่ป่วยที่ต้องการรถนำส่งโรงพยาบาล
                </Typography>

                <Typography
                  style={{
                    color: "#2F4A8A",
                    fontFamily: "Kanit",
                    fontSize: "1.3vw",
                  }}
                >
                  {count_Hospital}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
                </Typography>
              </Box>
              <TextField
                style={{ width: "50%" }}
                fontFamily="Kanit"
                multiline
                rows={2}
                autoFocus
                margin="dense"
                id="name"
                label="หมายเหตุด้านผู้ป่วยที่ต้องการรถนำส่งโรงพยาบาล"
                type="text"
                fullWidth
                variant="outlined"
                value={option_Hospital}
                onChange={handleHospital}
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              />
            </div>
          ) : null}

          {/* Home */}
          {name_Home ? (
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
                  จำนวนผู่ป่วยที่ต้องการรถนำส่งภูมิลำเนา
                </Typography>

                <Typography
                  style={{
                    color: "#2F4A8A",
                    fontFamily: "Kanit",
                    fontSize: "1.3vw",
                  }}
                >
                  {count_Home}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
                </Typography>
              </Box>
              <TextField
                style={{ width: "50%" }}
                fontFamily="Kanit"
                multiline
                rows={2}
                autoFocus
                margin="dense"
                id="name"
                label="หมายเหตุด้านผู้ป่วยที่ต้องการรถนำส่งภูมิลำเนา"
                type="text"
                fullWidth
                variant="outlined"
                value={option_Home}
                onChange={handleHome}
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              />
            </div>
          ) : null}

          {/* Other */}
          {count_Other != 0 ? (
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
                  {name_Other}
                </Typography>

                <Typography
                  style={{
                    color: "#2F4A8A",
                    fontFamily: "Kanit",
                    fontSize: "1.3vw",
                  }}
                >
                  {count_Other}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ชุด
                </Typography>
              </Box>
              <TextField
                style={{ width: "50%" }}
                fontFamily="Kanit"
                multiline
                rows={2}
                autoFocus
                margin="dense"
                id="name"
                label="หมายเหตุ"
                type="text"
                fullWidth
                variant="outlined"
                value={option_Other}
                onChange={handleOther}
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.3vw",
                }}
              />
            </div>
          ) : null}

          <div className={classes.Spacer1} />
          {/* Submit button*/}
          {name_Food ||
          name_Medicine ||
          name_Bed ||
          name_Hospital ||
          name_Home ||
          count_Other != 0 ? (
            <div>
              <Button
                style={{ width: "100%" }}
                variant="contained"
                size="large"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          ) : null}

          <div className={classes.Spacer1} />
        </Grid>
        <Grid item xs={2} alignItems="center"></Grid>
      </Grid>
    </ThemeProvider>
  );
}
