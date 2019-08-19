import React, { Component } from "react";

import {
  Avatar,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid,
  ListItemSecondaryAction,
  Divider
} from "@material-ui/core";

import { FiberManualRecordRounded } from "@material-ui/icons";

class ListUnRead extends Component {
  render() {
    return (
      <div>
        <ListItem button style={{ background: "#dedede" }}>
          <ListItemIcon>
            {/* Change picture follow here */}
            <Avatar>{`${this.props.item.avatar}`}</Avatar>
          </ListItemIcon>
          <Hidden only={["sm", "md"]}>
            <ListItemText
              primary={`${this.props.item.name} ${this.props.item.surname}`}
              secondary={
                <React.Fragment>
                  <Typography variant="body2">{`${
                    this.props.item.message
                  }`}</Typography>
                  <Typography
                    variant="caption"
                    style={{ fontStyle: "italic" }}
                  >{`${this.props.item.date}`}</Typography>
                </React.Fragment>
              }
            />
          </Hidden>
          <Hidden only={["xs", "xl", "lg"]}>
            <ListItemText
              primary={
                <React.Fragment>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={3}>
                      <Typography>{`${this.props.item.name} ${
                        this.props.item.surname
                      }`}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography style={{ color: "#b0b0b0" }}>{`${
                        this.props.item.message
                      }`}</Typography>
                    </Grid>
                  </Grid>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    style={{ fontStyle: "italic" }}
                  >{`${this.props.item.date}`}</Typography>
                </React.Fragment>
              }
            />
          </Hidden>
          <ListItemSecondaryAction>
            <FiberManualRecordRounded
              style={{ color: "#00897b", fontSize: 15 }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

export default ListUnRead;
