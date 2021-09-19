import { Dispatch } from 'react';

const initialState = {
  selected: [],
};

export type State = {
  selected: string[];
};

export type Action =
  | { type: 'Set_Lessons' }
  // | { type: 'Add_Lesson'; lesson: PastLesson }
  | { type: 'View_Lesson'; lesson: PastLesson }
  | { type: 'Edit_Lesson'; lesson: PastLesson }
  | { type: 'Share_Lesson'; id: string }
  | { type: 'Remove_Lesson'; id: string }
  | { type: 'Toggle_Selection'; id: string }
  | { type: 'Delete_All_Lessons' }
  // | { type: '' }
  | { type: '' };

export type PastLessonDispatch = Dispatch<Action>;

export type PastLesson = {
  _id: string;
  title?: string;
  vocabulary?: string[];
  vocabularyCount?: number;
  expressions?: string[];
  expressionsCount?: number;
  createdAt: string;
  expires: string;
};

export type Props = {
  selectedPastLessons: string[];
  toggleSelection: (id: string) => void;
};
