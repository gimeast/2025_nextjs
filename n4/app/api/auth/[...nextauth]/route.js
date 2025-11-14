import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";

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

        const res = await fetch(`${process.env.API_SERVER_HOST}/api/accounts/signin`, {
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
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      //kakao
      if (account?.provider === "kakao" && profile) {
        const res = await fetch(`${process.env.API_SERVER_HOST}/api/accounts/social`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-store",
          },
          body: new URLSearchParams({ email: profile.kakao_account.email }),
        });

        const result = await res.json();

        token.id = result.email;
        token.role = result.role;
        token.email = result.email;
        token.name = result.nickname;

        token.accessToken = result.accessToken;
        token.refreshToken = result.refreshToken;
        token.accessTokenExpires = Date.now() + 1000 * 60 * 60; //1h

        return token;
      }
      //자체 로그인
      if (account?.provider === "credentials") {
        if (user) {
          token.id = user.email;
          token.role = user.role; // 예를 들어, 사용자의 역할(Role)을 JWT에 포함
          token.email = user.email;
          token.name = user.nickname;

          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.accessTokenExpires = Date.now() + 1000 * 60 * 60; //1h
        }
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, user, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;

      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires; //1h

      console.log("session.........", session);
      return session;
    },
  },
  pages: {
    signIn: "/account/signin",
    signOut: "/account/signout",
  },
};

async function refreshAccessToken(token) {
  console.log("refreshAccessToken");
  try {
    const res = await fetch(`${process.env.API_SERVER_HOST}/api/accounts/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken: token.refreshToken }),
      headers: { "Content-Type": "application/json" },
    });

    const refreshedUser = await res.json();
    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    token.id = refreshedUser.email;
    token.role = refreshedUser.role;
    token.email = refreshedUser.email;
    token.name = refreshedUser.nickname;
    token.accessToken = refreshedUser.accessToken;
    token.refreshToken = refreshedUser.refreshToken;

    token.accessTokenExpires = Date.now() + 1000 * 60 * 60; // 1시간으로 재설정
    return token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
