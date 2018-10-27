## About ESL in the ROK
This is my first large project created with React, which I made for ESL teachers in Korea. Instead of using PPT games and which teachers need to download/change/save/share continuously with other teachers, I came up with a site where some popular games were completely dynamic and lesson data was automated.

## Typical User Flow
- Users grab lesson data from my API or enter their own data
- Users choose a game
  - Each game contains:
    - Different instructions for students and teachers
    - Both of which are offered in English and Korean
    - It's own image (I designed using Google Drawing)
    - A complete list of keyboard/mouse shortcuts
- Users can change games at any time without losing data
- Users can use certain games offline (only with custom data)

## Why ESL in the ROK is better than PPT?
- Each round is completely random
- Game difficulties can be adjusted to suite your student levels
- Font:
  - family is changable at any time
  - size is automatically adjusted for users when applicable and users can also adjust with a simple scroll.
- Users can switch between vocabulary and sentences to fit their lesson needs
- Randomized GIF's take the work out of remembering which classes have seen which GIF's before
- Contains direct link to download and/or print external resources
- Users can directly contact the creator of the games

## Services Used
- Boilerplate: Create React App
- Host: Netlify
- API: Heroku
- DB: Digital Ocean MongoDB Droplet
- Domain: GoDaddy

## NPM Packages Used
- View package.json for a complete list