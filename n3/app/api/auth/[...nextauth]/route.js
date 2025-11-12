import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user name" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials, req) {
        console.log("route.js > credentials > ", credentials);

        const res = await fetch("http://localhost:8080/api/accounts/signin", {
          method: "POST",
          body: JSON.stringify({ username: credentials.username, password: credentials.password }),
          headers: { "Content-Type": "application/json" },
        });

        console.log("route.js > res > ", res);

        const user = await res.json();
        console.log("route.js > user > ", user);

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, isNewUser }) {
      console.log("jwt.........");

      if (user) {
        token.id = user.email;
        token.role = user.role;
        token.email = user.email;
        token.name = user.nickname;

        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expireTime = Date.now() + 1000 * 60 * 60; //1h
      }

      return token;
    },
    async session({ session, user, token }) {
      console.log("session.........");

      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;

      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.expireTime = Date.now() + 1000 * 60 * 60; //1h
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
