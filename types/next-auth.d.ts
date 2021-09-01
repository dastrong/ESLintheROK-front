import { Awaitable } from 'next-auth/internals/utils';

declare module 'next-auth/providers' {
  interface EmailConfig {
    generateVerificationToken?: () => Awaitable<string>;
  }
}
