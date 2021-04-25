import React, { useEffect } from "react";
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
import dizz from "../../images/dizz.PNG";
import Background from "../../images/background.jpg";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

const rewards = [
  {
    image: ticket,
    name: "chu chu ticket",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, delectus",
  },
  {
    image: drink,
    name: "free drink",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, delectus",
  },
  {
    image: dizz,
    name: "dizz",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, delectus",
  },
];

const Rewards = () => {
  const classes = useStyles();
  useEffect(() => {
    document.body.style.backgroundImage = `url(${Background})`;
  }, []);
  return rewards.map((reward) => (
    <Card className={classes.root} style={{ margin: "10px 15px" }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={reward.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {reward.drink}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {reward.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" color="secondary" fullWidth>
          Exchange
        </Button>
      </CardActions>
    </Card>
  ));
};

export default Rewards;
