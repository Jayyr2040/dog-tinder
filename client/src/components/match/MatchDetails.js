import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Box } from "@material-ui/core";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 12, 3),
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    marginTop: theme.spacing(2),
  },
}));

export default function MatchDetails(props) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const showOwnerContact = () => {
    setOpenModal(true);
    console.log(props.ownerDetails?.[0]?.email);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
          <Typography variant="paragraph" className={classes.root}>
            {props.matchedList?.[props.selectedDog]?.description}
          </Typography>
        </CardContent>
        <CardHeader
          avatar={<Avatar src={props.ownerDetails?.[0]?.image} />}
          title={
            <Typography variant="h6" style={{ fontWeight: 700, fontSize: 16 }}>
              Owned by {props.ownerDetails?.[0]?.fullName}
            </Typography>
          }
          subheaderTypographyProps={{ variant: "subtitle2" }}
          subheader={`Good to meet in: ${props.ownerDetails?.[0]?.location.join(
            ", "
          )}`}
        />
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={showOwnerContact}
            target="_blank"
          >
            Contact Aloha's Owner
          </Button>
        </CardActions>
      </Card>
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <Typography variant="h5" align="center">
              {props.ownerDetails?.[0]?.fullName}
            </Typography>
            <Box display="flex" justifyContent="center" className={classes.box}>
              <Avatar
                src={props.ownerDetails?.[0]?.image}
                style={{ height: "70px", width: "70px" }}
              />
            </Box>
            <p id="transition-modal-description">
              <Typography align="center">
                Reach me at
                <br /> <b>{props.ownerDetails?.[0]?.email}</b>
              </Typography>
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
