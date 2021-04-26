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
const useStyles = makeStyles({
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
});

const Sign = () => {
  const classes = useStyles();
  const [signRecords, setSignRecords] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    const getSignRecords = async () => {
      const results = await yunContract.getPastEvents("signRecords", {
        fromBlock: 0,
      });
      setSignRecords(results);
    };
    getSignRecords();
  }, [setSignRecords]);

  const signHandler = async () => {
    setButtonDisabled(true);
    await sign();
    const results = await yunContract.getPastEvents("signRecords", {
      fromBlock: 0,
    });
    setSignRecords(results);
    setButtonDisabled(false);
  };

  return (
    <>
      <Box width="100%" margin="20px 0">
        <Button
          size="large"
          variant="contained"
          fullWidth
          color="secondary"
          disabled={buttonDisabled}
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
    </>
  );
};

export default Sign;
