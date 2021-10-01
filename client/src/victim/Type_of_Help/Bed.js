import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Modal,
  Box,
  Button,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_vic from "../theme_vic";

import Bed_img from "../image/bed.jpg";

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
export default function Bed() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ThemeProvider theme={theme_vic}>
      <Card sx={{ width: 345 }}>
        <CardActionArea button onClick={handleOpen}>
          <CardMedia component="img" height="200" image={Bed_img} alt="Bed" />

          <CardContent>
            <Typography
              fontFamily="Kanit"
              variant="body1"
              color="text.secondary"
            >
              หาเตียง
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ flexGrow: 1 }}
        >
          หาเตียง
        </DialogTitle>
        <DialogContent>
          <form>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="จำนวนผู้ป่วยที่ต้องการเตียงรักษา"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline
            rows={2}
            autoFocus
            margin="dense"
            id="name"
            label="หมายเหตุ"
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
      </Dialog>
    </ThemeProvider>
  );
}
