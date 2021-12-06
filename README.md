# Introduction

At the time of this writing the Notion API is still in Beta and the documentation of the Javascript SDK isn't perfect. I found I spend way too much time struggling to get the right object structure to update properties or filter by properties. This repo is (primarily for myself) a quick reference of how to use the API. Hopefully with the official release of the API this will become unnecessary.

All of the examples are in index.js with the exception of a helper file (notionReadAll.js) that I put the logic for handling the cursor that's needed if you're trying to get all records that match a given filter (instead of the first 100 that is the default for a query).
