import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Modal,
  Box,
  Button,
} from "@mui/material";

import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MailIcon from "@mui/icons-material/Mail";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_vic from "../theme_vic";

import food_img from "../image/food.jpg";

const useStyles = makeStyles((theme) => ({
  paper: {
    alignItems: "center",
    display: "block",
    margin: "0px auto",
    padding: theme.spacing(2, 8),
  },
  spacer: {
    marginTop: theme.spacing(4),
  },
  form: {
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 1050,
    flex: 1,
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    width: 500,
    flex: 1,
  },
  textLink: {
    color: "inherit",
    textDecoration: "inherit",
  },
}));
export default function Food() {
  const classes = useStyles();

  const [count, setCount] = React.useState(0);
  const [invisible, setInvisible] = React.useState(true);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };
  const handleIncrese = () => {
    setCount(count + 1);
  };
  const handleReduce = () => {
    setCount(count - 1, 0);
  };
  const handleChecked = () => {
    <Switch checked={!invisible} onChange={handleBadgeVisibility} />;
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ThemeProvider theme={theme_vic}>
      <Card sx={{ width: 345 }}>
        <CardMedia component="img" height="200" image={food_img} alt="food" />

        <CardContent>
          <Typography fontFamily="Kanit" variant="body1" color="text.secondary">
            จำนวนอาหารที่ต้องการ (วัน)
          </Typography>
        </CardContent>

        <CardActions>
          <Badge
            color="secondary"
            badgeContent={count}
            sx={{ display: "flex", alignItems: "center", pl: 4, pb: 1 }}
            size="medium"
          >
            <MailIcon size="large"/>
          </Badge>
          <ButtonGroup
            sx={{ display: "flex", alignItems: "center", pl: 18, pb: 1 }}
          >
            <Button
              aria-label="reduce"
              onClick={() => {
                setCount(Math.max(count - 1, 0));
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Button
              aria-label="increase"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
      {/* 
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ flexGrow: 1 }}
        >
          อาหาร
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="อาหารที่ไม่รับประทาน"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="หมายเหตุ"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="จำนวน (ชุด)"
              type="text"
              fullWidth
              variant="standard"
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
      </Dialog> */}
    </ThemeProvider>
  );
}
