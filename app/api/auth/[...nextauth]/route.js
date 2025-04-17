import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // Permite autentificarea doar cu email-ul instituțional
      return profile?.email?.endsWith("@student.facultate.ro") || false;
    },
    async session({ session, token }) {
      session.token = token.token;
      return session;
    },
    async jwt({ token }) {
      token.token = Math.random().toString(36).substr(2, 10); // Generare token random
      return token;
    },
  },
});

export { handler as GET, handler as POST };
