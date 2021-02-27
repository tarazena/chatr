# Chatr - A sample app for using GraphQL Subscriptions + Postgres Subscriptions
The Purpose of this Repo is to demo the features of GraphQL Subscriptions, and PostgreSQL Listen/Notify (PubSub) Feature.

## Architecture

The repo consists of 4 directories
```
Chatr/
┣ analytics/
┣ client/
┣ notifications/
┣ server/
```
Layout of the architecture
![Architecture Layout](./Chatr.jpeg)

### Analytics
- TypeScript Script
- Push data from events to analytics table/db (just emitting logs for now), can be repurposed to push data to Any Datastore.
- Running on a docker-compose file

### Notifications
- TypeScript Script
- Handles customer notifications, useful if we want to trigger side effects like sending an SMS after successful registration, etc
- Running on a docker-compose file

### Server
- TypeScript Server
- Handling traffic between client and DB, uses [Prisma](https://www.prisma.io/) to communicate to the DB, also uses [pg](https://www.npmjs.com/package/pg) to use the Notify/Listen feature.
- Using [Apollo Server](https://www.apollographql.com/docs/apollo-server/) for the GraphQL Server
- Running on a docker-compose file


### Client
- A simple react app, using Material UI for the chat
- uses [Apollo Client](https://www.apollographql.com/docs/react/) to communicate with the server.


## Requirements
- Docker

## How to use
- Run `docker-compose up` (do no include `-d` because its needed to view the logs, other wise feel free inspect the docker images individually) in the root directory of the repo, this command will create a PostgreSQL DB and will spin up the servers along with the client.

- Open two (or more) your browser tabs, head to `http://localhost:3000` to lunch the client up, you can type any user/email (User 1/User 1 works), the users names/emails are unique so you should name them in a unique way.

- In one of the browser windows, click on the + button to create a chat with the other user(s)

- Once the chat is created, you will see that the other browser windows already fetched the data, and also there are some events that got fired in the notifications/analytics servers as well.