import { FC, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Divider,
  List,
  CircularProgress,
} from "@material-ui/core";
import { useLazyQuery, useQuery, useSubscription } from "@apollo/client";

import { GET_ALL_CHANNELS, MESSAGE_ADDED, Query } from "../graphql";
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
  const [userId, setUserId] = useState("fbb3d757-97ee-45eb-ad70-85c7bf90a481");

  // Queries and Mutations
  const { data, loading } = useQuery<Query>(GET_ALL_CHANNELS);
  const [xd] = useLazyQuery<Query>(GET_ALL_CHANNELS);
  const {
    data: xData,
    loading: xloading,
  } = useSubscription(MESSAGE_ADDED, {
    variables: {
      channelId: "",
    },
    onSubscriptionData: (data) => {
      xd();
    }
  });

  console.log(xloading, xData?.messageAdded);

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
          <MessageBox userId={userId} channelId={channel} />
        </Grid>
      </Grid>
    </div>
  );
};
