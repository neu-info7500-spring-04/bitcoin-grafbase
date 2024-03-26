import { graph, connector, config } from "@grafbase/sdk";
import * as dotenv from "dotenv";
dotenv.config();

// Welcome to Grafbase!
//
// Configure authentication, data sources, resolvers and caching for your GraphQL API.

const g = graph.Standalone();

const mempool = connector.OpenAPI("mempool", {
  schema:
    "https://raw.githubusercontent.com/neu-info7500-spring-04/bitcoin-grafbase/main/openAPI.yaml",
  url: "https://mempool.space/api/v1",
});

g.datasource(mempool);

// Author: porter-wang
const mempoolRecentTransactions = connector.OpenAPI("mempoolRecentTransactions", {
  schema:
        "https://raw.githubusercontent.com/neu-info7500-spring-04/bitcoin-grafbase/main/openAPI.yaml",
  url: "https://mempool.space/api",
});

g.datasource(mempoolRecentTransactions);

//Don't chnage this schema. It is specifically for utxo
const mempoolutxo = connector.OpenAPI("mempoolutxo", {
  schema:
    "https://raw.githubusercontent.com/Shaiz-Akhtar/graphbaseyaml/main/test.yaml",
  url: "https://mempool.space/api/",
});

g.datasource(mempoolutxo);

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


const blockstreamLatestBlocks = connector.OpenAPI('blockstreamLatestBlocks', {
  schema: 'https://raw.githubusercontent.com/kirubagarthiagarajan/blockstreamSchema/main/blockstreamSchema.yaml',
  url: 'https://blockstream.info/api',
});

g.datasource(blockstreamLatestBlocks);


const blockstreamTip = connector.OpenAPI('blockstreamTip', {
  schema: 'https://raw.githubusercontent.com/kirubagarthiagarajan/blockstreamSchema/main/blockStreamTip.yaml',
  url: 'https://blockstream.info/api',
});

g.datasource(blockstreamTip);

const blockchairapi = connector.OpenAPI('blockchairapi', {
  schema: 'https://raw.githubusercontent.com/neu-info7500-spring-04/Blockchair-API-Schema/main/Blockchair.openapi.yaml',
  // headers: headers => {
  //   headers.set('X-CoinAPI-Key', g.env("COINAPI_API_KEY"))
  // },
})

g.datasource(blockchairapi)

const blockChainApi = connector.OpenAPI('blockchainapi',{
  schema: 'https://raw.githubusercontent.com/neu-info7500-spring-04/neu-info7500-spring-04-BlockChain-API-Schema/main/blockChainSchema.yaml'
});
g.datasource(blockChainApi)

const cryptoapis = connector.OpenAPI('cryptoapis', {
  schema: 'https://raw.githubusercontent.com/Romil-Tiwari1/Config-Spec-Yaml/main/cryptoapis_spec.yaml', // You need to provide an OpenAPI spec for your CryptoAPIs endpoint.
  url: "https://rest.cryptoapis.io/v2",
  headers: headers => {
    headers.set('X-API-Key', g.env("CRYPTOAPIS_API_KEY")) // Make sure to replace with your actual API key name
  },
})

g.datasource(cryptoapis)


const blockstream = connector.OpenAPI('blockstream', {
  schema: 'https://raw.githubusercontent.com/dheeru99/liquid_transactions/main/transactions/liquid_transactions_grafbase/openAPI.yaml',
  url: "https://blockstream.info/liquid/api/",
});

g.datasource(blockstream);


const liquidAsset = connector.OpenAPI('asset', {
  schema: 'https://raw.githubusercontent.com/5060Rekha/Assets/main/liquid_assets_grafbase/openAPI.yaml',
  url: "https://blockstream.info/liquid/api/",
});
g.datasource(liquidAsset);

const mempoolConnector = connector.OpenAPI('mempoolBitcoin', {
  schema: 'https://raw.githubusercontent.com/SidharthReddy11265/sid_bitcoin_graphbase/main/openAPI.yaml',
  url: "https://mempool.space/api/",
});

g.datasource(mempoolConnector);


const ethereum = connector.OpenAPI('ethereum', {
  schema: 'https://raw.githubusercontent.com/RanjithKumar839/demo/main/demo.yaml',
  url: "https://rest.cryptoapis.io/v2/",
  headers: headers => {
    headers.set('X-Api-Key', g.env("CRYPTOAPIS_API_KEY"))
  },
});

g.datasource(ethereum);

const bitcoin = connector.OpenAPI('bitcoin', {
  schema: 'https://raw.githubusercontent.com/neu-info7500-spring-04/bitcoinassetdata/main/demo.yml',
  url: "https://rest.cryptoapis.io/v2/",
  headers: headers => {
    headers.set('X-Api-Key', g.env("CRYPTOAPIS_API_KEY"))
  },
});

g.datasource(bitcoin);

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
