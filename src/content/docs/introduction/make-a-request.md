---
title: Make a Request
description: A guide on how to make a request to the Termly API
---

When making requests to the Termly API, the host to use is api.termly.io. It is only accessible via https. Please note that your requests are made against a live account. If you need a test account for integration purposes, at this time please reach out to support@termly.io to ask for one to be setup.

## All Requests
All requests to `api.termly.io` must include the following two HTTP headers:

1. X-Termly-Timestamp
2. Authorization

## Node.js API Authentication Example

Follow these steps to get the example up and running on your local machine.

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



## X-Termly-Timestamp

The value of `X-Termly-Timestamp` is a UTC timestamp with the following format ([same as GNU date](https://man7.org/linux/man-pages/man1/date.1.html)) `%Y%m%dT%H%M%SZ`.

```X-Termly-Timestamp: 20201017T020928Z```

We use ```X-Termly-Timestamp``` instead of the more common ```Date``` header to eliminate intermediary proxies from changing the value and to control the format precisely.

This timestamp is also used as part of the request processing pipeline. If the date isn't valid, we will not process the request. If the timestamp is valid and not within 15 minutes of the current time, the request will not be processed. The timestamp is also included in signatures.

## Authorization

The value for ```Authorization``` must be:

```Authorization: TermlyV1, PublicKey=<partner public key>, Signature=<calculated signature>```

- [Click here to read about ```PublicKey```](/other/public-key)
- [Click here to read about ```Signature```](/other/signature)

## GET requests

In addition to the 2 headers described above, a ```GET``` request can be made with a ```query``` or ```scrolling``` query string parameter. These 2 keys are mutually exclusive. A ```GET``` request will be rejected if both are found.

- [Click here to read about ```query```](/other/query)
- [Click here to read about ```paging```](/other/results-paging)

## DELETE requests

While similar to a ```GET``` (they both don't have a payload), a ```DELETE``` request may only have the ```query``` query string parameter. ```DELETE``` does not support scrolling. It will delete all records matching the query.

## Batch request processing

Creating and updating endpoints allow for multiple objects to be sent in. When processing these requests, the API will do partial processing if it can. So if you send in six and two fail validation, we'll continue to process the remaining four. In this situation, we return an HTTP status code of ```207``` to indicate multiple statuses. You'll need to go through each returned object to see if it was successful or not. If all the objects fail validation, you will receive a status of ```400``` indicating that the entire batch was bad.

There is one exception to this rule. For authorization, it is all or nothing. For example, you send in six accounts, but your API key only has access to five of them. In this situation, we do not process any of them. The entire request is failed with a ```403``` status code.
