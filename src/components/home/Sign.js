import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import SignP from "../../images/sign.PNG";
import Background from "../../images/background2.jpg";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { shopContract } from "../../ethereum/shop-contract";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});
const Sign = () => {
  const classes = useStyles();
  console.log(shopContract.events);
  useEffect(async () => {
    document.body.style.backgroundImage = `url(${Background})`;
    const getRecords = async () => {
      await shopContract.events
        .signRecords({}, { fromBlock: 0, toBlock: "latest" })
        .on("connected", (event) => {
          console.log(event);
        });
    };
    await getRecords();
  }, []);
  return (
    <>
      <Card className={classes.root} style={{ margin: "10px 15px" }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={SignP}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              123
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              impedit eaque qui!
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="contained" color="secondary" fullWidth>
            Exchange
          </Button>
        </CardActions>
      </Card>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">簽到日期</TableCell>
              <TableCell align="center">簽到時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align="center">
                1
              </TableCell>
              <TableCell align="center">2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Sign;
