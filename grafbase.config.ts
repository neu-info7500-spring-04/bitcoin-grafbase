import { graph, connector, config } from '@grafbase/sdk'
import * as dotenv from 'dotenv';
dotenv.config();

// Welcome to Grafbase!
//
// Configure authentication, data sources, resolvers and caching for your GraphQL API.

const g = graph.Standalone();

const mempool = connector.OpenAPI('mempool', {
  schema: 'https://raw.githubusercontent.com/neu-info7500-spring-04/bitcoin-explorer/Danielnewheart_OpenAPI/openAPI.yaml',
  url: "https://mempool.space/api/v1",
});

g.datasource(mempool);

const contentful = connector.GraphQL('bitquery', {
  url: "https://graphql.bitquery.io",
  headers: headers => {
    headers.set('X-API-KEY', g.env("BITQUERY_API_KEY"))
  },
})

g.datasource(contentful)

const coinapi = connector.OpenAPI('coinapi', {
  schema: 'https://raw.githubusercontent.com/coinapi/coinapi-sdk/master/data-api/coinapi-marketdata-rest.yaml',
  headers: headers => {
    headers.set('X-CoinAPI-Key', g.env("COINAPI_API_KEY"))
  },
})

g.datasource(coinapi)
export default config({
  graph: g,
  // Authentication - https://grafbase.com/docs/auth
  auth: {
    // OpenID Connect
    // const oidc = auth.OpenIDConnect({ issuer: g.env('OIDC_ISSUER_URL') })
    // providers: [oidc],
    rules: (rules) => {
      rules.public()
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
})
