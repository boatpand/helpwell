import React, { useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Badge,
  ButtonGroup,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Fastfood,
  MedicalServices,
  Hotel,
  LocalHospitalRounded,
  HomeRounded,
} from "@mui/icons-material";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_vic from "./theme_vic";

import Header_Vic from "./Header_vic";

import food_img from "./image/kaprao.jpg";
import medicine_img from "./image/medicine.jpg";
import bed_img from "./image/bed.jpg";
import hospital_img from "./image/Hospital.jpg";
import home_img from "./image/home.jpg";
import other_img from "./image/temp.jpg";

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
    justifyContent: "flex-end",
  },
}));

export default function Help(props) {
  const classes = useStyles();

  const GetStateParam = useLocation().state;
  const { Mobile } = GetStateParam;
  console.log("Help_Mobile : ", Mobile);

  const [count_Food, setcount_Food] = useState(0);
  const [count_Medicine, setcount_Medicine] = useState(0);
  const [count_Bed, setcount_Bed] = useState(0);
  const [count_Hospital, setcount_Hospital] = useState(0);
  const [count_Home, setcount_Home] = useState(0);
  const [value_Other, setvalue_Other] = useState("");
  const [count_Other, setcount_Other] = useState(0);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFood_Increse = () => {
    setcount_Food(count_Food + 1);
  };
  const handleFood_Reduce = () => {
    setcount_Food(Math.max(count_Food - 1, 0));
  };
  const handleMedicine_Increse = () => {
    setcount_Medicine(count_Medicine + 1);
  };
  const handleMedicine_Reduce = () => {
    setcount_Medicine(Math.max(count_Medicine - 1, 0));
  };
  const handleBed_Increse = () => {
    setcount_Bed(count_Bed + 1);
  };
  const handleBed_Reduce = () => {
    setcount_Bed(Math.max(count_Bed - 1, 0));
  };
  const handleHospital_Increse = () => {
    setcount_Hospital(count_Hospital + 1);
  };
  const handleHospital_Reduce = () => {
    setcount_Hospital(Math.max(count_Hospital - 1, 0));
  };
  const handleHome_Increse = () => {
    setcount_Home(count_Home + 1);
  };
  const handleHome_Reduce = () => {
    setcount_Home(Math.max(count_Home - 1, 0));
  };
  const handleOther = (event) => {
    setvalue_Other(event.target.value);
  };
  const handleCountOther = (event) => {
    setcount_Other(event.target.value);
  };

  const onClick = () => {};

  const data = {
    Mobile: Mobile,
    count_Food: count_Food,
    count_Medicine: count_Medicine,
    count_Bed: count_Bed,
    count_Hospital: count_Hospital,
    count_Home: count_Home,
    count_Other: count_Other,
    value_Other: value_Other,
  };

  return (
    <ThemeProvider theme={theme_vic}>
      <Header_Vic />
      <div className={classes.Spacer1} />
      <Grid container direction="row" justifyContent="space-around">
        <Typography
          alignItems="center"
          justifyContent="center"
          fontFamily="Kanit"
          fontSize={fontSize}
          variant="h5"
          color="text.primary"
        >
          เลือกประเภทความช่วยเหลือ
        </Typography>
        <div className={classes.Spancer} />
        <Link
          to={{
            pathname: `/victims/summary`,
            state: { data: data, Mobile: Mobile },
          }}
        >
          <Button variant="outlined" size="small">
            Next
          </Button>
        </Link>
      </Grid>

      <div className={classes.Spacer1} />

      <Grid display="flex" className={classes.GridSpacer}>
        {/* Card Food */}
        <Card sx={{ width: 400 }}>
          <CardMedia component="img" height="200" image={food_img} alt="food" />

          <CardContent>
            <Typography
              fontFamily="Kanit"
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.2vw" }}
            >
              จำนวนอาหารที่ต้องการ (วัน)
            </Typography>
          </CardContent>

          <CardActions>
            <Badge
              color="secondary"
              badgeContent={count_Food}
              sx={{ display: "flex", alignItems: "center", pl: 10, pb: 1 }}
              size="large"
            >
              <Fastfood size="large" />
            </Badge>
            <ButtonGroup
              sx={{ display: "flex", alignItems: "center", pl: 15, pb: 1 }}
            >
              <Button aria-label="reduce" onClick={handleFood_Reduce}>
                <RemoveIcon fontSize="small" />
              </Button>
              <Button aria-label="increase" onClick={handleFood_Increse}>
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </CardActions>
        </Card>

        {/* Card Medicine */}
        <Card sx={{ width: 400 }}>
          <CardMedia
            component="img"
            height="200"
            image={medicine_img}
            alt="food"
          />

          <CardContent>
            <Typography
              fontFamily="Kanit"
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.2vw" }}
            >
              จำนวนยาที่ต้องการ (วัน)
            </Typography>
          </CardContent>

          <CardActions>
            <Badge
              color="secondary"
              badgeContent={count_Medicine}
              sx={{ display: "flex", alignItems: "center", pl: 10, pb: 1 }}
              size="medium"
            >
              <MedicalServices size="large" />
            </Badge>
            <ButtonGroup
              sx={{ display: "flex", alignItems: "center", pl: 15, pb: 1 }}
            >
              <Button aria-label="reduce" onClick={handleMedicine_Reduce}>
                <RemoveIcon fontSize="small" />
              </Button>
              <Button aria-label="increase" onClick={handleMedicine_Increse}>
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </CardActions>
        </Card>

        {/* Card Bed */}
        <Card sx={{ width: 400 }}>
          <CardMedia component="img" height="200" image={bed_img} alt="food" />

          <CardContent>
            <Typography
              fontFamily="Kanit"
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.2vw" }}
            >
              จำนวนเตียงที่ต้องการขอ (เตียง)
            </Typography>
          </CardContent>

          <CardActions>
            <Badge
              color="secondary"
              badgeContent={count_Bed}
              sx={{ display: "flex", alignItems: "center", pl: 10, pb: 1 }}
              size="medium"
            >
              <Hotel size="large" />
            </Badge>
            <ButtonGroup
              sx={{ display: "flex", alignItems: "center", pl: 15, pb: 1 }}
            >
              <Button aria-label="reduce" onClick={handleBed_Reduce}>
                <RemoveIcon fontSize="small" />
              </Button>
              <Button aria-label="increase" onClick={handleBed_Increse}>
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </CardActions>
        </Card>
      </Grid>

      <div className={classes.Spacer} />
      <Grid display="flex" className={classes.GridSpacer}>
        {/* Card Hospital */}
        <Card sx={{ width: 400 }}>
          <CardMedia
            component="img"
            height="200"
            image={hospital_img}
            alt="food"
          />

          <CardContent>
            <Typography
              fontFamily="Kanit"
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.2vw" }}
            >
              จำนวนผู่ป่วยที่ต้องการรถนำส่งโรงพยาบาล (คน)
            </Typography>
          </CardContent>

          <CardActions>
            <Badge
              color="secondary"
              badgeContent={count_Hospital}
              sx={{ display: "flex", alignItems: "center", pl: 10, pb: 1 }}
              size="medium"
            >
              <LocalHospitalRounded size="large" />
            </Badge>
            <ButtonGroup
              sx={{ display: "flex", alignItems: "center", pl: 15, pb: 1 }}
            >
              <Button aria-label="reduce" onClick={handleHospital_Reduce}>
                <RemoveIcon fontSize="small" />
              </Button>
              <Button aria-label="increase" onClick={handleHospital_Increse}>
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </CardActions>
        </Card>

        {/* Card Home */}
        <Card sx={{ width: 400 }}>
          <CardMedia component="img" height="200" image={home_img} alt="food" />

          <CardContent>
            <Typography
              fontFamily="Kanit"
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.2vw" }}
            >
              จำนวนผู้ป่วยที่ต้องการรถนำส่งภูมิลำเนา (คน)
            </Typography>
          </CardContent>

          <CardActions>
            <Badge
              color="secondary"
              badgeContent={count_Home}
              sx={{ display: "flex", alignItems: "center", pl: 10, pb: 1 }}
              size="medium"
            >
              <HomeRounded size="large" />
            </Badge>
            <ButtonGroup
              sx={{ display: "flex", alignItems: "center", pl: 15, pb: 1 }}
            >
              <Button aria-label="reduce" onClick={handleHome_Reduce}>
                <RemoveIcon fontSize="small" />
              </Button>
              <Button aria-label="increase" onClick={handleHome_Increse}>
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </CardActions>
        </Card>

        {/* Card Other */}
        <Card sx={{ width: 400 }}>
          <CardActionArea button onClick={handleOpen}>
            <CardMedia
              component="img"
              height="200"
              image={other_img}
              alt="Other"
            />

            <CardContent>
              <Typography
                fontFamily="Kanit"
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.2vw" }}
              >
                อื่นๆ
              </Typography>
            </CardContent>
            <CardActions>
              <Typography
                fontFamily="Kanit"
                variant="body1"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 12,
                  pb: 1,
                  fontSize: "1.2vw",
                }}
              >
                กดที่รูปเพื่อระบุความต้องการ
              </Typography>
            </CardActions>
          </CardActionArea>
        </Card>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ flexGrow: 1, fontFamily: "Kanit" }}
          >
            ระบุความต้องการ
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="ความต้องการ"
                type="text"
                fullWidth
                variant="standard"
                value={value_Other}
                onChange={handleOther}
                sx={{ fontFamily: "Kanit" }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="int"
                type="number"
                label="จำนวน (ชุด)"
                fullWidth
                variant="standard"
                value={count_Other}
                onChange={handleCountOther}
                sx={{ fontFamily: "Kanit" }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button sx={{ flex: 1 }} variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={{ flex: 1 }} variant="contained" onClick={handleClose}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <div className={classes.Spacer} />
    </ThemeProvider>
  );
}
