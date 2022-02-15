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
  LineChart,
  Line,
  CartesianGrid,
  Legend,
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

  const [flag, setFlag] = useState(0);

  const [request, setRequest] = useState([]);
  const [accept, setAccept] = useState([]);

  const [food, setFood] = useState([]);
  const [bed, setBed] = useState([]);
  const [med, setMed] = useState([]);
  const [home, setHome] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [other, setOther] = useState([]);
  const [all, setAll] = useState();
  const [num_re, setNum_re] = useState();

  const [wait, setWait] = useState([]);
  const [help, setHelp] = useState([]);
  const [success, setSuccess] = useState([]);

  useEffect(async () => {
    await axios
      .get(`http://localhost:4000/request/all-request-no-status`)
      .then((res) => {
        setRequest(res.data);
        // console.log(res.data.Bed)
        // setRes(res.data.Bed)
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/accept/all-accepthelp/success`)
      .then((res) => {
        setAccept(res.data);
        // console.log(res.data.Bed)
        // setRes(res.data.Bed)
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/food-request-no-status`)
      .then((res) => {
        setFood(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/bed-request-no-status`)
      .then((res) => {
        setBed(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/medicine-request-no-status`)
      .then((res) => {
        setMed(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/home-request-no-status`)
      .then((res) => {
        setHome(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/hospital-request-no-status`)
      .then((res) => {
        setHospital(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/other-request-no-status`)
      .then((res) => {
        setOther(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/all-request`)
      .then((res) => {
        setWait(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/all-request/help`)
      .then((res) => {
        setHelp(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await axios
      .get(`http://localhost:4000/request/all-request/success`)
      .then((res) => {
        setSuccess(res.data);
      })
      .catch((err) => {
        Promise.reject(err);
      });
    await setFlag(1);
  }, []);

  useEffect(() => {
    let res =
      food.length +
      bed.length +
      med.length +
      home.length +
      hospital.length +
      other.length;
    setNum_re(request.length);
    setAll(res);
    Extract();
  }, [flag]);

  // let mo = {
  //   "01": 0,
  //   "02": 0,
  //   "03": 0,
  //   "04": 0,
  //   "05": 0,
  //   "06": 0,
  //   "07": 0,
  //   "08": 0,
  //   "09": 0,
  //   "10": 0,
  //   "11": 0,
  //   "12": 0,
  // };

  const [jan, setJan] = useState();
  const [feb, setFeb] = useState();
  const [mar, setMar] = useState();
  const [apr, setApr] = useState();
  const [may, setMay] = useState();
  const [june, setJune] = useState();
  const [jul, setJul] = useState();
  const [aug, setAug] = useState();
  const [sep, setSep] = useState();
  const [oct, setOct] = useState();
  const [nov, setNov] = useState();
  const [dec, setDec] = useState();

  const [jan_acc, setJan_acc] = useState();
  const [feb_acc, setFeb_acc] = useState();
  const [mar_acc, setMar_acc] = useState();
  const [apr_acc, setApr_acc] = useState();
  const [may_acc, setMay_acc] = useState();
  const [june_acc, setJune_acc] = useState();
  const [jul_acc, setJul_acc] = useState();
  const [aug_acc, setAug_acc] = useState();
  const [sep_acc, setSep_acc] = useState();
  const [oct_acc, setOct_acc] = useState();
  const [nov_acc, setNov_acc] = useState();
  const [dec_acc, setDec_acc] = useState();

  const Extract = () => {
    let mo = {
      "01": 0,
      "02": null,
      "03": null,
      "04": null,
      "05": null,
      "06": null,
      "07": null,
      "08": null,
      "09": null,
      10: null,
      11: null,
      12: null,
    };

    let mo_acc = {
      "01": 0,
      "02": null,
      "03": null,
      "04": null,
      "05": null,
      "06": null,
      "07": null,
      "08": null,
      "09": null,
      10: null,
      11: null,
      12: null,
    };
    for (var i = 0; i < request.length; i++) {
      let months = request[i].date.slice(5, 7); // 01, 02
      console.log("month is ", months);
      mo[months] = mo[months] + 1;
    }
    for (var i = 0; i < accept.length; i++) {
      let months_acc = accept[i].date.slice(5, 7); // 01, 02
      mo_acc[months_acc] = mo_acc[months_acc] + 1;
    }

    setJan(mo["01"]);
    setFeb(mo["02"]);
    setMar(mo["03"]);
    setApr(mo["04"]);
    setMay(mo["05"]);
    setJune(mo["06"]);
    setJul(mo["07"]);
    setAug(mo["08"]);
    setSep(mo["09"]);
    setOct(mo["10"]);
    setNov(mo["11"]);
    setDec(mo["12"]);

    setJan_acc(mo_acc["01"]);
    setFeb_acc(mo_acc["02"]);
    setMar_acc(mo_acc["03"]);
    setApr_acc(mo_acc["04"]);
    setMay_acc(mo_acc["05"]);
    setJune_acc(mo_acc["06"]);
    setJul_acc(mo_acc["07"]);
    setAug_acc(mo_acc["08"]);
    setSep_acc(mo_acc["09"]);
    setOct_acc(mo_acc["10"]);
    setNov_acc(mo_acc["11"]);
    setDec_acc(mo_acc["12"]);
    console.log(mo);
    console.log(mo_acc);
  };
  // console.log(mo["01"]);

  const data_month = [
    {
      name: "Jan",
      ขอความช่วยเหลือ: jan,
      ให้ความช่วยเหลือ: jan_acc,
    },
    {
      name: "Feb",
      ขอความช่วยเหลือ: feb,
      ให้ความช่วยเหลือ: feb_acc,
    },
    {
      name: "Mar",
      ขอความช่วยเหลือ: mar,
      ให้ความช่วยเหลือ: mar_acc,
    },
    {
      name: "April",
      ขอความช่วยเหลือ: apr,
      ให้ความช่วยเหลือ: apr_acc,
    },
    {
      name: "May",
      ขอความช่วยเหลือ: may,
      ให้ความช่วยเหลือ: may_acc,
    },
    {
      name: "June",
      ขอความช่วยเหลือ: june,
      ให้ความช่วยเหลือ: june_acc,
    },
    {
      name: "Jul",
      ขอความช่วยเหลือ: jul,
      ให้ความช่วยเหลือ: jul_acc,
    },
    {
      name: "Aug",
      ขอความช่วยเหลือ: aug,
      ให้ความช่วยเหลือ: aug_acc,
    },
    {
      name: "Sep",
      ขอความช่วยเหลือ: sep,
      ให้ความช่วยเหลือ: sep_acc,
    },
    {
      name: "Oct",
      ขอความช่วยเหลือ: oct,
      ให้ความช่วยเหลือ: oct_acc,
    },
    {
      name: "Nov",
      ขอความช่วยเหลือ: nov,
      ให้ความช่วยเหลือ: nov_acc,
    },
    {
      name: "Dec",
      ขอความช่วยเหลือ: dec,
      ให้ความช่วยเหลือ: dec_acc,
    },
  ];

  const data_type = [
    {
      name: "การขอความช่วยเหลือแต่ละประเภท ",
      อาหาร: food.length,
      หาเตียง: bed.length,
      ยา: med.length,
      นำส่งโรงพยาบาล: hospital.length,
      นำส่งภูมิลำเนา: home.length,
      อื่นๆ: other.length,
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
  //Math.round((((food.length / all) * 100) + Number.EPSILON) * 100) / 100
  const data_type_pie = [
    {
      name: "อาหาร",
      value:
        Math.round(((food.length / all) * 100 + Number.EPSILON) * 100) / 100,
    },
    {
      name: "ยา",
      value:
        Math.round(((med.length / all) * 100 + Number.EPSILON) * 100) / 100,
    },
    {
      name: "หาเตียง",
      value:
        Math.round(((bed.length / all) * 100 + Number.EPSILON) * 100) / 100,
    },
    {
      name: "นำส่งโรงพยาบาล",
      value:
        Math.round(((hospital.length / all) * 100 + Number.EPSILON) * 100) /
        100,
    },
    {
      name: "นำส่งภูมิลำเนา",
      value:
        Math.round(((home.length / all) * 100 + Number.EPSILON) * 100) / 100,
    },
    {
      name: "อื่นๆ",
      value:
        Math.round(((other.length / all) * 100 + Number.EPSILON) * 100) / 100,
    },
  ];

  const data_status_pie = [
    {
      name: "กำลังช่วยเหลือ",
      value: (help.length / num_re) * 100,
    },
    {
      name: "รอการช่วยเหลือ",
      value: (wait.length / num_re) * 100,
    },
    {
      name: "ช่วยเหลือสำเร็จ",
      value: (success.length / num_re) * 100,
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
                  // console.log("handling label?");
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
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
                      {data_type_pie[index].name} ({value} %)
                    </text>
                  );
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
              margin: "5% 0% 0% 0%",
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
                fill="#1abc9c"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  // console.log("handling label?");
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#90D1CB"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      style={{
                        fontFamily: "Kanit",
                        fontSize: "0.9vw",
                        
                      }}
                    >
                      {data_status_pie[index].name} ({value} %)
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
          {/* [Bar]-การขอความช่วยเหลือแต่ละประเภท */}
          <Typography
            style={{
              fontFamily: "Kanit",
              color: "#90D1CB",
              fontSize: "1.2vw",
              margin: "5% 0% 5% 0%",
            }}
          >
            การขอความช่วยเหลือแต่ละประเภท
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
              <Bar dataKey="อาหาร" fill="#1abc9c" />
              <Bar dataKey="ยา" fill="#2ecc71" />
              <Bar dataKey="หาเตียง" fill="#90D1CB" />
              <Bar dataKey="นำส่งภูมิลำเนา" fill="#2ecc71" />
              <Bar dataKey="นำส่งโรงพยาบาล" fill="#1abc9c" />
              <Bar dataKey="อื่นๆ" fill="#90D1CB" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip style={{ fontFamily: "Kanit", fontSize: "1.5vw" }} />
            </BarChart>
          </ResponsiveContainer>
          <hr />
        </Grid>

        <Grid item xs={4} alignItems="center">
          {/* [Line]-การขอความช่วยเหลือในแต่ละเดือน */}
          <Typography
            style={{
              fontFamily: "Kanit",
              color: "#90D1CB",
              fontSize: "1.2vw",
              margin: "5% 0% 5% 0%",
            }}
          >
            การขอความช่วยเหลือในแต่ละเดือน
          </Typography>
          <ResponsiveContainer width="95%" height={250}>
            <LineChart
              style={{
                fontFamily: "Kanit",
                color: "#90D1CB",
                fontSize: "1.0vw",
                // margin: "0% 0% 0% 0%",
              }}
              width={300}
              height={250}
              data={data_month}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="ขอความช่วยเหลือ"
                stroke="#8884d8"
                // activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="ให้ความช่วยเหลือ"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
          <hr />
        </Grid>
      </Grid>
    </div>
  );
}
