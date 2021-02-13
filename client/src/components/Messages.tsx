import { FC } from "react";
import {
  List,
  ListItem,
  Grid,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_CHANNEL_MESSAGES, Query, QueryGetMessagesArgs } from "../graphql";

interface IMessages {
  channelId: string;
}

export const Messages: FC<IMessages> = ({ channelId }) => {
  // Queries
  const { data, loading } = useQuery<Query, QueryGetMessagesArgs>(
    GET_CHANNEL_MESSAGES,
    {
      variables: {
        id: channelId,
      },
    }
  );

  if (!channelId || loading) {
    return (
      <LayoutWrapper>
        <Typography>No Channel is selected</Typography>
      </LayoutWrapper>
    );
  }
  return (
    <LayoutWrapper>
      {data?.getMessages?.map((x, index) => (
        <ListItemText
          key={`message-${index}`}
          primary={x?.text}
          style={{ textAlign: "end" }}
        />
      ))}
    </LayoutWrapper>
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
