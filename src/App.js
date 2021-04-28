import "./App.css";
import Header from "./components/home/Header";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Rewards from "./components/home/Rewards";
import Sign from "./components/home/Sign";
import Playground from "./components/home/Playground";
import Inventory from "./components/home/Inventory";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            width="100%"
          >
            <Route path={"/yunyuncute"} exact component={Sign} />
            <Route path={"/yunyuncute/Rewards"} component={Rewards} />
            <Route path={"/yunyuncute/Playground"} component={Playground} />
            <Route path={"/yunyuncute/Inventory"} component={Inventory} />

            <Redirect from={"/"} to={"/yunyuncute"}></Redirect>
          </Box>
        </Container>
      </div>
    </Router>
  );
}

export default App;