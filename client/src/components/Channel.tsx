import { ListItem, ListItemText } from "@material-ui/core";
import React, { FC } from "react";
import { Channel, Maybe } from "../graphql";

interface IChannel {
  channels: Maybe<Array<Maybe<Channel>>> | undefined;
  setSelectedChannel: (channelId: string) => void;
}

export const Channels: FC<IChannel> = ({ setSelectedChannel, channels }) => {
  return (
    <>
      {channels?.map((channel, index) => (
        <ListItem
          button
          key={`chat-${index}`}
          onClick={() => channel && setSelectedChannel(channel?.id)}
        >
          <ListItemText>{channel?.name}</ListItemText>
        </ListItem>
      ))}
    </>
  );
};
