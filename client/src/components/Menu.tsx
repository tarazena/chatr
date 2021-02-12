import React, { FC } from "react";
import {
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { ChevronLeft, Inbox, Mail } from "@material-ui/icons";
import { drawerWidth } from "../constants";
import { useQuery } from "@apollo/client";
import { GET_ALL_CHANNELS, Query } from "../graphql";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

interface IMenu {
  open: boolean;
  handleClose: () => void;
}

export const Menu: FC<IMenu> = ({ open, handleClose }) => {
  const { data, loading } = useQuery<Query>(GET_ALL_CHANNELS);
  console.log(data, loading);
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleClose}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      {loading ? (
        <Grid container>
          <CircularProgress />
        </Grid>
      ) : (
        <List>
          {data?.getAllChannels?.map((x, index) => (
            <ListItem button key={`${x?.id}`}>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={x?.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Drawer>
  );
};
