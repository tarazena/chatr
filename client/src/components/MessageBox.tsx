import { FC } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { Send } from "@material-ui/icons";

export const MessageBox: FC = () => {
  return (
    <Grid container style={{ padding: "20px" }}>
      <Grid item xs={11}>
        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
      </Grid>
      <Grid item xs={1}>
        <IconButton color="primary" aria-label="add">
          <Send />
        </IconButton>
      </Grid>
    </Grid>
  );
};
