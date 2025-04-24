---
title: Node.js Authentication Example
description: A Node.js example of how to make a request to the Termly API
---

Follow these steps to get the example up and running on your local machine.

### Prerequisites

You will need to add the following files to your project:

#### env.example

```bash
PUBLIC_KEY=YOUR_PUBLIC_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
```

#### package.json

```json
{
  "name": "node",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.6.7",
    "dotenv": "^16.4.2",
    "express": "^4.18.2"
  }
}
```

#### server.js

```javascript
import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/test-auth', async (req, res) => {
    try {
        const apiKey = process.env.PUBLIC_KEY;
        const privateKey = process.env.PRIVATE_KEY;

        const termlyTimestamp = getTermlyTimestamp();
        const authHeader = createAuthHeader(apiKey, privateKey, termlyTimestamp, 'GET', '', '/v1/authn', '');
        console.log(`Authorization Header: ${authHeader}`);

        const response = await axios.get('https://api.termly.io/v1/authn', {
            headers: {
                'Authorization': authHeader,
                'X-Termly-Timestamp': termlyTimestamp
            }
        });

        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error making API call');
    }
});

function getTermlyTimestamp() {
    const now = new Date();
    return `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
}

function pad(n) {
    return n < 10 ? `0${n}` : `${n}`;
}

function createDerivedSecretKey(privateKey, termlyTimestamp) {
    let apiSecret0 = crypto.createHmac('sha256', privateKey).update(termlyTimestamp).digest();
    let apiSecret1 = crypto.createHmac('sha256', apiSecret0).update('default').digest();
    return crypto.createHmac('sha256', apiSecret1).update('termly').digest();
}

function createAuthHeader(apiKey, privateKey, termlyTimestamp, method, body, path, query) {
    body = body || '';
    const derivedSecretKey = createDerivedSecretKey(privateKey, termlyTimestamp);
    const host = 'api.termly.io';
    const canonicalRequest = createCanonicalRequest(method, host, path, query, termlyTimestamp, body);
    const signature = crypto.createHmac('sha256', derivedSecretKey).update(canonicalRequest).digest('hex');

    return `TermlyV1, PublicKey=${apiKey}, Signature=${signature}`;
}


function createCanonicalRequest(method, host, path, query, termlyTimestamp, requestBody) {
    const bodyHash = crypto.createHash('sha256').update(requestBody || '').digest('hex');
    return `${method}\n${host}\n${path}\n${query}\n${termlyTimestamp}\n${bodyHash}`;
}

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```
### Steps

1. **Install dependencies:**
``` bash
npm install
```

2. **Set up environment variables:**

Copy the .env.example file to a new file named .env and update it with your API credentials:

``` bash
cp .env.example .env
```
Then, open .env and replace `YOUR_PUBLIC_KEY` and `YOUR_PRIVATE_KEY` with your actual API public and private keys.

## Running the Example
To run the example, execute:

``` bash
npm start
```
This will start the server.

With the server running, visit http://localhost:3000/test-auth to make a test API request and verify the successful authentication.