import { FC } from "react";
import {
  List,
  ListItem,
  Grid,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";

interface IMessages {
  channelId: string;
}

export const Messages: FC<IMessages> = ({ channelId }) => {
  if (!channelId) {
    return (
      <LayoutWrapper>
        <Typography>No Channel is selected</Typography>
      </LayoutWrapper>
    );
  }
  return (
    <LayoutWrapper>
      <ListItemText
        primary="Cool. i am good, let's catch up!"
        style={{ textAlign: "end" }}
      />
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
