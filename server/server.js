// #1 Create a NodeJS server that listens on port 3000 
// and responds to the route "/hello" with the message "Hello World!".

// import koa framework depenancy
import Koa from 'koa';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import { ApolloServer } from 'apollo-server-koa';

import config from './config';
import routes from './routes';
import responseMiddleware from './middlewares/response';

import typeDefs from './graphql/schemas';
import resolvers from './graphql/resolvers';

// creating koa app instance
const app = new Koa();

// attached test middleware
app.use(responseMiddleware);
// attach cors middleware
app.use(cors());
// attach bodyparser middleware
app.use(bodyParser({ enableTypes: ['json', 'text'] }));

// apllo server error formater
const formatError = (error) => {
	// Perform any custom formatting or logging here
	console.error(error);
	// Return the formatted error object
	return error;
};

// Create Apollo Server with Koa
const apolloServer = new ApolloServer({ typeDefs, resolvers, formatError });
await apolloServer.start();
apolloServer.applyMiddleware({app});

// attached defined router into app
app.use(routes.routes());

// configure allowed method
app.use(routes.allowedMethods(['GET', 'POST']));

// listen app on port 3000
const port = config.get('port') || 3000;
app.listen(port, () => {
	console.log(`listing on ${port}`);
});
