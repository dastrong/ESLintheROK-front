# [ESL in the ROK](https://www.eslintherok.com)

### What is it?
It's a collection of ESL games recreated with React for teachers in South Korea.

### Why did I make it?
Instead of using PPT games, which teachers needed to download/change/save/share continuously with other teachers, I came up with the idea to recreate some popular games and make it into a site. I ended up creating a site with 13 games (so far) that are completely dynamic and plug and play ready.

### Typical User Flow
- Users grab lesson data from my API or enter their own data
- Users choose a game
  - Each game contains:
    - Different instructions for students and teachers
    - Both of which are offered in English and Korean
    - It's own image (I designed using Google Drawing)
    - A complete list of keyboard/mouse shortcuts
- Users can change games at any time without losing data
- Users can use certain games offline (only with custom data)

### Why ESL in the ROK is better than PPT?
- Each round is completely random
- Game difficulties can be adjusted to suite your student levels
- Font:
  - family is changable at any time
  - size is automatically adjusted for users when applicable and users can also adjust with a simple scroll.
- Users can switch between vocabulary and sentences to fit their lesson needs
- Randomized GIF's take the work out of remembering which classes have seen which GIF's before
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
