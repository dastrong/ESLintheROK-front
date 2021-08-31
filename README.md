[![Codacy Badge](https://api.codacy.com/project/badge/Grade/71f8e38d827942bf8c166c6dc027ac52)](https://www.codacy.com/app/dastrong/ESLintheROK-front?utm_source=github.com&utm_medium=referral&utm_content=dastrong/ESLintheROK-front&utm_campaign=Badge_Grade)

# [ESL in the ROK](https://www.eslintherok.com)

### About

It's a collection of ESL games recreated with React for teachers in South Korea.

### Why I made it

Instead of using PPT games, which teachers needed to download/change/save/share continuously with other teachers, I came up with the idea to recreate some popular games and make it into a site. I ended up creating a site with 13 games (so far) that are completely dynamic and plug and play ready.

### Typical User Flow

- Users grab lesson data from my API, enter their own data or use a past lesson

- Users choose a game

  - Each game contains:
    - Different instructions for students and teachers
    - Both of which are offered in English and Korean
    - It's own image (I designed using Google Drawing)
    - A complete list of keyboard/mouse shortcuts

- Users can change games at any time without losing data

- Users can use certain games offline (only with custom data)

### Why ESL in the ROK is better than PPT

- Each round is completely random

- We aim to cycle through all the vocabulary given before shuffling it up

- Some game's settings/difficulties can be adjusted to suite your student levels

- Font:

  - family is changable at any time

  - size is automatically adjusted to fill each box
    - if there are multiple boxes, we use the smallest max scale to keep the span's consistent
    - check out the useFitText hook to view this code

- Users can switch between vocabulary and sentences to fit their lesson needs

- Randomized GIF's take the work out of remembering which classes have seen which GIF's before

  - unfortunately some provinces block GIPHY and I haven't found a workaround for that yet

- Contains direct link to download and/or print external resources

- Users can directly contact the creator of the games

### Services Used

- Boilerplate: Create React App
- Host: Netlify
- API: Heroku
- DB: mLab
- Domain: GoDaddy

### NPM Packages Used

- View package.json for a complete list

### Project Structure

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
├── src         # Old CRA Folder - will be removed soon
├── utils       # Folder of Utility Functions
└── ...
```

### Required `.env` file

```js
NEXT_PUBLIC_CLOUDINARY_URL = 'https://res.cloudinary.com/dastrong';

NEXT_PUBLIC_GOOGLE_FONTS_KEY = 'string'; // grab an API key from the Google Fonts API

COFFEE_TOKEN = 'string'; // used to grab supporters from buymeacoffee

NEXTAUTH_URL = 'http://localhost:3000'; // frontend url
DATABASE_URL = 'string'; // MongoDB connection url

EMAIL_SERVER_USER = 'string';
EMAIL_SERVER_PASSWORD = 'string';
EMAIL_SERVER_HOST = 'string';
EMAIL_SERVER_PORT = 'number';
EMAIL_FROM = 'noreply@eslintherok.com';
```
