require("dotenv").config();
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Be sure to Share edit access with the API Intergation user on the table you're trying to manipulate
// Be sure to put the NOTION_TOKEN in a .env file using dotenv or some other method of getting access to it securely

(async function () {
  // CREATE

  var props = {};

  props["My Title"] = { title: [{ type: "text", text: { content: "Sample Text" } }] };
  props["My Text"] = { rich_text: [{ type: "text", text: { content: "Sample Text" } }] };
  props["My Number"] = { number: 123 };
  props["My Select"] = { select: { name: "My Option" } };
  props["My Multi-select"] = { multi_select: [{ name: "My Option 1" }, { name: "My Option 2" }] };
  props["My Date"] = { date: { start: "2021-12-01" } };
  props["My Date Range"] = { date: { start: "2021-12-01", end: "2021-12-02" } };
  props["My Relation"] = { relation: [{ id: "5f640c67b0c4433d9b2ed5fcec6f910c" }] };
  props["My Checkbox"] = { checkbox: true };
  props["My URL"] = { url: "https://www.google.com" };
  props["My Email"] = { email: "test@test.com" };
  props["My Phone"] = { phone_number: "415-000-1111" };

  await notion.pages.create({
    parent: { database_id: process.env.SAMPLE_DB_ID },
    properties: props,
  });

  // UPDATE

  const records = await notion.databases.query({
    database_id: process.env.SAMPLE_DB_ID,
    filter: {
      property: "My Title",
      text: {
        contains: "Update Test",
      },
    },
  });

  // You can change any property with the same object style as in the CREATE section, I'm just changing the title for simplicity
  props = { ...props, "My Title": { title: [{ type: "text", text: { content: "Updated Successfully" } }] } };

  if (records.results.length > 0) {
    notion.pages.update({
      page_id: records.results[0].id,
      properties: props,
    });
  }

  // READ - SIMPLE

  // This is the simplist way to just grab some data. If you need more than
  const read = await notion.databases.query({
    database_id: process.env.SAMPLE_DB_ID,
    filter: {
      property: "My Title",
      text: {
        contains: "Update Test",
      },
    },
  });

  //READ - ALL

  // If you need to fetch more records that the API allows the simple way, you can use this method.
  // I'm importing it instead of putting it is this file because that's what I'll realistically do.

  // I'm also filtering on every property so there are examples of filtering on each.
  // I'm commenting out the other filter option for each property you could choose instead

  const readAll = require("./notionReadAll").readAll;

  const query = {
    database_id: process.env.SAMPLE_DB_ID,
    filter: {
      and: [
        {
          property: "My Title",
          title: {
            // equals: "Read Test",
            // does_not_equal: "Read Test",
            contains: "Read Test",
            // does_not_contain: "Read Test",
            // starts_with: "Read Test",
            // ends_with: "Read Test",
            // is_empty: true,
            // is_not_empty: true,
          },
        },
        {
          property: "My Text",
          text: {
            // equals: "Sample Text",
            // does_not_equal: "Sample Text",
            contains: "Sample Text",
            // does_not_contain: "Sample Text",
            // starts_with: "Sample Text",
            // ends_with: "Sample Text",
            // is_empty: true,
            // is_not_empty: true,
          },
        },
        {
          property: "My Number",
          number: {
            equals: 123,
            // does_not_equal: 123,
            // greater_than: 123,
            // less_than: 123,
            // greater_than_or_equal_to: 123,
            // less_than_or_equal_to: 123,
            // is_empty: true,
            // is_not_empty: true,
          },
        },
        {
          property: "My Select",
          select: {
            equals: "My Option",
            // does_not_equal: "My Option",
            // is_empty: true,
            // is_not_empty: true,
          },
        },
        {
          property: "My Multi-select",
          multi_select: {
            contains: "My Option 1",
            // does_not_contain: "My Option 1",
            // is_empty: true,
            // is_not_empty: true,
          },
        },
        {
          property: "My Date",
          date: {
            equals: "2021-12-01",
            // before: "2021-12-01",
            // after: "2021-12-01",
            // on_or_before: "2021-12-01",
            // on_or_after: "2021-12-01",
            // past_week: {},
            // past_month: {},
            // past_year: {},
            // next_week: {},
            // next_month: {},
            // next_year: {},
            // is_empty: true,
            // is_not_empty: true,
          },
        },
        {
          property: "My Relation",
          relation: {
            contains: process.env.RELATED_PAGE_ID,
            // does_not_contain: process.env.RELATED_PAGE_ID,
            // is_empty: true,
            // is_not_empty: true,
          },
        },
        {
          property: "My Checkbox",
          checkbox: {
            equals: true,
            // does_not_equal: true,
          },
        },
        {
          property: "My URL",
          url: {
            // equals: "https://www.google.com",
            // does_not_equal: "https://www.google.com",
            contains: "https://www.google.com",
            // does_not_contain: "https://www.google.com",
            // starts_with: "https://www.google.com",
            // ends_with: "https://www.google.com",
            // is_empty: true,
            // is_not_empty: true,
          },
        },
        {
          property: "My Email",
          email: {
            // equals: "test@test.com",
            // does_not_equal: "test@test.com",
            contains: "test@test.com",
            // does_not_contain: "test@test.com",
            // starts_with: "test@test.com",
            // ends_with: "test@test.com",
            // is_empty: true,
            // is_not_empty: true,
          },
        },
        {
          property: "My Phone",
          phone_number: {
            // equals: "415-000-1111",
            // does_not_equal: "415-000-1111",
            contains: "415-000-1111",
            // does_not_contain: "415-000-1111",
            // starts_with: "415-000-1111",
            // ends_with: "415-000-1111",
            // is_empty: true,
            // is_not_empty: true,
          },
        },
      ],
    },
  };

  const results = await readAll(query);
  console.log(results);

  // DELETE

  // You can't actually "delete" a record, but you can mark it as archived which functions as a soft delete

  const toDelete = await notion.databases.query({
    database_id: process.env.SAMPLE_DB_ID,
    filter: {
      property: "My Title",
      text: {
        contains: "Delete Test",
      },
    },
  });

  notion.pages.update({
    page_id: toDelete.results[0].id,
    archived: true,
  });
})();
