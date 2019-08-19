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
  Divider
} from "@material-ui/core";

class ListRead extends Component {
  render() {
    //noti data

    return (
      <div>
        <ListItem button>
          <ListItemIcon>
            {/* Change picture follow here */}
            <Avatar>{`${this.props.item.avatar}`}</Avatar>
          </ListItemIcon>
          <ListItemText
            primary={`${this.props.item.name} ${this.props.item.surname}`}
            secondary={
              <React.Fragment>
                {`${this.props.item.message}`}
                <Typography
                  variant="caption"
                  style={{ fontStyle: "italic" }}
                >{`${this.props.item.date}`}</Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
      </div>
    );
  }
}

export default ListRead;
