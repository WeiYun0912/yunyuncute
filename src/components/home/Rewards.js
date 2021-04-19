import React from "react";
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
  },
  {
    image: drink,
    name: "free drink",
  },
];

const Rewards = () => {
  const classes = useStyles();
  return rewards.map((reward) => (
    <Card className={classes.root} style={{ marginTop: "10px" }}>
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
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
