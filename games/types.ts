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
  path: string;
  title: string;
  description: string;
  image: string;
  skills: GameSkill[];
  dataUsed: GameData[];
  attachURL: string;
  hasAudio: boolean;
  keyCuts: GameKeyCut[];
  instructions: {
    forTeachers: GameInstructions;
    forStudents: GameInstructions;
  };
};
