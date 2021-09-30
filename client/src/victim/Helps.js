import * as React from "react";
import {
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_vic from "./theme_vic";

import Header_Vic from "./Header_vic";

import Food from "./Type_of_Help/Food";
import Medicine from "./Type_of_Help/Medicine";
import Hospital from "./Type_of_Help/Hospital";

const fontSize = 22;
const useStyles = makeStyles((theme) => ({
  GridSpacer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 100,
    justifyContent: "center",
  },
  Spacer: {
    padding: theme.spacing(1.5),
  },
  Spacer1: {
    padding: theme.spacing(2),
  },
  Spancer: {
    marginLeft: theme.spacing(125),
  },
}));

export default function Helps() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme_vic}>
      <Header_Vic />
      <div className={classes.Spacer1} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1 }}
      >
        <Typography
          fontFamily="Kanit"
          fontSize={fontSize}
          variant="h5"
          color="text.primary"
        >
          เลือกประเภทความช่วยเหลือ
        </Typography>
        <div className={classes.Spancer} />
        <Button variant="outlined" size="small">
          Next
        </Button>
      </Box>
      <div className={classes.Spacer1} />
      <Grid display="flex" className={classes.GridSpacer}>
        <Food />
        <Medicine />
        <Hospital />
      </Grid>

      <div className={classes.Spacer} />
      <Grid display="flex" className={classes.GridSpacer}>
        <Food />
        <Medicine />
        <Hospital />
      </Grid>
    </ThemeProvider>
  );
}
