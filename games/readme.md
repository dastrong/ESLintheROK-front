# Games Section

Want to add a game or customize one I've already created? Wonderful. Simply open a pull request (PR) against my `dev` branch and I'll review it. If you'd like to ask me some questions first, feel free to open an issue in the repo to discuss.

## Getting Started (New Game)

- Follow the _Getting Started_ instructions on the **main readme**.

- Make your own working branch

```bash
$ git checkout -b 'New Game: {GameName}'
```

- In your branch, run the following:

```bash
$ npm run createGame
```

> You can ignore the DeprecatedWarning, if you receive it. Enter your game name to continue.

- Follow all the prompts

- Make an initial game commit in your branch

```bash
$ git add . && git commit -m 'initial {GameName} commit'
```

- That's all. You're ready to start creating your game.

## Suggested First Steps

You don't need to follow these right now, if you want to create your game somewhere else first. BUT if you want to publish a game here, I would suggest following the template as migrating a game from elsewhere can be quite tedious.

- decide what your game's data sources will be: vocabulary, expressions, or both
- go through your game file and take notice of the structure of the file
  - there are lots of comments throughout that you can delete when you're comfortable
- think about your game and what variables and things that you need to make it work
  - open your `state_types.ts` file and start to build out what your game store types
  - open your `state_manager.ts` file and start to build out your game store and logic
  - if you check our your main game file you'll notice some nice auto-completion on any additions you've made
- now work between your game and styles files to make a cool game

## Using Media Files

Let's say you have an image or sound effect that you want to include in your game. How should you load and use it?

### Development

- first you would have your new games folder
  - ```bash
    # (game folder example)
    # /games/AwesomeFunWords
    ```
- add your media files directly in your game folder
  - ```bash
    # /games/AwesomeFunWords/clapping.mp3 - audio
    # /games/AwesomeFunWords/background.jpg - image
    ```
- import that file anywhere
  - ```jsx
    import ClappingAudioURL from './clapping.mp3';
    import BackgroundURL from './background.jpg';
    ```
- use it in your stylesheets or components

  - ```jsx
    // -------AUDIO FILES------ //
    import { useAudio } from 'hooks'; // custom audio hook
    import ClappingAudioURL from './clapping.mp3';

    // pass the audioUrl to my custom hook
    const [ClappingAudio] = useAudio(ClappingAudioURL);
    // you can now use ClappingAudio to handle that audio clip

    // -------IMAGE FILES------ //
    import css from 'styled-jsx/css'; // css-in-js styling
    import BackgroundURL from './background.jpg';

    // you can import and use the url in a *styles* file
    export const CoolBackgroundCSS = css.resolve`
      div {
        background-image: url(${BackgroundURL});
      }
    `;

    // you can import and use the url in a *component* file
    function AwesomeFunWordsInnerComponent() {
      return (
        <div style={{ backgroundImage: `url(${BackgroundURL})` }}>
          Hello World
        </div>
      );
    }
    ```

### Production

All media files used in the production build of ESL in the ROK are hosted and served from Cloudinary, so those images that you have been using locally in development, now need to be uploaded to Cloudinary.

- Streamlining this conversion will be part of a future feature
  - I will upload when a satisfactory pull request has been made until this is released
- In addition to uploading the files to Cloudinary, the code must also be updated as follows

  - ```jsx
    // first import the getGameFileUrl function
    import { getGameFileUrl } from 'utils/getCloudUrls';

    // then change your local imports to use the new function
    import ClappingAudioURL from './clapping.mp3'; // before
    const ClappingAudioURL = getGameFileUrl('AwesomeFunWords/clapping.mp3'); // after
    ```
