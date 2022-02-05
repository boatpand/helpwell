import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { BarChart, XAxis, YAxis, Bar, Tooltip } from "recharts";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";

import Header_admin from "./Header_admin";

const useStyles = makeStyles((theme) => ({}));

export default function Information(props) {
  const classes = useStyles();
  const GetStateParam = useLocation().state;
  const { Mobile } = GetStateParam;
  const [info_vic, setInfo_vic] = useState([]);
  const [request, setRequest] = useState([]);
  const [flag, setFlag] = useState(0);

  const [num_food, setNum_food] = useState(0);
  const [num_medicine, setNum_medicine] = useState(0);
  const [num_bed, setNum_bed] = useState(0);
  const [num_hospital, setNum_hospital] = useState(0);
  const [num_home, setNum_home] = useState(0);
  const [num_other, setNum_other] = useState(0);
  console.log(Mobile);

  useEffect(async() => {
    await axios
      .get(`http://localhost:4000/victimuser/`)
      .then((res) => {
        // console.log("res is ", res.data);
        setInfo_vic(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/all-request`)
      .then((res) => {
        console.log("request is ", res.data);
        setRequest(res.data);
        setFlag(1);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    // console.log("after ax ", request);
  }, []);

  console.log(request);

  useEffect(async() => {
    await console.log("length: ", request.length);
    for (var i = 0; i < request.length; i++) {
      if (request[i].Food === true) {
        setNum_food(num_food + request[i].count_Food);
      }
      if (request[i].Medicine === true) {
        setNum_medicine(num_medicine + request[i].count_Medicine);
      }
      if (request[i].Bed === true) {
        setNum_bed(num_bed + request[i].count_Bed);
      }
      if (request[i].Hospital === true) {
        setNum_hospital(num_hospital + + request[i].count_Hospital);
      }
      if (request[i].Home === true) {
        setNum_home(num_home + request[i].count_Home);
      }
      if (request[i].Other!==""){
        setNum_other(num_other + request[i].count_Other)
      }
    }
  }, [flag]);
  // const handleEvent = () => {
  //   console.log("length: ", request.length);
  //   for (var i = 0; i < request.length; i++) {
  //     if (request[i].Food === true) {
  //       // console.log("if : ", i);
  //       console.log("yeah");
  //       setNum_food(num_food + 1);
  //     }
  //   }
  // };

  // console.log(request);

  // if (request.Food === true) {
  //     setNum_food(num_food + 1)
  // }
  // console.log(num_food);

  //   const data = [
  //     { name: "สมพง", math: 68, physics: 80, english: 99, social: 62 },
  //     { name: "สุริน", math: 54, physics: 57, english: 89, social: 76 },
  //     { name: "นรง", math: 86, physics: 69, english: 71, social: 73 },
  //     { name: "สมพร", math: 55, physics: 50, english: 73, social: 85 }
  //   ];

  //   const renderLineChart = (
  //     <BarChart
  //       style={{ display: "block", margin: "20% auto" }}
  //       width={1000}
  //       height={400}
  //       data={info_vic}
  //     >
  //       <Bar dataKey="math" fill="#1abc9c" />
  //       <Bar dataKey="physics" fill="#2ecc71" />
  //       <Bar dataKey="english" fill="#3498db" />
  //       <Bar dataKey="social" fill="#34495e" />
  //       <XAxis dataKey="name" />
  //       <YAxis />
  //       <Tooltip />
  //     </BarChart>
  //   );

  return (
    <div>
      {/* <Header_admin /> */}
      {/* {renderLineChart} */}
      {num_food}
      {num_medicine}
      {num_bed}
      {num_hospital}
      {num_home}
      {num_other}
    </div>
  );
}
