import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  header: {
    marginBottom: -20,
  },
}));

export default function MatchDetails(props) {
  const classes = useStyles();
  return (
    <div>
      <Card>
        <CardMedia
          image={props.matchedList?.[props.selectedDog]?.image}
          className={classes.media}
          title={props.matchedList?.[props.selectedDog]?.name}
        />
        <CardHeader
          className={classes.header}
          title={props.matchedList?.[props.selectedDog]?.name}
          subheader={props.matchedList?.[props.selectedDog]?.breed}
        />
        <CardContent>
          <Typography variant="subtitle2" className={classes.root}>
            {props.matchedList?.[props.selectedDog]?.description}
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 700, fontSize: 16 }}>
            Owner Details
          </Typography>
          Image on the left
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => console.log("see owner's details")}
            target="_blank"
          >
            Contact Aloha's Owner
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
