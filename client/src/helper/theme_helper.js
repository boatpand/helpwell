import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme_helper = createTheme({
  palette: {
    primary: {
      main: "#FFB172",
    },
    secondary: {
      main: "#FFF",
    },
    text: {
      primary: "#FFB172",
      secondary: "#FFF"
    },
   
  },
  // typography: {
  //   fontFamily: [
  //     // 'Chilanka',
  //     // 'cursive',
  //     "Prompt",
  //     "Kanit",
  //   ],
  // },
});

export default theme_helper;