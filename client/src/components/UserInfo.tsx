import { useMutation } from "@apollo/client";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import React, { FC, useState } from "react";

import { Mutation, MutationCreateUserArgs, CREATE_USER } from "../graphql";

interface IUserInfo {
  setUserId: (userId: string) => void;
}

interface IFormInfo {
  name: string;
  email: string;
}

export const UserInfo: FC<IUserInfo> = ({ setUserId }) => {
  const [formInfo, setFormInfo] = useState<IFormInfo>({ email: "", name: "F" });

  const [createUser] = useMutation<Mutation, MutationCreateUserArgs>(
    CREATE_USER,
    {
      onCompleted: (data) => {
        console.log(data);
        data?.createUser?.id && setUserId(data?.createUser?.id);
      },
      onError: (error) => {
        console.error(error.name, error.message);
      },
    }
  );

  return (
    <Grid container>
      <Grid
        component={Paper}
        container
        item
        xs={12}
        style={{
          border: "1px solid lightblue",
          padding: 10,
          margin: "10px 0",
        }}
      >
        <Grid item xs={5}>
          <TextField
            label="User name"
            onChange={(e) => {
              setFormInfo({ ...formInfo, name: e.currentTarget.value });
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="email"
            onChange={(e) => {
              setFormInfo({ ...formInfo, email: e.currentTarget.value });
            }}
          />
        </Grid>
        <Grid item xs>
          <Button
            variant="outlined"
            onClick={() => {
              createUser({
                variables: { name: formInfo.name, email: formInfo.email },
              });
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
