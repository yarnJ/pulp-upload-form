import Airtable from "airtable";
import { UserFieldSet } from "../types/user-fieldset";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table<UserFieldSet>(process.env.AIRTABLE_TABLE);

export { airtable };
