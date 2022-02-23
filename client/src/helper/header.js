// import React, { Component } from 'react';
import logo_helper_header from '../logo_helper_header.png';
// import { Link } from 'react-router-dom';

// export default class Header extends Component {
//     render() {
//         return (
//             <div>
//             <nav class="navbar fixed-top navbar-expand-lg" style={{backgroundColor:"#FFB172", height:"4rem"}}>
//             <div class="container-fluid">
//                 <Link class="navbar-brand" to={{pathname:`/helper`,state:{Mobile:this.props.Mobile}}}>
//                     <img src={logo_helper_header} class="img-fluid" style={{width:"80%", marginLeft:"30%"}}></img>
//                 </Link>
//                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"><label style={{fontSize:"4vw", fontWeight:"bold", color:"#ffffff"}}>Menu</label></span>
//                 </button>
//                 <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{marginRight:"5%"}}>
//                 <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
//                     <li class="nav-item" style={{background:"#FFB172"}}>
//                     <Link class="nav-link" style={{fontFamily:"Kanit", fontSize:"1.3vw", color:"#ffffff"}}
//                     to={{pathname:`/helper`,state:{Mobile:this.props.Mobile}}}>ให้ความช่วยเหลือ</Link>
//                     </li>
//                     <li class="nav-item" style={{background:"#FFB172"}}>
//                     <Link class="nav-link" style={{fontFamily:"Kanit", fontSize:"1.3vw", color:"#ffffff"}}
//                     to={{pathname:`/helpermap`,state:{Mobile:this.props.Mobile}}}>แผนที่</Link>
//                     </li>
//                     <li class="nav-item" style={{background:"#FFB172"}}>
//                     <Link class="nav-link" style={{fontFamily:"Kanit", fontSize:"1.3vw", color:"#ffffff"}}
//                     to={{pathname:`/helperprofile/${this.props.Mobile}`,state:{Mobile:this.props.Mobile}}}>|&nbsp;&nbsp;&nbsp;Profile</Link>
//                     </li>
//                 </ul>
//                 </div>
//             </div>
//             </nav>
//             </div>
//         )
//     }
// }

import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme_helper from "./theme_helper";

// import logo_white from "./image/logo-white-crop.png";

const useStyles = makeStyles(() => ({
  logoImage: {
    width: 120,
    height: 50,
  },
  Header: {
    height: "4rem",
    weight: "100%",
    padding: "0 5%",
    justifyContent: "center",
  },
  spancer: {
    flexGrow: 1,
  },
}));

export default function Header_admin(props) {
  const classes = useStyles();
  const GetStateParam = useLocation().state;
  const { Mobile } = GetStateParam ;
  console.log()
  return (
    <ThemeProvider theme={theme_helper}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1 }}
      >
        <AppBar position="static" className={classes.Header}>
          <Toolbar>
            <Link
              to={{
                pathname: `/helper`,
                state: { Mobile: Mobile },
              }}
            >
              <Typography>
                <img src={logo_helper_header} className={classes.logoImage} />
              </Typography>
            </Link>
            <div className={classes.spancer} />
            <Link
              style={{textDecorationLine:"none", fontFamily:"Kanit", fontSize:"1.3vw", color:"#ffffff"}}
              to={{
                pathname: `/helper`,
                state: { Mobile: Mobile },
              }}
            >
              ให้ความช่วยเหลือ
            </Link>
            <Typography>&nbsp;&nbsp;&nbsp;</Typography>

            <Link
              style={{textDecorationLine:"none", fontFamily:"Kanit", fontSize:"1.3vw", color:"#ffffff"}}
              to={{
                pathname: `/helpermap`,
                state: { Mobile: Mobile },
              }}
            >
            แผนที่
            </Link>

            <Typography color="secondary" style={{fontSize:"1.3vw"}}>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</Typography>
            <Link
              style={{textDecorationLine:"none", fontFamily:"Kanit", fontSize:"1.3vw", color:"#ffffff"}}
              to={{
                pathname: `/helperprofile/${Mobile}`,
                state: { Mobile: Mobile },
              }}
            >
            Profile
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}