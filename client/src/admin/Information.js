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
  const [num_food, setNum_food] = useState(0);
  console.log(Mobile);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/victimuser/`)
      .then((res) => {
        // console.log("res is ", res.data);
        setInfo_vic(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    axios
      .get(`http://localhost:4000/request/all-request`)
      .then((res) => {
        console.log("request is ", res.data);
        setRequest(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    console.log("after ax ", request);
  }, []);

  const handleEvent = () => {
    console.log("length: ", request.length);
    for (var i = 0; i < request.length; i++) {
      if (request[i].Food === true) {
        // console.log("if : ", i);
        console.log("yeah");
        // setNum_food(num_food + 1);
      }
    }

   
  };

  console.log(request);

  if (request.Food === true) {
      setNum_food(num_food + 1)
  }
  console.log(num_food);

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
      {handleEvent()}
    </div>
  );
}
