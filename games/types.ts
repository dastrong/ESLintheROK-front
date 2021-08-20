export type GameSkill = 'Listening' | 'Speaking' | 'Reading' | 'Writing';

export type GameData = 'Vocabulary' | 'Expressions';

export type GameInstructions = {
  english: string[];
  korean: string[];
};

export type GameKeyCut = {
  key: string[];
  description: string;
};

export type GameConfig = {
  publish: boolean;

  // MAIN INFO
  path: string;
  title: string;
  description: string;
  image: {
    width: number;
    height: number;
  };
  warnings: string[];

  // SKILLS AND DATA
  skills: GameSkill[];
  dataUsed: GameData[];

  // BADGES - used on /games page
  attachURL: string;
  hasAudio: boolean;

  // KEYboard shortCUTS
  keyCuts: GameKeyCut[];

  // INSTRUCTIONS
  instructions: {
    forTeachers: GameInstructions;
    forStudents: GameInstructions;
  };
};
