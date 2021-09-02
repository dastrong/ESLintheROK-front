import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';
import randomstring from 'randomstring';
import UserModel from 'models/User';
import { sendVerificationRequest } from 'utils/sendVerificationRequest';

export default NextAuth({
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
      generateVerificationToken: () => {
        return randomstring.generate({ length: 6, charset: 'numeric' });
      },
    }),
  ],

  database: process.env.DATABASE_URL,
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },

  callbacks: {
    async session(session) {
      const {
        user: { email },
        expires,
        accessToken,
      } = session;

      return {
        email,
        expires,
        accessToken,
      };
    },
  },

  adapter: Adapters.TypeORM.Adapter(
    // The first argument should be a database connection string or TypeORM config object
    process.env.DATABASE_URL,
    // The second argument can be used to pass custom models and schemas
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { models: { User: UserModel } }
  ),
});
