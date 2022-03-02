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
    RequestID,
    Other,
    Status,
    Status_Text,
    date,
  } = props;
  // console.log(RequestID);
  const [flag, setFlag] = useState(null);

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
          Helpdetail_list.push(res.data);
          console.log("res: ", res.data);
        })
        .catch((err) => {
          Promise.reject(err);
        });

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
      return <Profile_accor {...res} />;
    });
  }

  return (
    <ThemeProvider theme={theme_vic}>
      {flag === "1" ? eventTable() : null}
    </ThemeProvider>
  );
}
