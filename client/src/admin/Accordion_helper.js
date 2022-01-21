import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Stack, Chip } from "@mui/material";
import { Fastfood } from "@mui/icons-material";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";

import theme_admin from "./theme_admin";
import Header_admin from "./Header_admin";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
  GridSpacer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 100,
    justifyContent: "center",
  },
  Stack: {
    padding: theme.spacing(2),
    justifyContent: "center",
    color: "black",
  },
  Spacer1: {
    padding: theme.spacing(2),
  },
  Spancer: {
    justifyContent: "flex-end",
  },
}));

export default function Accordion_helper(props) {
  const classes = useStyles();
  const {
    Mobile,
    Firstname,
    Lastname,
    Org_Name,
    isOrg,
    House_No,
    Soi,
    Road,
    Subdistrict,
    District,
    Province,
    ZIP_Code,
  } = props;

  return (
    <ThemeProvider theme={theme_admin}>
      <Grid item xs={12}>
        <Accordion style={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            {isOrg ? (
              <Typography fontFamily="Kanit" sx={{ flexShrink: 0 }}>
                [องค์กร]&nbsp;:&nbsp;{Org_Name}
              </Typography>
            ) : (
              <Typography fontFamily="Kanit">
                [บุคคล]&nbsp;:&nbsp;{Firstname}&nbsp;&nbsp;{Lastname}
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontFamily="Kanit" sx={{ flexShrink: 0 }}>
                เบอร์โทรศัพท์&nbsp;:&nbsp;{Mobile}
              </Typography>
              {isOrg ? (
                <Typography fontFamily="Kanit" sx={{ flexShrink: 0 }}>
                  ชื่อผู้รับชอบ&nbsp;:&nbsp;{Firstname}&nbsp;&nbsp;{Lastname}
                </Typography>
              ) : null}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontFamily="Kanit">
                ที่อยู่ : &nbsp;&nbsp;&nbsp;{House_No}&nbsp;&nbsp;ซอย&nbsp;
                {Soi}&nbsp;&nbsp;ถนน&nbsp;
                {Road}&nbsp;&nbsp;แขวง&nbsp;{Subdistrict}&nbsp;&nbsp;เขต&nbsp;
                {District}&nbsp;&nbsp;
                {Province}&nbsp;&nbsp;
                {ZIP_Code}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </ThemeProvider>
  );
}
