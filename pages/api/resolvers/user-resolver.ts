import { v4 as uuidv4 } from "uuid";

import { s3 } from "../../../services/s3";
import { airtable } from "../../../services/airtable";
import { UserFieldSet } from "../../../types/user-fieldset";
import { UserInput } from "../../../types/user-input";

export const userResolver = {
  Query: {
    getUsers: async () => {
      const users = await airtable.select().all();
      return users.map((user) => ({ id: user.getId(), ...user.fields }));
    },
    getUser: async (_, args: { id: string }) => {
      const user = await airtable.find(args.id);
      return { id: user.getId(), ...user.fields };
    },
  },
  Mutation: {
    createUser: async (_, { user }: { user: UserInput }) => {
      const [record] = await airtable.create([
        { fields: user as UserFieldSet },
      ]);
      return {
        id: record.getId(),
        ...user,
      };
    },

    createSignedUploadUrl: async () => {
      return await s3.getSignedUploadUrl(uuidv4());
    },
  },
};
