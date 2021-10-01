import NextAuth, { Session, User } from 'next-auth';
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
      // How long until the e-mail can be used to log the user in seconds.
      maxAge: 60 * 60, // 1 hour
    }),
  ],

  database: process.env.DATABASE_URL,
  // debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    jwt: false,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 14 * 24 * 60 * 60, // 14 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    updateAge: 24 * 60 * 60, // 24 hours
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },

  callbacks: {
    async session(session: Session, user: User) {
      const {
        user: { email },
        expires,
        accessToken,
      } = session;

      return {
        email,
        expires,
        accessToken,
        defaultFont: user.defaultFont || 'random',
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
