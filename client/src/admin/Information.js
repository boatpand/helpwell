import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Pie, PieChart } from "recharts";
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
  const [flag01, setFlag01] = useState(0);

  const [food, setFood] = useState([]);
  const [bed, setBed] = useState([]);
  const [med,setMed] = useState([]);
  const [home,setHome] = useState([]);
  const [hospital,setHospital] = useState([]);
  const [other,setOther] = useState([]);

  const [num_food, setNum_food] = useState(0);
  const [num_medicine, setNum_medicine] = useState(0);
  const [num_bed, setNum_bed] = useState(0);
  const [num_hospital, setNum_hospital] = useState(0);
  const [num_home, setNum_home] = useState(0);
  const [num_other, setNum_other] = useState(0);

  const [count, setCount] = useState(0);

  useEffect(async () => {
    // await axios
    //   .get(`http://localhost:4000/victimuser/`)
    //   .then((res) => {
    //     // console.log("res is ", res.data);
    //     setInfo_vic(res.data);
    //   })
    //   .catch((err) => {
    //     Promise.reject(err);
    //   });
    await axios
      .get(`http://localhost:4000/request/all-request-nocond`)
      .then((res) => {
        console.log("request is ", res.data);
        setRequest(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/food-request-no-status`)
      .then((res) => {
        // console.log("request is ", res.data);
        setFood(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/bed-request-no-status`)
      .then((res) => {
        // console.log("request is ", res.data);
        setBed(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
      await axios
      .get(`http://localhost:4000/request/medicine-request-no-status`)
      .then((res) => {
        // console.log("request is ", res.data);
        setMed(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
      await axios
      .get(`http://localhost:4000/request/home-request-no-status`)
      .then((res) => {
        // console.log("request is ", res.data);
        setHome(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
      await axios
      .get(`http://localhost:4000/request/hospital-request-no-status`)
      .then((res) => {
        console.log("request is ", res.data);
        setHospital(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
      await axios
      .get(`http://localhost:4000/request/other-request-no-status`)
      .then((res) => {
        console.log("request is ", res.data);
        setOther(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await setFlag(1);
  }, []);

  //  console.log(food.length)
  //  console.log(bed.length)

  // useEffect(async() => {
  //   await console.log("length: ", request.length);
  //   for (var i = 0; i < request.length; i++) {
  //     if (request[i].Food === true) {
  //       setNum_food(num_food + request[i].count_Food);
  //     }
  //     if (request[i].Medicine === true) {
  //       setNum_medicine(num_medicine + request[i].count_Medicine);
  //     }
  //     if (request[i].Bed === true) {
  //       setNum_bed(num_bed + request[i].count_Bed);
  //     }
  //     if (request[i].Hospital === true) {
  //       setNum_hospital(num_hospital + + request[i].count_Hospital);
  //     }
  //     if (request[i].Home === true) {
  //       setNum_home(num_home + request[i].count_Home);
  //     }
  //     if (request[i].Other!==""){
  //       setNum_other(num_other + request[i].count_Other)
  //     }
  //   }
  // }, [flag]);
  // useEffect(async () => {
  //   await console.log("length: ", request.length);
  //   for (var i = 0; i < request.length; i++) {
  //     console.log("i = ",i)
  //     if (request[i].Food === true) {
  //       await setNum_food(num_food + 1);
  //       await console.log("Food: ", num_food);
  //     }
  //     if (request[i].Medicine === true) {
  //       await setNum_medicine(num_medicine + 1);
  //       console.log("Med: ", num_medicine);
  //     }
  //     if (request[i].Bed === true) {
  //       await setNum_bed(num_bed + 1);
  //       console.log("Bed: ", num_bed);
  //     }
  //     if (request[i].Hospital === true) {
  //       await setNum_hospital(num_hospital + 1);
  //       console.log("Hospital: ", num_hospital);
  //     }
  //     if (request[i].Home === true) {
  //       await setNum_home(num_home + 1);
  //       console.log("Home: ", num_home);
  //     }
  //     if (request[i].Other !== "") {
  //       await setNum_other(num_other + 1);
  //       console.log("Other: ", num_other);
  //     }
  //   }
  //   await setFlag01(1);
  // }, [request]);

  // console.log("num_Food: ", num_food);
  // console.log("num_Bed: ", num_bed);
  // console.log("num_Med: ", num_medicine);
  // console.log("num_Home: ", num_home);
  // console.log("num_Hospital: ", num_hospital);
  // console.log("num_Other: ", num_other);

  // useEffect(async () => {
  //   await setNum_food(food.length);
  //   await setNum_bed(bed.length);
  //   await setCount(food.length + bed.length);
  // }, [flag]);

  // useEffect(async () => {
  //   await setCount(food.length + bed.length)
  //   await console.log(count)
  // }, []);

  // const handleEvent =  () => {
  //   // console.log("length: ", request.length);
  //   var count = 0;
  //  setNum_food(food.length)
  //  setNum_bed(bed.length)
  //  count = num_food + num_bed
  //  console.log(count)

  // };

  const data = [
    {
      name: "การขอความช่วยเหลือ",
      อาหาร: (food.length/request.length) * 100,
      เตียงนอน: bed.length,
      english: food.length + bed.length,
      social: request.length,
    },
  ];
  const data1 = [{
      "name": "Group A",
      "value": food.length
    },
    {
      "name": "Group B",
      "value": bed.length
    },
   
  ]

    // {
    //   "name": "Group A",
    //   "value": 2400
    // },
    // {
    //   "name": "Group B",
    //   "value": 4567
    // },
    // {
    //   "name": "Group C",
    //   "value": 1398
    // },
    // {
    //   "name": "Group D",
    //   "value": 9800
    // },
    // {
    //   "name": "Group E",
    //   "value": 3908
    // },
    // {
    //   "name": "Group F",
    //   "value": 4800
    // }
  
  // console.log(data.name)
    const renderLabel = (data1) => {
      console.log(data1.name)
      return data1.name;
  }
  const renderLineChart = (
    <div>
      <PieChart width={730} height={250}>
        <Pie
          data={data1}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          label={renderLabel}
        />
        {/* <Pie
          data={data1}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        /> */}
      </PieChart>
      <BarChart
        style={{ display: "block", margin: "20% auto" }}
        width={400}
        height={300}
        data={data}
      >
        <Bar dataKey="อาหาร" fill="#1abc9c" />
        <Bar dataKey="เตียงนอน" fill="#2ecc71" />
        <Bar dataKey="english" fill="#3498db" />
        <Bar dataKey="social" fill="#34495e" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </BarChart>
    </div>
  );

  return (
    <div>
      <Header_admin />
      {renderLineChart}
      {num_food}
      {num_medicine}
      {num_bed}
      {num_hospital}
      {num_home}
      {num_other}
      {/* {handleEvent()} */}
    </div>
  );
}
