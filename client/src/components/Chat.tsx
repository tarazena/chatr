import React, { FC, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Divider,
  List,
  CircularProgress,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useQuery } from "@apollo/client";

import { GET_ALL_CHANNELS, Query } from "../graphql";
import { MessageBox, Messages, Channels } from ".";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    padding: "50px",
  },
  table: {
    minWidth: 650,
  },
  chatSection: {
    // width: "100%",
    // height: "80vh",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
});

interface IRouteState {
  id: string;
}

export const Chat: FC = () => {
  // CSS
  const classes = useStyles();

  // State
  const [channel, setChannel] = useState("");
  const routerState = useLocation();
  const [userId] = useState((routerState.state as IRouteState).id);

  // Queries and Mutations
  const { data, loading } = useQuery<Query>(GET_ALL_CHANNELS);

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid
        xs={12}
        item
        container
        component={Paper}
        className={classes.chatSection}
      >
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem>
              <ListItemText>Chat Channels</ListItemText>
            </ListItem>
            <Divider />
            {loading ? (
              <CircularProgress />
            ) : (
              <Channels
                channels={data?.getAllChannels}
                setSelectedChannel={(channel) => setChannel(channel)}
              />
            )}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Messages channelId={channel} />
          <Divider />
          <MessageBox userId={userId} channelId={channel} />
        </Grid>
      </Grid>
    </Grid>
  );
};
