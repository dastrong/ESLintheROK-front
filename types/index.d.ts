// image files
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.webp';
declare module '*.svg' {
  const content: any;
  export default content;
}

// audio files
declare module '*.mp3';
declare module '*.wav';
