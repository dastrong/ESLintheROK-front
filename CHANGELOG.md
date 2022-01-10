# Changelog

All notable changes, updated and additions to this site will be documented below.

## [2.2.0] - 2022-01-10

**Changed**

- New Game Images - [Games](https://www.eslintherok.com/games)
  - special thanks to [JacquiJoy](https://www.instagram.com/jacquijoy) for making these
- Matched navigation and footer text styles, so they are consistent

**Fixed**

- Fixed App Crashing
  - it would happen if a user reloaded while on certain _/play_ pages where the game would load before the data was
    - now we wait for that data before loading the game
    - if there isn't any data, we notify the user to choose some
- Fixed Game - [Speed Solver](https://www.eslintherok.com/game/speed_solver)
  - letters would stop animating randomly
  - hasn't happened during testing after this update
- Fixed a broken link to contribute page while choosing a grade
- Corrected spelling of occured to occurred

## [2.1.0] - 2021-10-17

**Added**

- New Game - [First and Last Letter](https://www.eslintherok.com/game/first_and_last_letter)
- New Game - [Word Shark](https://www.eslintherok.com/game/word_shark)
  - Special thanks to [@MattDClarke](https://github.com/MattDClarke) for first recreating this game for the site
- An animated dot on the nav changelog link to indicate an update has occurred and hasn't been reviewed
- The date a game is published, so we can show a _New_ badge on the games page

**Changed**

- Updated [Privacy Policy](https://www.eslintherok.com/privacy)
- Updated Game - [Sparkle Die](https://www.eslintherok.com/game/sparkle_die)
  - Sparkle Die now uses both vocabulary and expressions per user request
- Updated Games - [Chase the Vocab](https://www.eslintherok.com/game/chase_the_vocab) / [Eliminination](https://www.eslintherok.com/game/elimination) / [Letter Bowling](https://www.eslintherok.com/game/letter_bowling) / [Stars](https://www.eslintherok.com/game/stars) / [What's Behind?](https://www.eslintherok.com/game/whats_behind) / [What's Missing?](https://www.eslintherok.com/game/whats_missing) / [Word Lotto](https://www.eslintherok.com/game/word_lotto)
  - previously these games used the same 9 colors, but now they use a new 66 color array
    - we either lightened or darken these new colors too, depending on the use case
  - changed some styling in these games to improve and freshen the experience for long time users

**Fixed**

- [Nunchi](https://www.eslintherok.com/game/nunchi) background image url
- The game fullscreen popup won't appear now, if you're already in fullscreen mode

## [2.0.0] - 2021-10-04

This is by far the largest release made to ESL in the ROK, with too many changes to list here. However, I'll write three blog posts, each for a different target
audience, if you'd like to read about everything further.

- [For Teachers](https://danielstrong.tech/blog/update-esl-in-the-rok-teachers)
- For Developers - Coming Soon
- For Technical Details - Coming Soon

## [1.0.1] - 2021-03-17

**Added**

- merged new WordShark game from [@MattDClarke](https://github.com/MattDClarke) into development branch

## [1.0.0] - 2020-06-15

**Changed**

- changed Speed Writer name and audio per a request from the original game author

**Note:** _any changes made before this date will not be documented_
