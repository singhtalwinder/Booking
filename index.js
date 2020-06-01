import express from "express";
import graphqlHTTP from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";
import "./dotenv";
import typeDefs from "./src/schema";
import resolvers from "./src/resolvers";
import isAuth from "./src/middleware/isAuth";

const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(isAuth);

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

app.listen(4000, async () => {
	console.log("Running a GraphQL API server at localhost:4000/graphql");
});
