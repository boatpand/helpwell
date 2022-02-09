import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";

import Header_admin from "./Header_admin";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export default function Info(props) {
  const classes = useStyles();

  const GetStateParam = useLocation().state;
  const { Mobile } = GetStateParam;

  const [request, setRequest] = useState([]);
  const [food, setFood] = useState([]);
  const [bed, setBed] = useState([]);
  const [med, setMed] = useState([]);
  const [home, setHome] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [other, setOther] = useState([]);

  const [wait, setWait] = useState([]);
  const [help, setHelp] = useState([]);
  const [success, setSuccess] = useState([]);

  useEffect(async () => {
    await axios
      .get(`http://localhost:4000/request/all-request-no-status`)
      .then((res) => {
        // console.log("request is ", res.data);
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
        // console.log("request is ", res.data);
        // setHospital(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/other-request-no-status`)
      .then((res) => {
        // console.log("request is ", res.data);
        setOther(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/all-request`)
      .then((res) => {
        // console.log("request is ", res.data);
        setWait(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/all-request/help`)
      .then((res) => {
        // console.log("request is ", res.data);
        setHelp(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/all-request/success`)
      .then((res) => {
        // console.log("request is ", res.data);
        setSuccess(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    // await setFlag(1);
  }, []);

  const data_type = [
    {
      name: "การขอความช่วยเหลือแต่ละประเภท (%)",
      อาหาร: (food.length / request.length) * 100,
      หาเตียง: (bed.length / request.length) * 100,
      ยา: (med.length / request.length) * 100,
      นำส่งโรงพยาบาล: (hospital.length / request.length) * 100,
      นำส่งภูมิลำเนา: (home.length / request.length) * 100,
      อื่นๆ: (other.length / request.length) * 100,
    },
  ];

  const data_status = [
    {
      name: "สถานะการขอความช่วยเหลือ (%)",
      รอการช่วยเหลือ: (wait.length / request.length) * 100,
      กำลังช่วยเหลือ: (help.length / request.length) * 100,
      ช่วยเหลือสำเร็จ: (success.length / request.length) * 100,
    },
  ];

  const data_type_pie = [
    {
      name: "อาหาร",
      value: (food.length / request.length) * 100,
    },
    {
      name: "ยา",
      value: (med.length / request.length) * 100,
    },
    {
      name: "หาเตียง",
      value: (bed.length / request.length) * 100,
    },
    {
      name: "นำส่งโรงพยาบาล",
      value: (hospital.length / request.length) * 100,
    },
    {
      name: "นำส่งภูมิลำเนา",
      value: (home.length / request.length) * 100,
    },
    {
      name: "อื่นๆ",
      value: (other.length / request.length) * 100,
    },
  ];

  const data_status_pie = [
    {
      name: "รอการช่วยเหลือ",
      value: (wait.length / request.length) * 100,
    },
    {
      name: "กำลังช่วยเหลือ",
      value: (help.length / request.length) * 100,
    },
    {
      name: "ช่วยเหลือสำเร็จ",
      value: (success.length / request.length) * 100,
    },
  ];

  const renderLineChart = (
    <div>
      <PieChart width={730} height={250}>
        <Pie
          data={data_type_pie}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
        />
      </PieChart>
      <BarChart
        style={{ display: "block", margin: "20% auto" }}
        width={400}
        height={300}
        data={data_type}
      >
        <Bar dataKey="อาหาร" fill="#1abc9c" />
        <Bar dataKey="หาเตียง" fill="#2ecc71" />
        <Bar dataKey="ยา" fill="#3498db" />
        <Bar dataKey="นำส่งโรงพยาบาล" fill="#2ecc71" />
        <Bar dataKey="นำส่งภูมิลำเนา" fill="#2ecc71" />
        <Bar dataKey="อื่นๆ" fill="#2ecc71" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </BarChart>
      <BarChart
        style={{ display: "block", margin: "20% auto" }}
        width={400}
        height={300}
        data={data_status}
      >
        <Bar dataKey="รอการช่วยเหลือ" fill="#1abc9c" />
        <Bar dataKey="กำลังช่วยเหลือ" fill="#2ecc71" />
        <Bar dataKey="ช่วยเหลือสำเร็จ" fill="#3498db" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </BarChart>
    </div>
  );

  return (
    <div>
      <Header_admin Mobile={Mobile} />
      <Grid container direction="row" justifyContent="space-around">
        <Grid item xs={4} alignItems="center">
        {/* [Pie]-การขอความช่วยเหลือแต่ละประเภท (%) */}
          <Typography
            style={{
              fontFamily: "Kanit",
              color: "#90D1CB",
              fontSize: "1.2vw",
              margin: "5% 0% 5% 0%",
            }}
          >
            การขอความช่วยเหลือแต่ละประเภท (%)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart height={250}>
              <Pie
                data={data_type_pie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#90D1CB"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  console.log("handling label?");
                  const RADIAN = Math.PI / 180;
                  // eslint-disable-next-line
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  // eslint-disable-next-line
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  // eslint-disable-next-line
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#90D1CB"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      style={{ fontFamily: "Kanit", fontSize: "0.9vw" }}
                    >
                      {data_type_pie[index].name} ({value})
                    </text>
                  );
                }}
              />

              <Tooltip
                wrapperStyle={{ borderRadius: "50%", backgroundColor: "red" }}
                labelStyle={{
                  fontFamily: "Kanit",
                  color: "#90D1CB",
                  borderRadius: "50%",
                }}
                itemStyle={{
                  fontFamily: "Kanit",
                  color: "#90D1CB",
                  borderRadius: "50%",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <hr />
           {/* [Pie]-สถานะการขอความช่วยเหลือ (%) */}
          <Typography
            style={{
              fontFamily: "Kanit",
              color: "#90D1CB",
              fontSize: "1.2vw",
              margin: "5% 0% 5% 0%",
            }}
          >
            สถานะการขอความช่วยเหลือ (%)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart height={250}>
              <Pie
                data={data_status_pie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#90D1CB"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  console.log("handling label?");
                  const RADIAN = Math.PI / 180;
                  // eslint-disable-next-line
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  // eslint-disable-next-line
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  // eslint-disable-next-line
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#90D1CB"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      style={{ fontFamily: "Kanit", fontSize: "0.9vw" }}
                    >
                      {data_status_pie[index].name} ({value})
                    </text>
                  );
                }}
              />

              <Tooltip
                wrapperStyle={{ borderRadius: "50%", backgroundColor: "red" }}
                labelStyle={{
                  fontFamily: "Kanit",
                  color: "#90D1CB",
                  borderRadius: "50%",
                }}
                itemStyle={{
                  fontFamily: "Kanit",
                  color: "#90D1CB",
                  borderRadius: "50%",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={4} alignItems="center">
            {/* [Bar]-การขอความช่วยเหลือแต่ละประเภท (%) */}
          <Typography
            style={{
              fontFamily: "Kanit",
              color: "#90D1CB",
              fontSize: "1.2vw",
              margin: "5% 0% 5% 0%",
            }}
          >
            การขอความช่วยเหลือแต่ละประเภท (%)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              style={{
                fontFamily: "Kanit",
                color: "#90D1CB",
                fontSize: "1.0vw",
              }}
              width={400}
              height={250}
              data={data_type}
            >
              <Bar
                dataKey="อาหาร"
                fill="#1abc9c"
                style={{ fontFamily: "Kanit", fontSize: "1.5vw" }}
              />
              <Bar dataKey="หาเตียง" fill="#2ecc71" />
              <Bar dataKey="ยา" fill="#3498db" />
              <Bar dataKey="นำส่งโรงพยาบาล" fill="#2ecc71" />
              <Bar dataKey="นำส่งภูมิลำเนา" fill="#2ecc71" />
              <Bar dataKey="อื่นๆ" fill="#2ecc71" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#90D1CB" }}
                stroke="#90D1CB"
              />
              <YAxis
                tick={{ fill: "#90D1CB" }}
                stroke="#90D1CB"
              />
              <Tooltip style={{ fontFamily: "Kanit", fontSize: "1.5vw" }} />
            </BarChart>
          </ResponsiveContainer>
          <hr />
        </Grid>

        <Grid item xs={4} style={{ backgroundColor: "blue" }}>
          <BarChart
            style={{ display: "block", margin: "20% auto" }}
            width={400}
            height={250}
            data={data_status}
          >
            <Bar dataKey="รอการช่วยเหลือ" fill="#1abc9c" />
            <Bar dataKey="กำลังช่วยเหลือ" fill="#2ecc71" />
            <Bar dataKey="ช่วยเหลือสำเร็จ" fill="#3498db" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </Grid>

      </Grid>
    </div>
  );
}
