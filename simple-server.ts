import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto";

/*
*Under fetching
- Rota HTTP que retorna dados de menos

*Over fetching
- Rota HTTP retorna mais dados que precisamos
*/


/*
* Schema first approach
* Code first
*/

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`;

interface User {
  id: string;
  name: string;
}

const users: User[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users;
      },
    },

    Mutation: {
      createUser: (_, args) => {
        const user = {
          id: randomUUID(),
          name: args.name,
        };

        users.push(user);

        return user;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(url);
});
