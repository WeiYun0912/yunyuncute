import "./App.css";
import Header from "./components/home/Header";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Rewards from "./components/home/Rewards";
import Sign from "./components/home/Sign";
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
            <Route path={"/yunyunsite"} exact component={Sign} />
            <Route path={"/yunyunsite/Rewards"} component={Rewards} />
            <Redirect from={"/"} to={"/yunyunsite"}></Redirect>
          </Box>
        </Container>
      </div>
    </Router>
  );
}

export default App;
