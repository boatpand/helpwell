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
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const useStyles = makeStyles((theme) => ({}));

export default function Profile_text(props) {
  const classes = useStyles();
  const { help, count, option, status } = props;

  return (
    <ThemeProvider theme={theme_vic}>
      <Grid item xs={12}>
        {/* food */}
        {help == "อาหาร" ? (
          <div style={{ width: "100%", display: "block" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 1,
              }}
            >
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                จำนวนอาหารที่ต้องการ
              </Typography>
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                {count} วัน
              </Typography>
            </Box>
            <TextField
            disabled
              fontFamily="Kanit"
              multiline
              rows={1}
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="outlined"
              value={option}
              style={{
                color: "#2F4A8A",
                fontFamily: "Kanit",
                fontSize: "1.3vw",
              }}
              
            />
             
          </div>
        ) : null}

        {/* medicine */}
        {help == "ยา" ? (
          <div style={{ width: "100%", display: "block" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 1,
              }}
            >
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                จำนวนยาที่ต้องการ
              </Typography>
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                {count} วัน
              </Typography>
            </Box>
            <TextField
              disabled
              fontFamily="Kanit"
              multiline
              rows={1}
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="outlined"
              value={option}
              style={{
                color: "#FFB172",
                fontFamily: "Kanit",
                fontSize: "1.3vw",
              }}
            />
          </div>
        ) : null}

        {/* bed */}
        {help == "เตียง" ? (
          <div style={{ width: "100%", display: "block" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 1,
              }}
            >
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                จำนวนเตียงที่ต้องการขอ
              </Typography>
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                {count} วัน
              </Typography>
            </Box>
            <TextField
              disabled
              fontFamily="Kanit"
              multiline
              rows={1}
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="outlined"
              value={option}
              style={{
                color: "#FFB172",
                fontFamily: "Kanit",
                fontSize: "1.3vw",
              }}
            />
          </div>
        ) : null}

        {/* hospital */}
        {help == "รถนำส่งโรงพยาบาล" ? (
          <div style={{ width: "100%", display: "block" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 1,
              }}
            >
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                จำนวนผู้ป่วยที่ต้องการรถนำส่งโรงพยาบาล
              </Typography>
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                {count} คน
              </Typography>
            </Box>
            <TextField
              disabled
              fontFamily="Kanit"
              multiline
              rows={1}
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="outlined"
              value={option}
              style={{
                color: "#FFB172",
                fontFamily: "Kanit",
                fontSize: "1.3vw",
              }}
            />
          </div>
        ) : null}

        {/* home */}
        {help == "รถนำส่งภูมิลำเนา" ? (
          <div style={{ width: "100%", display: "block" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 1,
              }}
            >
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                จำนวนผู้ป่วยที่ต้องการรถนำส่งภูมิลำเนา
              </Typography>
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                {count} คน
              </Typography>
            </Box>
            <TextField
              disabled
              fontFamily="Kanit"
              multiline
              rows={1}
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="outlined"
              value={option}
              style={{
                color: "#FFB172",
                fontFamily: "Kanit",
                fontSize: "1.3vw",
              }}
            />
          </div>
        ) : null}

        {/* other */}
        {help != "" && help != "อาหาร" && help != "ยา" && help != "เตียง" && help != "รถนำส่งโรงพยาบาล" && help != "รถนำส่งภูมิลำเนา" ? (
          <div style={{ width: "100%", display: "block" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 1,
              }}
            >
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                {help}
              </Typography>
              <Typography
                style={{
                  color: "#2F4A8A",
                  fontFamily: "Kanit",
                  fontSize: "1.2vw",
                  flexShrink: 0,
                }}
              >
                {count} ชุด
              </Typography>
            </Box>
            <TextField
              disabled
              fontFamily="Kanit"
              multiline
              rows={1}
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="outlined"
              value={option}
              style={{
                color: "#FFB172",
                fontFamily: "Kanit",
                fontSize: "1.3vw",
              }}
            />
          </div>
        ) : null}
      </Grid>
    </ThemeProvider>
  );
}
