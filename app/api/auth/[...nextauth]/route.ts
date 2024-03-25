import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import { addUserNextChat, getUserNextChat } from "../../hippo/hippofunc";

const handle = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.IDAPPFB as string,
      clientSecret: process.env.IDAPPSECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "#chat";
    },
    async session({ session, user, token }) {
      if (session && session.user) {
        session.user.social = "facebook";
      }

      // session.user?.social = "facebook";
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});

export const GET = handle;
export const POST = handle;
