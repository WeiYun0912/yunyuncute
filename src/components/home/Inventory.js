import React, { useState, useEffect } from "react";
import { yunContract } from "../../ethereum/yun-contract";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SimpleDateTime from "react-simple-timestamp-to-date";
import Button from "@material-ui/core/Button";
import { changeRewardState } from "../../ethereum/helpers";
import { Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const Inventory = () => {
  const [rewards, setRecords] = useState();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getRewardInventory = async () => {
      const results = await yunContract.methods.getAllReward().call();
      console.log(results);
      setRecords(results);
    };
    getRewardInventory();
  }, []);

  const exchange = async (id) => {
    setOpen(true);
    await changeRewardState(id - 1);
    const results = await yunContract.methods.getAllReward().call();
    console.log(results);
    setTimeout(() => {
      setRecords(results);
    }, 1000);
    setOpen(false);
  };
  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <img src="https://i.imgur.com/btMWvMx.gif" alt="" />
      </Backdrop>
      <TableContainer component={Paper} style={{ margin: "10px 0" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">取得時間</TableCell>
              <TableCell align="center">獎品</TableCell>
              <TableCell align="center">狀態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rewards?.map((reward) => (
              <TableRow key={reward.exchangeAt}>
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
                  {!reward.state ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => exchange(reward.id)}
                    >
                      兌換
                    </Button>
                  ) : (
                    <Typography component="p">已兌換</Typography>
                  )}
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
