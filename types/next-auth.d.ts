import { Awaitable } from 'next-auth/internals/utils';

declare module 'next-auth' {
  interface DefaultUser {
    email: string;
    defaultFont?: string;
  }

  interface User {
    email: string;
    defaultFont?: string;
  }

  interface DefaultSession {
    email: string;
    user: {
      email: string;
    };
    accessToken: string;
    expires: string;
  }

  interface Session {
    accessToken: string;
    expires: string;
    email: string;
    defaultFont: string;
  }
}

declare module 'next-auth/providers' {
  interface EmailConfig {
    generateVerificationToken?: () => Awaitable<string>;
  }
}
