import React, { FC } from "react";
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
  User,
} from "../graphql";

interface IMessages {
  channelId: string;
  userId: string;
  users?: User[];
}

export const Messages: FC<IMessages> = ({ channelId, userId, users }) => {
  // Queries
  const { data, loading, refetch } = useQuery<Query, QueryGetMessagesArgs>(
    GET_CHANNEL_MESSAGES,
    {
      variables: {
        id: channelId,
      },
      fetchPolicy: "network-only",
    }
  );

  useSubscription<Subscription, SubscriptionMessageAddedArgs>(MESSAGE_ADDED, {
    variables: {
      channelId,
    },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data?.messageAdded?.id === channelId) {
        refetch();
      }
    },
  });

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
        <ListItemText>
          Chat With {users?.map((x) => x.name).join(", ")}
        </ListItemText>
      </ListItem>
      <Divider />
      <LayoutWrapper>
        {data?.getMessages?.map((x, index) => (
          <ListItemText
            key={`message-${index}`}
            primary={x?.text}
            style={{ textAlign: x?.author.id === userId ? "end" : "start" }}
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
