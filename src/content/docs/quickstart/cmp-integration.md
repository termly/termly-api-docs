---
title: Quickstart - Integrating Termly CMP
description: A guide on how to integrate Termly as a CMP
---

This quickstart guide is designed for Termly Integration Partners (e.g. website builders) who are aiming to integrate Termly into their platform as a Consent Management Platform (CMP) solution for their own users. 

Below we outline (1) a step-by-step process for a basic integration and (2) advice for more advanced customization scenarios.

## **Basic Integration**

These steps outline the minimal interaction a platform would have with Termly’s API in order to get a working CMP installed on a website that they manage.

### **1. Create Website Configuration**

Create a new website in your partner account, providing necessary details like the website's URL and business information.

**Documentation:** [Websites API](/endpoints/websites-post)

### **2. Initiate Website Scan**

Start a website scan to identify cookies, trackers, and other elements requiring consent. 

**Documentation:** [Scan API](/endpoints/trigger-scan)

### **3. Monitor Scan Progress**

Track the scan status through the API until completion to proceed with further setup.

**Documentation:** [Scan report API](/endpoints/scan-reports-get)

### **4. Implement CMP Embed Script**

Embed the CMP script in the website’s **`<head>`** section post-scan, enabling the consent banner for site visitors.

**Documentation:** [Websites API](/endpoints/websites-get)

## **Advanced Configuration Options**

Advice and best practices for further implementation of the Termly CMP.

### **Banner Customization**

Banner appearance and behavior can be modified to suit each website's needs. Some Integration Partners see value in setting a standardized configuration across all sites that they manage, while others expose certain controls to their users to allow for some control.

**Documentation:** [Banner Settings](/endpoints/banners-put), [Theming](/endpoints/custom-consent-themes-get)

#### Custom Consent Themes

To customize banner colors, fonts, and button styles, use the Custom Consent Themes endpoints. The typical flow is:

**1. Create a theme** with a POST request containing your desired styles:

```
POST https://api.termly.io/v1/websites/custom_consent_themes
```

```json
[
  {
    "account_id": "<your_account_id>",
    "website_id": "<your_website_id>",
    "font_family": "Arial",
    "font_size": "14",
    "color": "#333333",
    "background": "#FFFFFF",
    "btn_background": "#4CAF50",
    "btn_text_color": "#FFFFFF"
  }
]
```

The response includes the theme `id` (e.g. `cct_xxxx`) which you will need for subsequent updates.

**2. Update the theme** with a PUT request. Include the theme `id` and only the fields you want to change:

```
PUT https://api.termly.io/v1/websites/custom_consent_themes
```

```json
[
  {
    "account_id": "<your_account_id>",
    "website_id": "<your_website_id>",
    "id": "<theme_id>",
    "color": "#FF0000",
    "btn_background": "#0000FF"
  }
]
```

**3. Verify your changes** with a GET request. The query must be URL-encoded and passed as the `query` parameter:

```
GET https://api.termly.io/v1/websites/custom_consent_themes?query=<url_encoded_json>
```

Where the query JSON is:

```json
[{"account_id":"<your_account_id>","website_id":"<your_website_id>"}]
```

:::note
All request bodies must be JSON **arrays**, even for a single item. The POST endpoint must be called first to create a theme before it can be updated with PUT.
:::

For a complete working code example, see the [Node.js Authentication Example](/quickstart/node-js-example).

### **User Collaboration**

Integration Partners may want their users to get access to the Termly Dashboard for full customization of their CMP solution, or in order to generate legal policies. 

The collaborators API can be used to invite a user to access a specific site via an invite URL, which they can use to log in to the Termly Dashboard.

**Documentation:** [Collaborators API](/endpoints/collaborators-post)

### **Script Blocking Management**

In order for the CMP to be effective at respecting a site visitor’s consent preferences, a [script blocking method](https://support.termly.io/en/articles/7904702-how-to-block-third-party-cookies) must be employed. 

To streamline this process, Integration Partners may want to generate a [custom blocking map](https://support.termly.io/en/articles/7904650-implementing-a-custom-blocking-map-to-change-auto-blocker-s-blocking-behavior) across the sites that they manage. This allows for consistent blocking behavior across many websites, which can be useful in the case where the same service is employed across them all (e.g. a third party booking service).

Additionally, Integrators who provide their customers an interface to add third party scripts on their site may want to expand this UI to allow for categorization of these scripts for the purpose of script blocking.
