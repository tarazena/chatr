import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  users: Array<User>;
  messages: Array<Maybe<Message>>;
};

export type Query = {
  __typename?: 'Query';
  getChannel?: Maybe<Channel>;
  getAllChannels?: Maybe<Array<Maybe<Channel>>>;
  getMessages?: Maybe<Array<Maybe<Message>>>;
  getUser?: Maybe<User>;
};


export type QueryGetChannelArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetMessagesArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChannel?: Maybe<Channel>;
  createMessage?: Maybe<Message>;
  createUser?: Maybe<User>;
};


export type MutationCreateChannelArgs = {
  name?: Maybe<Scalars['String']>;
};


export type MutationCreateMessageArgs = {
  channelId?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['String'];
  text: Scalars['String'];
  author: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
};
