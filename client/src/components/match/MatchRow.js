import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import { DeleteOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  clicked: {
    marginBottom: 20,
    backgroundColor: "#f1f1f1",
  },
}));

export default function MatchRow(props) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root} id={0}>
        <CardActionArea onClick={() => props.handleToggle(props.index)}>
          <CardHeader
            avatar={<Avatar src={props.match.image} />}
            action={
              <IconButton onClick={() => props.handleDelete(props.index)}>
                <DeleteOutlined />
              </IconButton>
            }
            title={`${props.match.name}, ${
              new Date().getFullYear() - props.match.yob
            }`}
            subheader={props.match.breed}
          />
        </CardActionArea>
      </Card>
    </div>
  );
}
