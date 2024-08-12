import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "./routes";

// defaultTheme
import themes from "./themes";
import Locales from "./ui-component/Locales";
import NavigationScroll from "./layout/NavigationScroll";
import Snackbar from "./ui-component/extended/Snackbar";

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <Locales>
          <NavigationScroll>
            <Routes />
            <Snackbar />
          </NavigationScroll>
        </Locales>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
