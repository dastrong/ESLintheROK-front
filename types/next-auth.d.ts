import { Awaitable } from 'next-auth/internals/utils';

declare module 'next-auth' {
  interface DefaultUser {
    email: string;
  }

  interface DefaultSession {
    email: string;
    user: { email: string };
    accessToken: string;
    expires: string;
  }

  interface Session {
    email: string;
    accessToken: string;
    expires: string;
  }
}

declare module 'next-auth/providers' {
  interface EmailConfig {
    generateVerificationToken?: () => Awaitable<string>;
  }
}
