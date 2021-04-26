import React, { useState, useEffect } from "react";
import { yunContract } from "../../ethereum/yun-contract";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Background from "../../images/background.jpg";
import SimpleDateTime from "react-simple-timestamp-to-date";
import Button from "@material-ui/core/Button";
const Inventory = () => {
  const [rewards, setRecords] = useState();
  useEffect(() => {
    document.body.style.backgroundImage = `url(${Background})`;
    const getRewardInventory = async () => {
      const results = await yunContract.methods.getAllReward().call();
      console.log(results);
      setRecords(results);
    };
    getRewardInventory();
  }, []);
  return (
    <>
      <TableContainer component={Paper} style={{ margin: "10px 0" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">兌換時間</TableCell>
              <TableCell align="center">獎品</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rewards?.map((reward) => (
              <TableRow>
                <TableCell align="center">
                  <SimpleDateTime
                    dateSeparator="-"
                    format="MYD"
                    timeSeparator=":"
                    showTime="0"
                  >
                    {reward.exchangeAt}
                  </SimpleDateTime>
                </TableCell>
                <TableCell align="center">{reward.name}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary">
                    兌換
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Inventory;
