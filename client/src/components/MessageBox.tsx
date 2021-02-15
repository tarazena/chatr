import { FC, useState } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import {
  CREATE_MESSAGE,
  Mutation,
  MutationCreateMessageArgs,
} from "../graphql";

interface IMessageBox {
  userId: string;
  channelId: string;
}

export const MessageBox: FC<IMessageBox> = ({ channelId, userId }) => {
  // State
  const [message, setMessage] = useState("");

  // Mutations
  const [createMessage] = useMutation<Mutation, MutationCreateMessageArgs>(
    CREATE_MESSAGE,
    {
      onCompleted: () => {
        setMessage("");
      },
      onError: (error) => {
        console.error(error.name, error.message);
      },
    }
  );

  const handleChange = (e: any) => {
    setMessage(e.currentTarget.value);
  };

  return (
    <Grid container style={{ padding: "20px" }}>
      <Grid item xs={11}>
        <TextField
          id="outlined-basic-email"
          label="Type Something"
          fullWidth
          value={message}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton
          color="primary"
          aria-label="add"
          onClick={() =>
            createMessage({
              variables: {
                channelId,
                userId,
                text: message,
              },
            })
          }
        >
          <Send />
        </IconButton>
      </Grid>
    </Grid>
  );
};
