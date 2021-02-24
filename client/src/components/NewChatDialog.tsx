import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  useTheme,
} from "@material-ui/core";
import React, { FC, useState } from "react";
import { Maybe, User } from "../graphql";

interface INewChatDialog {
  open: boolean;
  users: Maybe<User>[] | null | undefined;
  handleClose: () => void;
  createChat: (users: string[], title: string) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.findIndex((id) => id === name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const NewChatDialog: FC<INewChatDialog> = ({
  open,
  handleClose,
  createChat,
  users,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Chat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the chat title and select the users you want to chat with
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Chat Title"
          fullWidth
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            multiple
            fullWidth
            value={personName}
            onChange={handleChange}
            input={<Input />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250,
                },
              },
            }}
          >
            {users?.map((user) => (
              <MenuItem
                key={user?.id}
                value={user?.id}
                style={getStyles(user?.id || "", personName, theme)}
              >
                {user?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {createChat(personName, title)}} color="secondary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
