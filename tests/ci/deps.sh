#!/bin/bash -ex

# Auth DB
npm i mozilla/fxa-auth-db-mysql
cd node_modules/fxa-auth-db-mysql
LOG_LEVEL=error node ./bin/mem.js &
cd ../..

# Auth
npm i mozilla/fxa-auth-server
cd node_modules/fxa-auth-server
node ./scripts/gen_keys.js
npm start &> /dev/null &
cd ../..

# OAuth

npm i mozilla/fxa-oauth-server
cd node_modules/fxa-oauth-server
LOG_LEVEL=error NODE_ENV=dev node ./bin/server.js &
cd ../..

# Profile
npm i mozilla/fxa-profile-server
cd node_modules/fxa-profile-server
npm i
# issue https://github.com/mozilla/fxa-profile-server/issues/138
npm i rimraf@^2.2.8
LOG_LEVEL=error NODE_ENV=dev npm start &
cd ../..

# Verifier

npm i vladikoff/browserid-verifier#http
cd node_modules/browserid-verifier
npm i vladikoff/browserid-local-verify#http
LOG_LEVEL=error PORT=5050 node server.js &
cd ../..
