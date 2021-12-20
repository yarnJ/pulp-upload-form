import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import { userResolver } from "./resolvers/user-resolver";
import { userSchema } from "./schemas/user-schema";

const schema = makeExecutableSchema({
  typeDefs: userSchema,
  resolvers: userResolver,
});

const apolloServer = new ApolloServer({ schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
