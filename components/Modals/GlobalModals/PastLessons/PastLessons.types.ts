import { Dispatch } from 'react';

type Showing = 'list' | 'view' | 'edit';

export type State = {
  showing: Showing;
  list: PastLesson[];
  selected: string[];
  viewingId: string;
  deleteTitle: string;
  deleteId: string;
  shareTitle: string;
  shareId: string;
};

export type Action =
  | { type: 'Set_Lessons' }
  | { type: 'Set_Showing'; showing: Showing }
  | { type: 'View_Lesson'; id: string }
  | { type: 'Edit_Lesson'; id: string }
  | { type: 'Delete_Lesson'; id: string; title: string }
  | { type: 'Share_Lesson'; id: string; title: string }
  | { type: 'Reset_Delete_Share' }
  | { type: 'Toggle_Selection'; id: string };

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
  selectedPastLessons?: string[];
  toggleSelection?: (id: string) => void;
  dispatch: PastLessonDispatch;
};
