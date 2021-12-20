import { FieldSet } from "airtable";

export interface UserFieldSet extends FieldSet {
  name: string;
  biography: string;
  imageUrl: string;
}
