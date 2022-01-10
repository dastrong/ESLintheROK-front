[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/ycqPbFl)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

[![codebeat badge](https://codebeat.co/badges/f0c149fc-47f9-4d61-8e12-6a3a61f97613)](https://codebeat.co/projects/github-com-dastrong-teacher-site-master)

# [ESL in the ROK](https://www.eslintherok.com)

It's a collection of ESL games recreated with React to be played in the browser or printed for English teachers in South Korea or anywhere in the world.

## Motivation

Instead of using PPT games, which teachers needed to download/change/save/share continuously with other teachers, I came up with the idea to recreate some popular games and make it into a site. I ended up creating a couple games to start and since then it's just grown and grown. Our games are fun, completely dynamic and plug and play ready.

## Typical User Flow

Refer to our [User Guide](https://www.eslintherok.com/guide).

## Why would you recreate PPT games in the browser?

Refer to our [User Guide](https://www.eslintherok.com/guide) to view a list of pros and cons.

## Contributing

Whether you're a developer, designer, or teacher visit our [contribution page](https://www.eslintherok.com/contribute) to help contribute in some way.

## Project Structure

```bash
.
├── .vscode     # VSCode Settings
├── components  # Component Files
├── contexts    # React Context Files
├── games       # All Game Folders
├── hooks       # Reusable Hooks
├── lib         # Library of Static Exports
├── pages       # All Pages/Routes
├── public      # Public Files
├── utils       # Folder of Utility Functions
└── ...
```

## Required `.env` file

```js
NEXT_PUBLIC_CLOUDINARY_URL = 'https://res.cloudinary.com/dastrong';

NEXT_PUBLIC_GOOGLE_FONTS_KEY = 'string'; // grab an API key from the Google Fonts API

NEXT_PUBLIC_ANALYTICS = 'string'; // grab an API key from Google Analytics

NEXT_PUBLIC_GIPHY_KEY = 'string'; // grab an API key from GIPHY

NEXT_PUBLIC_SEED = 'boolean'; // set this if you want seed the database or use the seed script

COFFEE_TOKEN = 'string'; // used to grab supporters from buymeacoffee

NEXTAUTH_URL = 'http://localhost:3000'; // frontend url
NEXT_PUBLIC_NEXTAUTH_URL = 'http://localhost:3000'; // frontend url
NEXTAUTH_SECRET = 'string';
DATABASE_URL = 'string'; // MongoDB connection url

// development: MailTrap  production: SendGrid
EMAIL_SERVER_USER = 'string';
EMAIL_SERVER_PASSWORD = 'string';
EMAIL_SERVER_HOST = 'string';
EMAIL_SERVER_PORT = 'number';
EMAIL_FROM = 'string'; // what address automated emails come from
EMAIL_INBOX = 'string'; // where the email will end up going
SENDGRID_API_KEY = 'string';
```
