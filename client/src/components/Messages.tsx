import React, { FC, useEffect } from "react";
import {
  List,
  ListItem,
  Grid,
  ListItemText,
  makeStyles,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_CHANNEL_MESSAGES,
  MESSAGE_ADDED,
  Query,
  QueryGetMessagesArgs,
  Subscription,
  SubscriptionMessageAddedArgs,
} from "../graphql";

interface IMessages {
  channelId: string;
}

export const Messages: FC<IMessages> = ({ channelId }) => {
  // Queries
  const { data, loading, refetch } = useQuery<Query, QueryGetMessagesArgs>(
    GET_CHANNEL_MESSAGES,
    {
      variables: {
        id: channelId,
      },
    }
  );

  const { data: subData } = useSubscription<
    Subscription,
    SubscriptionMessageAddedArgs
  >(MESSAGE_ADDED, {
    variables: {
      channelId,
    },
  });
 
  useEffect(() => {
    if (subData && subData.messageAdded) {
      console.log(subData.messageAdded)
      refetch();
    }
  }, [subData, refetch, channelId]);

  if (!channelId || loading) {
    return (
      <>
        <ListItem style={{ padding: "12px 16px" }}>
          <ListItemText>No Channel is selected</ListItemText>
        </ListItem>
        <Divider />
        <LayoutWrapper>
          {loading && <CircularProgress color="inherit" />}
        </LayoutWrapper>
      </>
    );
  }
  return (
    <>
      <ListItem style={{ padding: "12px 16px" }}>
        <ListItemText>Chat With Someone</ListItemText>
      </ListItem>
      <Divider />
      <LayoutWrapper>
        {data?.getMessages?.map((x, index) => (
          <ListItemText
            key={`message-${index}`}
            primary={x?.text}
            style={{ textAlign: "end" }}
          />
        ))}
      </LayoutWrapper>
    </>
  );
};

const useClasses = makeStyles(() => ({
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
}));

const LayoutWrapper: FC = ({ children }) => {
  const classes = useClasses();

  return (
    <List className={classes.messageArea}>
      <ListItem>
        <Grid container>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};
