import React, { FC, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Divider,
  List,
  CircularProgress,
} from "@material-ui/core";
import { useQuery } from "@apollo/client";

import { GET_ALL_CHANNELS, Query } from "../graphql";
import { MessageBox, Messages, Channels, UserInfo } from ".";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
});

export const Chat: FC = () => {
  // CSS
  const classes = useStyles();

  // State
  const [channel, setChannel] = useState("");
  const [userId, setUserId] = useState("");

  // Queries and Mutations
  const { data, loading } = useQuery<Query>(GET_ALL_CHANNELS);

  return (
    <div>
      <UserInfo setUserId={(userAccountId) => setUserId(userAccountId)} />
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
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
          <MessageBox />
        </Grid>
      </Grid>
    </div>
  );
};
