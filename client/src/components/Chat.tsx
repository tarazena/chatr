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
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";

import {
  CREATE_CHANNEL,
  GET_ALL_CHANNELS,
  GET_USERS,
  Query,
  Mutation,
  MutationCreateChannelArgs,
} from "../graphql";
import { MessageBox, Messages, Channels } from ".";
import { useLocation, useNavigate } from "react-router-dom";
import { NewChatDialog } from "./NewChatDialog";

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
  // Location State
  const routerState = useLocation();
  const navigate = useNavigate();
  // State
  const [channel, setChannel] = useState("");
  const [userId] = useState((routerState.state as IRouteState).id);

  if (!userId) {
    navigate("/");
  }

  const [showCreateChannel, setShowCreateChannel] = useState(false);

  // Queries and Mutations
  const getAllChannels = useQuery<Query>(GET_ALL_CHANNELS);
  const getAllUsers = useQuery<Query>(GET_USERS);
  const [createChat] = useMutation<Mutation, MutationCreateChannelArgs>(
    CREATE_CHANNEL,
    {
      onCompleted: (data) => {
        setShowCreateChannel(false);
        getAllChannels.refetch();
        data.createChannel && setChannel(data.createChannel.id);
      },
      onError: (e) => {
        console.warn(e);
      },
    }
  );

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <NewChatDialog
        users={getAllUsers.data?.getUserAll}
        open={showCreateChannel}
        handleClose={() => setShowCreateChannel(false)}
        createChat={(users, title) => {
          createChat({
            variables: {
              users,
              name: title,
            },
          });
        }}
      />
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
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  onClick={() => setShowCreateChannel(true)}
                >
                  New Chat
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            {getAllChannels.loading ? (
              <CircularProgress />
            ) : (
              <Channels
                channels={getAllChannels.data?.getAllChannels}
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
