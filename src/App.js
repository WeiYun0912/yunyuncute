import "./App.css";
import Header from "./components/home/Header";
import Rewards from "./components/home/Rewards";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
function App() {
  return (
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
          <Rewards />
        </Box>
      </Container>
    </div>
  );
}

export default App;
