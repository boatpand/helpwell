import React from "react";
import { Link } from "react-router-dom";
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
  } = props;

  return (
    <Grid item>
      <Card className={classes.root}>
        <CardContent>
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
              style={{ color: "#6c757d", fontFamily: "Kanit" }}
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
}
