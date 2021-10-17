import { lighten, darken, readableColorIsBlack } from 'color2k';

export const colors = [
  'IndianRed',
  'LightCoral',
  'Salmon',
  'Crimson',
  'Red',
  'FireBrick',
  'DarkRed',
  'HotPink',
  'DeepPink',
  'MediumVioletRed',
  'PaleVioletRed',
  'Coral',
  'Tomato',
  'OrangeRed',
  'DarkOrange',
  'Gold',
  'Plum',
  'Violet',
  'Orchid',
  'Fuchsia',
  'Magenta',
  'MediumOrchid',
  'BlueViolet',
  'DarkViolet',
  'DarkOrchid',
  'DarkMagenta',
  'Purple',
  'RebeccaPurple',
  'Indigo',
  'MediumSlateBlue',
  'SlateBlue',
  'DarkSlateBlue',
  'GreenYellow',
  'Chartreuse',
  'LawnGreen',
  'Lime',
  'LimeGreen',
  'MediumSeaGreen',
  'SeaGreen',
  'ForestGreen',
  'Green',
  'DarkGreen',
  'DarkOliveGreen',
  'LightSeaGreen',
  'DarkCyan',
  'Aqua',
  'Cyan',
  'Turquoise',
  'DarkTurquoise',
  'SteelBlue',
  'DeepSkyBlue',
  'DodgerBlue',
  'CornflowerBlue',
  'RoyalBlue',
  'Blue',
  'MediumBlue',
  'MidnightBlue',
  'SandyBrown',
  'Goldenrod',
  'DarkGoldenrod',
  'Peru',
  'Chocolate',
  'SaddleBrown',
  'Sienna',
  'Brown',
  'Maroon',
];

export const lightenedColors = colors.map(color => {
  return readableColorIsBlack(color)
    ? color
    : lighten(color, Math.random() * 0.1 + 0.2);
});

export const darkenedColors = colors.map(color => {
  return readableColorIsBlack(color)
    ? darken(color, Math.random() * 0.2 + 0.1)
    : color;
});
