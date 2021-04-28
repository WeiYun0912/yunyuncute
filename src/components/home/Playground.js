import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { yunContract } from "../../ethereum/yun-contract";
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
import getReward from "../hepler/getReward";
import { extraPoints, lottery } from "../../ethereum/helpers";
import SimpleDateTime from "react-simple-timestamp-to-date";
import Backdrop from "@material-ui/core/Backdrop";
const useStyles = makeStyles((theme) => ({
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

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
  const [totalDays, setTotalDays] = useState();
  const [rewardRecords, setRewardRecords] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handlerClick = async () => {
    const rmn = Math.floor(Math.random() * 100);
    const reward = getReward(rmn);
    setLoading(true);
    setOpen(true);
    if (reward?.points) {
      await initSignDays();
      await extraPoints(reward.points, reward.name);
    } else {
      await lottery(reward.name);
    }

    setTimeout(async () => {
      const results = await yunContract.getPastEvents("lotteryRecords", {
        fromBlock: 0,
      });
      setRewardRecords(results);
      setLoading(false);
    }, 1000);

    setOpen(false);
  };
  useEffect(() => {
    const getSignDays = async () => {
      const days = await yunContract.methods.signDays().call();
      const tDays = await yunContract.methods.totalDays().call();
      setSignDays(days);
      setTotalDays(tDays);
    };

    const getRewardRecord = async () => {
      const results = await yunContract.getPastEvents("lotteryRecords", {
        fromBlock: 0,
      });
      setRewardRecords(results);
    };
    getSignDays();
    getRewardRecord();
  }, [setRewardRecords]);
  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <img src="https://i.imgur.com/btMWvMx.gif" alt="" />
      </Backdrop>
      <Box>
        <Typography variant="h5" component="h5" className={classes.textMargin}>
          簽到五天以上可以抽獎哦!
        </Typography>
        <Typography variant="h5" component="h5" className={classes.textMargin}>
          芸芸目前簽到了 {totalDays} 天
        </Typography>
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        color="secondary"
        disabled={signDays >= 5 && !loading ? false : true}
        className={classes.Button}
        onClick={handlerClick}
      >
        抽獎!!!!
      </Button>

      <TableContainer component={Paper} style={{ marginBottom: "10px" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">抽獎時間</TableCell>
              <TableCell align="center">獎品</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rewardRecords?.map((record) => (
              <TableRow key={record.returnValues[0]}>
                <TableCell component="th" scope="row" align="center">
                  <SimpleDateTime
                    dateSeparator="-"
                    format="MYD"
                    timeSeparator=":"
                  >
                    {record.returnValues[0]}
                  </SimpleDateTime>
                </TableCell>
                <TableCell align="center">{record.returnValues[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Playground;
