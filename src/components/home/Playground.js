import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { shopContract } from "../../ethereum/shop-contract";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Background from "../../images/background.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
  Button: {
    backgroundColor: "#f50057",
    margin: "5px 0",
    "&:disabled": {
      color: "#fff",
      backgroundColor: "#dddddd !important",
      //   opacity: "0.5",
    },
  },
  textMargin: {
    margin: "20px 0",
  },
});

const rewards = [
  {
    points: 3,
    pb: 50,
  },
  {
    points: 5,
    pb: 80,
  },
  {
    points: 10,
    pb: 60,
  },
  {
    points: 20,
    pb: 10,
  },
];

/**
 * 
    1.點數3點
    2.點數5
    3.點數10
    4.點數20
    5.點數50
    6.免費啾啾
    7.免費波摩5分鐘
    8.免費小故事
 */
const Playground = () => {
  const classes = useStyles();
  const [signDays, setSignDays] = useState();

  const getReward = () => {
    const rmn = Math.floor(Math.random() * 100);
    console.log(rmn);
  };
  useEffect(() => {
    document.body.style.backgroundImage = `url(${Background})`;
    const getSignDays = async () => {
      const days = await shopContract.methods.signDays().call();
      setSignDays(days);
    };
    getSignDays();
  }, []);
  return (
    <>
      <Box>
        <Typography variant="h5" component="h5" className={classes.textMargin}>
          簽到五天以上可以抽獎哦!
        </Typography>
        <Typography variant="h5" component="h5" className={classes.textMargin}>
          芸芸目前簽到了 {signDays} 天
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="large"
        fullWidth
        color="secondary"
        disabled={signDays >= 5 ? false : true}
        className={classes.Button}
        onClick={getReward}
      >
        抽獎!!!!
      </Button>

      <TableContainer component={Paper} style={{ marginBottom: "10px" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">抽獎日期</TableCell>
              <TableCell align="center">獎品</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align="center">
                1
              </TableCell>
              <TableCell align="center">1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Playground;
