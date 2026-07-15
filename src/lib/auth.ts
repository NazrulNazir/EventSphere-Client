import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const uri = process.env.EVENTSPEHERE_URI;

if (!uri) {
  throw new Error("EVENTSPEHERE_URI is not defined");
}

const client = new MongoClient(uri);
const db = client.db("EventSphere");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },

    additionalFields: {
      status: {
        type: "string",
        required: false,
        defaultValue: "active",
      },
      image: {
        type: 'string',
        required: false
      },

      // district: {
      //   type: "string",
      //   required: false,
      // },

      // upazila: {
      //   type: "string",
      //   required: false,
      // },

      // role: {
      //   type: "string",
      //   required: false,
      //   defaultValue: "user",
      // },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
  },

  plugins: [jwt()],
});