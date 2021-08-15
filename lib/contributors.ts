export type GameContributor = {
  name: string;
  link?: string;
  games?: {
    title: string;
    contribution: ('developer' | 'designer' | 'creator' | 'helper')[];
  }[];
};

type LessonContributor = string[];

export const lessonContributors: LessonContributor = [
  // simply add a name below to show up on the acknowledgments page
  'Daniel Strong',
];
