import React, { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CREATE_USER, Mutation, MutationCreateUserArgs } from "../graphql";

interface IForm {
  username: string;
  email: string;
}

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      margin: "10px 20px",
    },
  },
}));

export const Login: FC = () => {
  // Classes
  const classes = useStyles();

  // State
  const [form, setForm] = useState<IForm>({ email: "", username: "" });

  // Navigation
  const navigate = useNavigate();

  // Mutations
  const [createUser] = useMutation<Mutation, MutationCreateUserArgs>(
    CREATE_USER,
    {
      onCompleted: (data) => {
        data?.createUser?.id &&
          navigate("/chat", {
            state: {
              id: data?.createUser?.id,
            },
          });
      },
      onError: (error) => {
        console.error(error.name, error.message);
      },
    }
  );

  return (
    <Grid
      component={Paper}
      container
      alignItems="center"
      justify="center"
      style={{ width: "100%", height: "100%" }}
    >
      <Grid item xs={6} className={classes.root}>
        <TextField
          variant="outlined"
          fullWidth
          label="User Name"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.currentTarget.value })
          }
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
        />

        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
            createUser({
              variables: form,
            })
          }
        >
          Log in
        </Button>
      </Grid>
    </Grid>
  );
};
