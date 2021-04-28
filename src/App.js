import { useState } from "react";
import "./App.css";
import Header from "./components/home/Header";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Rewards from "./components/home/Rewards";
import Sign from "./components/home/Sign";
import Playground from "./components/home/Playground";
import Inventory from "./components/home/Inventory";
import BottomNav from "./components/home/BottomNav";
function App() {
  const [index, setIndex] = useState();
  return (
    <Router>
      <div className="App">
        <Header setIndex={setIndex} />

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
      <BottomNav index={index} setIndex={setIndex} />
    </Router>
  );
}

export default App;
