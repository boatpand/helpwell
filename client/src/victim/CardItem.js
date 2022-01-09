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
    alignItems: "center",
    margin: "0px auto",
    padding: theme.spacing(2, 8),
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textLink: {
    color: "inherit",
    textDecoration: "inherit",
  },
  title: {
    fontSize: 25,
  },
  submitBtn: {
    flex: 1,
  },
  spacer: {
    marginLeft: theme.spacing(4),
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
    <ThemeProvider theme={theme_vic}>
      <Grid item>
        <Card className={classes.root}>
          <Box className={classes.paper}>
            <CardContent>
              <Box className={classes.paper}>
                { Food ? (
                  <div style={{ width: "100%" }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ flexGrow: 1 }}
                    >
                      <Typography
                        fontFamily="Kanit"
                        variant="h6"
                        color="text.primary"
                        sx={{ flexShrink: 0 }}
                      >
                        จำนวนอาหารที่ต้องการ
                      </Typography>
                      <div className={classes.spancer} />
                      <Typography
                        fontFamily="Kanit"
                        variant="h6"
                        color="text.primary"
                      >
                        {count_Food}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วัน
                      </Typography>
                    </Box>
                  </div>
                ) : null}
              </Box>
              <br />
              <Typography variant="body2" color="textSecondary">
                aaa
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}
