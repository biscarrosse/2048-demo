import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Game from "./components/Game/Game";
import Layout from "./components/Layout/Layout";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  //useQuery,
  gql,
} from "@apollo/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new ApolloClient({
  uri: "https://need-a-working-backend-api-here.com/graphiql",
  // FIXME: no graphiql there
  // assuming this API would work, I could access provided data via
  // GET_DATA query - example below
  // Also see usage as presented in "src/components/Layout/Layout.tsx"
  cache: new InMemoryCache(),
});

export const GET_DATA = gql`
  query GetData {
    exampleKey {
      id
      exampleNestedKey
      exampleNestedKey2
      exampleNestedKey3
    }
  }
`;

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Layout>
        <Game />
      </Layout>
    </ApolloProvider>
  </React.StrictMode>
);
