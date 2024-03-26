import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { env } from "../env"
import { prisma } from "@/src/prisma"

export const { handlers, auth: baseAuth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: "/iconTitle.png",
  },
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
    // CredentialsProvider({  
    //   name: 'email',
    //   credentials: {
    //     email: { label: 'email', type: 'text', placeholder: 'Enter your email',  },
    //     password: { label: 'Password', type: 'password', placeholder: 'Enter your password',  },
    //   },

    //   async authorize(credentials, req) {
    //     const { email, password } = credentials;

    //       const user = await prisma.user.findUnique({
    //         where: { email: email as string }, 
    //       });
      
    //       if (!user) {
    //         return null
    //       }
    //       const isValidPassword = (password == user.password);
      
    //       if (!isValidPassword) {
    //         return null
    //       }

    //       const session = await prisma.session.create({
    //         data: {
    //           user: {
    //             connect: { id: user.id }
    //           },
    //           sessionToken: Math.random().toString(36).substr(2),
    //           expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    //         },
    //       });
  
    //       return session;
    //   }
    // })
  ],

})
