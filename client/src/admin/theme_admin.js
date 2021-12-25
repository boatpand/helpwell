import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme_vic = createTheme({
  palette: {
    primary: {
      main: "#90D1CB",
    },
    secondary: {
      main: "#FFF",
    },
    text: {
      primary: "#90D1CB",
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

export default theme_vic;
