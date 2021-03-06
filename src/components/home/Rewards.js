import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ticket from "../../images/ticket.PNG";
import drink from "../../images/drink.PNG";
import wish from "../../images/wish.PNG";
import food from "../../images/food.PNG";
import story from "../../images/story.PNG";
import sleep from "../../images/sleep.PNG";
import { yunContract } from "../../ethereum/yun-contract";
import { exchange } from "../../ethereum/helpers";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    width: 200,
    height: 200,
    objectFit: "cover",
    margin: "0 auto",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const rewards = [
  {
    image: ticket,
    name: "親親卷一張",
    content: "換一張代表一天可以多一次親親，不可以同一天用超過一張。",
    points: 6,
  },
  {
    image: drink,
    name: "請喝一杯飲料",
    content: "約會的時候可以獲得免費飲料一杯，也不可以一次用多張喔。",
    points: 10,
  },
  {
    image: food,
    name: "好吃的一餐",
    content: "約會的時候可以獲得免費的一餐，不可以使用多張喔，會破產。",
    points: 45,
  },
  {
    image: story,
    name: "小故事",
    content: "可以聽一則故事，這是很貴很貴的，傳說中只有超級乖寶寶能獲得。",
    points: 50,
  },

  {
    image: wish,
    name: "超級願望",
    content: "僅有世界上少數超級乖寶寶能獲得，可以許一個願望。",
    points: 100,
  },
  {
    image: sleep,
    name: "補充波味",
    content: "世界上最乖的寶寶可以兌換的獎勵，可以補充波波毯毯味道。",
    points: 300,
  },
];

const Rewards = () => {
  const classes = useStyles();
  const [points, setPoints] = useState(0);
  const [open, setOpen] = useState(false);
  const exchangeRewards = async (rewardPoints, name) => {
    if (window.confirm("確定要兌換嗎!!!")) {
      setOpen(true);

      await exchange(rewardPoints, name);
      setTimeout(async () => {
        const balancePoint = await yunContract.methods
          .yun("0xf289Bf6ecDb2BC0a2697F437446656C52484D8e6")
          .call();
        setPoints(balancePoint.points);
      }, 1000);
      setOpen(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    const getPoints = async () => {
      const balancePoint = await yunContract.methods
        .yun("0xf289Bf6ecDb2BC0a2697F437446656C52484D8e6")
        .call();
      setPoints(balancePoint.points);
    };
    getPoints();
  }, [setPoints]);
  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <img src="https://i.imgur.com/btMWvMx.gif" alt="" />
      </Backdrop>
      <Box display="flex" alignItems="center" margin="20px 0">
        <Typography variant="h4">乖乖芸點數:{points}</Typography>
      </Box>
      <Box style={{ marginBottom: "4em" }}>
        {rewards.map((reward) => (
          <Card
            className={classes.root}
            style={{ margin: "10px 15px" }}
            key={reward.content}
          >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={reward.image}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {reward.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="span">
                  {reward.points} 點
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {reward.content}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                disabled={points >= reward.points ? false : true}
                fullWidth
                onClick={() => exchangeRewards(reward.points, reward.name)}
              >
                兌換
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Rewards;
