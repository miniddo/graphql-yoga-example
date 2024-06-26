import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import { usersInfo, moneyInfo } from "./mock.js";

const typeDefs = `
  type Profile {
    uid: Int
    name: String
    email: String
    createdAt: String
  }

  type UserInfo {
    message: String
    code: Int
    profile: Profile
    responseAt: String
  }

  type MoneyInfo {
    message: String
    code: Int
    uid: Int
    total: Int
  }

  type Query {
    hello: String
    userInfo(uid: Int!): UserInfo
    userList: [UserInfo]
    moneyInfo: MoneyInfo
  }

  type Mutation {
    createUser(name: String, email: String): UserInfo
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello Friend!",
    userInfo: (_, { uid }) => {
      if (![1, 2, 3].includes(uid)) {
        const error = new Error();
        error.extensions = { code: "USER_NOT_FOUND" };
        throw error;
      } else {
        return usersInfo.find((user) => user.profile.uid === uid);
      }
    },
    userList: () => usersInfo,
    moneyInfo: () => moneyInfo,
  },
  Mutation: {
    createUser: (_, { name, email }) => {
      const user = {
        message: "success",
        code: 1,
        profile: {
          uid: 3,
          name,
          email,
          createdAt: new Date().toISOString(),
        },
        responseAt: new Date().toISOString(),
      };

      usersInfo.push(user);
      return user;
    },
  },
};

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
