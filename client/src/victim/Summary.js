import React, { useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Typography, TextField, Box, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_vic from "./theme_vic";

import { insertCount, insertName } from "./Api_vic";
import Header_Vic from "./Header_vic";

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
    value_Other,
  } = GetStateParam;

  const [name_Food, setname_Food] = useState(count_Food !== 0 ? true : false);
  const [name_Medicine, setname_Medicine] = useState(
    count_Medicine !== 0 ? true : false
  );
  const [name_Bed, setname_Bed] = useState(count_Bed !== 0 ? true : false);
  const [name_Hospital, setname_Hospital] = useState(
    count_Hospital !== 0 ? true : false
  );
  const [name_Home, setname_Home] = useState(count_Home !== 0 ? true : false);
  const [value_Option, setvalue_Option] = useState("");

  const [Status, set_Status] = useState("รอการช่วยเหลือ");
  const [Status_Text, set_Status_Text] = useState("");

  const handleOption = (event) => {
    setvalue_Option(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = {
      Mobile: Mobile,
      Food: name_Food,
      count_Food: count_Food,
      Medicine: name_Medicine,
      count_Medicine: count_Medicine,
      Bed: name_Bed,
      count_Bed: count_Bed,
      Hospital: name_Hospital,
      count_Hospital: count_Hospital,
      Home: name_Home,
      count_Home: count_Home,
      Other: value_Other,
      count_Other: count_Other,
      Option: value_Option,
      Status: Status,
      Status_Text: Status_Text,
    };

    // insertCount(data_count).then((response) => {
    //   console.log("insertCount : ", response);
    // });
    // console.log("before insert");
    // console.log(data_name);
    // insertName(data_name).then((response) => {
    //   console.log("insertName : ", response);
    //   history.push(`/victims`);
    // });
    // await axios
    //   .post("http://localhost:4000/request/insert-count", data_count)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     Promise.reject(err);
    //   });
    
    await axios
      .post("http://localhost:4000/request/insert", data)
      .then((res) => {
        console.log(res.data);
        history.push(`/victims`);
      })
      .catch((err) => {
        Promise.reject(err);
      });
  };

  return (
    <ThemeProvider theme={theme_vic}>
      <Header_Vic />
      <div className={classes.Spacer1} />

      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            p: 1,
            m: 1,
          }}
        >
          <Typography fontFamily="Kanit" variant="h5" color="text.primary">
            ยืนยันการขอความช่วยเหลือ
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-around",
            pl: 15,
            m: 3,
          }}
        >
          <Typography fontFamily="Kanit" variant="body1" color="text.secondary">
            ที่อยู่สำหรับการช่วยเหลือ :
          </Typography>
        </Box>
      </div>

      <form>
        {name_Food ? (
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                pl: 5,
                m: 3,
              }}
            >
              <Typography
                fontFamily="Kanit"
                variant="h6"
                color="text.primary"
                sx={{ flexShrink: 0 }}
              >
                จำนวนอาหารที่ต้องการ
              </Typography>
              <div className={classes.Spacer} />
              <Typography fontFamily="Kanit" variant="h6" color="text.primary">
                {count_Food}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
              </Typography>
            </Box>
          </div>
        ) : null}

        {name_Medicine ? (
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                pl: 5,
                m: 3,
                pb: 2,
              }}
            >
              <Typography
                fontFamily="Kanit"
                variant="h6"
                color="text.primary"
                sx={{ flexShrink: 0 }}
              >
                จำนวนยาที่ต้องการ
              </Typography>
              <div className={classes.Spacer} />
              <Typography fontFamily="Kanit" variant="h6" color="text.primary">
                {count_Medicine}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
              </Typography>
            </Box>
          </div>
        ) : null}

        {name_Bed ? (
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                pl: 5,
                m: 3,
                pb: 2,
              }}
            >
              <Typography
                fontFamily="Kanit"
                variant="h6"
                color="text.primary"
                sx={{ flexShrink: 0 }}
              >
                จำนวนผู้ป่วยที่หาเตียง
              </Typography>
              <div className={classes.Spacer} />
              <Typography fontFamily="Kanit" variant="h6" color="text.primary">
                {count_Bed}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
              </Typography>
            </Box>
          </div>
        ) : null}

        {name_Hospital ? (
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                pl: 5,
                m: 3,
                pb: 2,
              }}
            >
              <Typography fontFamily="Kanit" variant="h6" color="text.primary">
                จำนวนผู้ป่วยที่นำส่งโรงพยาบาล
              </Typography>
              <div className={classes.Spacer} />
              <Typography fontFamily="Kanit" variant="h6" color="text.primary">
                {count_Hospital}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
              </Typography>
            </Box>
          </div>
        ) : null}

        {name_Home ? (
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                pl: 5,
                m: 3,
                pb: 2,
              }}
            >
              <Typography fontFamily="Kanit" variant="h6" color="text.primary">
                จำนวนผู้ป่วยที่นำส่งภูมิลำเนา
              </Typography>
              <div className={classes.Spacer} />
              <Typography fontFamily="Kanit" variant="h6" color="text.primary">
                {count_Home}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
              </Typography>
            </Box>
          </div>
        ) : null}

        {count_Other != 0 ? (
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                pl: 5,
                m: 3,
                pb: 2,
              }}
            >
              <Typography fontFamily="Kanit" variant="h6" color="text.primary">
                {value_Other}
              </Typography>
              <div className={classes.Spacer} />
              <Typography fontFamily="Kanit" variant="h6" color="text.primary">
                {count_Other}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ชุด
              </Typography>
            </Box>
          </div>
        ) : null}

        {/* หมายเหตุ */}
        {name_Food ||
        name_Medicine ||
        name_Bed ||
        name_Hospital ||
        name_Home ||
        count_Other !== 0 ? (
          <div style={{ width: "100%" }}>
            <div className={classes.paper}>
              <TextField
                style={{ width: "80%" }}
                fontFamily="Kanit"
                multiline
                rows={4}
                autoFocus
                margin="dense"
                id="name"
                label="หมายเหตุ"
                type="text"
                fullWidth
                variant="outlined"
                value={value_Option}
                onChange={handleOption}
              />
            </div>
          </div>
        ) : null}

        {/* submit button */}
        {name_Food ||
        name_Medicine ||
        name_Bed ||
        name_Hospital ||
        name_Home ||
        count_Other !== 0 ? (
          <div className={classes.paper}>
            <Button
              style={{ width: "10%" }}
              variant="contained"
              size="small"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        ) : null}
      </form>
    </ThemeProvider>
  );
}
