import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' });
const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:3000/graphql' }));

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink as any,
    httpLink
);


// Création de l'instance Apollo Client
const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default apolloClient;
