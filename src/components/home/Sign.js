import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { yunContract } from "../../ethereum/yun-contract";
import { sign } from "../../ethereum/helpers";
import SimpleDateTime from "react-simple-timestamp-to-date";
import Backdrop from "@material-ui/core/Backdrop";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
  Button: {
    backgroundColor: "#f50057",
    "&:disabled": {
      color: "#fff",
      backgroundColor: "#a4a4a4 !important",
      opacity: "0.9",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Sign = () => {
  const classes = useStyles();
  const [signRecords, setSignRecords] = useState();
  const [open, setOpen] = useState(false);
  const [canSign, setCanSign] = useState(false);
  useEffect(() => {
    const getSignRecords = async () => {
      const results = await yunContract.getPastEvents("signRecords", {
        fromBlock: 0,
      });
      const sortRe = results.sort(
        (a, b) => b.returnValues[1] - a.returnValues[1]
      );
      setSignRecords(sortRe);
    };
    const getSignTime = async () => {
      const result = await yunContract.methods
        .yun("0xf289Bf6ecDb2BC0a2697F437446656C52484D8e6")
        .call();
      const tomorrow1 = +result.signAt + 24 * 3600;
      const tomorrow2 = Math.round(new Date().getTime() / 1000);

      if (tomorrow1 <= tomorrow2) {
        return;
      }
      setCanSign(true);
    };
    getSignRecords();
    getSignTime();
  }, [setSignRecords, setCanSign]);

  const signHandler = async () => {
    setOpen(true);
    await sign();
    setTimeout(async () => {
      const results = await yunContract.getPastEvents("signRecords", {
        fromBlock: 0,
      });
      const sortRe = results.sort(
        (a, b) => b.returnValues[1] - a.returnValues[1]
      );
      setCanSign(true);
      setSignRecords(sortRe);
    }, 1000);
    setOpen(false);
  };

  const se = async () => {
    await axios.get("http://localhost:5000/").then((r) => console.log(r));
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <img src="https://i.imgur.com/btMWvMx.gif" alt="" />
      </Backdrop>
      <Box width="100%" margin="20px 0">
        <Button
          size="large"
          variant="contained"
          fullWidth
          color="secondary"
          disabled={canSign}
          onClick={signHandler}
          className={classes.Button}
        >
          簽到
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ marginBottom: "10px" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">簽到日期</TableCell>
              <TableCell align="center">簽到時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {signRecords?.map((record) => (
              <TableRow key={record.returnValues[1]}>
                <TableCell component="th" scope="row" align="center">
                  <SimpleDateTime
                    dateSeparator="-"
                    format="MYD"
                    timeSeparator=":"
                    meridians="1"
                    showTime="0"
                  >
                    {record.returnValues[1]}
                  </SimpleDateTime>
                </TableCell>
                <TableCell align="center">
                  <SimpleDateTime
                    dateSeparator="-"
                    format="MYD"
                    timeSeparator=":"
                    showDate="0"
                  >
                    {record.returnValues[1]}
                  </SimpleDateTime>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Button onClick={se} size="large" variant="contained" fullWidth>
        Test
      </Button> */}
    </>
  );
};

export default Sign;
