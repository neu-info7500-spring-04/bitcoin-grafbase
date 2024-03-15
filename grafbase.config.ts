import { graph, connector, config } from "@grafbase/sdk";
import * as dotenv from "dotenv";
dotenv.config();

// Welcome to Grafbase!
//
// Configure authentication, data sources, resolvers and caching for your GraphQL API.

const g = graph.Standalone();

const contentful = connector.GraphQL("bitquery", {
  url: "https://graphql.bitquery.io",
  headers: (headers) => {
    headers.set("X-API-KEY", g.env("BITQUERY_API_KEY"));
  },
});

g.datasource(contentful);

const coinapi = connector.OpenAPI("coinapi", {
  schema:
    "https://raw.githubusercontent.com/coinapi/coinapi-sdk/master/data-api/coinapi-marketdata-rest.yaml",
  headers: (headers) => {
    headers.set("X-CoinAPI-Key", g.env("COINAPI_API_KEY"));
  },
});

g.datasource(coinapi);

//Configuring bitnodes connectors
const bitnode = connector.OpenAPI("bitnodes", {
  schema:
    "https://raw.githubusercontent.com/neu-info7500-spring-04/Bitnodes-API-Schema/e46f130cec12627f6a5f9d55053e4098736ec3e3/Bitnodes-Snapshot.yml",
  url: "https://bitnodes.io/api/v1/",
});

g.datasource(bitnode);

export default config({
  graph: g,
  // Authentication - https://grafbase.com/docs/auth
  auth: {
    // OpenID Connect
    // const oidc = auth.OpenIDConnect({ issuer: g.env('OIDC_ISSUER_URL') })
    // providers: [oidc],
    rules: (rules) => {
      rules.public();
    },
  },
  // Caching - https://grafbase.com/docs/graphql-edge-caching
  // cache: {
  //   rules: [
  //     {
  //       types: ['Query'], // Cache everything for 60 seconds
  //       maxAge: 60,
  //       staleWhileRevalidate: 60
  //     }
  //   ]
  // }
});
