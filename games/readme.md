# Games Section

Want to add a game or customize one I've already created? Wonderful. Simply open a pull request (PR) against my `dev` branch and I'll review it. If you'd like to ask me some questions first, feel free to open an issue in the repo to discuss.

## Guide

### Getting Started

- Open your terminal and run this:

```bash
$ npm run createGame
```

- Follow the prompts and you're done!

### Suggested First Steps

- decide what your game's data sources will be: vocabulary, expressions, or both
- go through your game file and take notice of the structure of the file
  - there are lots of comments throughout that you can delete when you're comfortable
- think about your game and what variables and things that you need to make it work
  - open your `state_types.ts` file and start to build out what your game store types
  - open your `state_manager.ts` file and start to build out your game store and logic
  - if you check our your main game file you'll notice some nice auto-completion on any additions you've made
- now work between your game and styles files to make a cool game
