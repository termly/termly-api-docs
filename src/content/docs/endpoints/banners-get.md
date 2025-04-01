---
title: Banners
description: A guide on how to use the Banners endpoint
---

Banners are the interface to managing cookies, they are displayed when a visitor loads one of our customer's websites.

## Read (GET)

#### Overview

Retrieve all banners for the specified query. The query has the following shape:

### Request

```json
[
  {
    "account_id": "<string>",
    "ids": [
    "<string>"
    ]
  }
]
```


At least 1 object with an `account_id` must be provided. If you would like to retrieve all of the banners for the account omit the `ids` parameter. If the `ids` field is sent it must have 1 or more items. Once constructed the object must be URL encoded and be the value for the `query` parameter.

### Paging

All ```GET``` requests are subject to paging

#### Paging Rules

Result sets with more than 25 results will be automatically partitioned into groups, and will follow these rules:

- If not specified, the group size will be 25;
- The group size can be specified along with the query objects;
- The group size is limited to a maximum of 25;
- The group size is limited to a minimum of 1;

The response will contain data that allows paging through the results. The JSON shape is:

```json
{
  "next_results": "<string>",
  "previous_results": "<string>"
}
```

- `next_results` url to next page in the set (null if there is not a next page)
- `previous_results` url to previous page in the set (null if there is not a previous page)

#### Paging Parameters Object

It is possible to customize the paging parameters for each query. If you want to customize the settings, include the following object in your request:

```json
{
  "group_size": "<number>"
}
```

This will return groups of the specified size. Please note the following rules:

- If not specified, the group size will be 25;
- The group size is limited to a maximum of 25;
- The group size is limited to a minimum of 1;
- If a number outside this range is specified the default will apply

##### Specifying the custom group sizes

To specify the custom group sizes, include the following object in your request:

```json
[
  {
    "paging": {
      "group_size": 20
    },
    "account_id": "<string>",
    "website_id": "<string>",
    "ids": [
      "<string>"
    ]
  }
]
```

##### Sorting

At this time the API sorts all results in descending order on the creation date so the most recent record is first in the results.


