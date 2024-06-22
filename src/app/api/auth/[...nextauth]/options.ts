import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/app/lib/mongodb";
import CryptoTS from "crypto-ts";
import GoogleProvider from "next-auth/providers/google";
import { nanoid } from "nanoid";

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 48 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        const decryptPassword = (encryptedPassword: string) => {
          const bytes = CryptoTS.AES.decrypt(encryptedPassword, "BITS00461444#$");
          return bytes.toString(CryptoTS.enc.Utf8);
        };

        try {
          const client = await clientPromise;
          const db = client.db("BITSBids");

          const user = await db.collection("users").findOne({ email });

          if (user && email === user.email && password === decryptPassword(user.password)) {
            return user;
          } else {
            throw new Error('Invalid Credentials');
          }
        } catch (error) {
          console.error("Authorization error: ", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'credentials') {
        return true;
      }

      if (account?.provider === 'google' && profile) {
        try {
          const client = await clientPromise;
          const db = client.db("BITSBids");

          let user = await db.collection("users").findOne({ email: profile.email });

          if (!user) {
            await db.collection("users").insertOne({
              userId: nanoid(),
              name: profile.name || '',
              age: 0,
              phone: 0,
              email: profile.email,
              password: "oauth user",
            });
          }

          return true;
        } catch (error) {
          console.error("Google sign-in error: ", error);
          return false;
        }
      }

      return false;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
