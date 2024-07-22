import NextAuth from "next-auth/next"; 
import GoogleProvider from 'next-auth/providers/google'

export const authOptions={
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '' ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '' ,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        })
    ] ,
    secret : process.env.NEXTAUTH_SECRET,
    
    callbacks: {
        async jwt({ token, account }:any) {
          if (account) {
            token.accessToken = account.access_token;
            token.refreshToken = account.refresh_token;
          }
          console.log(token);
          
          return token;
        },
        async session({ session, token }:any) {
          session.accessToken = token.accessToken;
          session.refreshToken = token.refreshToken;
          console.log(session);
          
          return session;
        },
      },
}

const handler = NextAuth(authOptions)
export {handler as GET , handler as POST} 