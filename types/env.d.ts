declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'analyze';

    NEXT_PUBLIC_CLOUDINARY_URL: 'https://res.cloudinary.com/dastrong';

    NEXT_PUBLIC_GOOGLE_FONTS_KEY: string;

    NEXT_PUBLIC_ANALYTICS: string;

    NEXT_PUBLIC_GIPHY_KEY: string;

    NEXT_PUBLIC_SEED: string;

    COFFEE_TOKEN: string;

    NEXTAUTH_URL: 'http://localhost:3000' | 'https://www.eslintherok.com';
    NEXT_PUBLIC_NEXTAUTH_URL:
      | 'http://localhost:3000'
      | 'https://www.eslintherok.com';
    NEXTAUTH_SECRET: string;
    DATABASE_URL: string;

    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_PORT: string;
    EMAIL_FROM: string;
    EMAIL_INBOX: string;
    SENDGRID_API_KEY: string;
  }
}
