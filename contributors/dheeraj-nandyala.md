# Configuring GrafBase SDK with Blockstream Connector

## Overview
This README.md file provides a brief explanation of how to configure the GrafBase SDK with a Blockstream connector. The provided code snippet demonstrates the setup process.


## Prerequisites
    npm install

## Explanation:
Blockstream Connector Setup: A Blockstream connector is created using `connector.OpenAPI()`. This connector fetches data from the Blockstream Liquid API. It requires a schema definition and a URL to the API.
The configuration is exported using `config()`. It includes the configured graph (`g`) and authentication rules. In this case, `rules.public()` is used, indicating that no authentication is required to access the data.

## Run Command:
npx grafbase dev