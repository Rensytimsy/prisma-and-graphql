import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { dbConnection } from "@/lib/dbConnection";
import { resolvers } from "@/gqlReslover/resolver";
import { typeDefs } from "@/graphql/products";



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);
export { handler as GET, handler as POST };
