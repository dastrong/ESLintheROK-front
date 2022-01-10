export type Steps =
  | 'LOADING'
  | 'CHOOSE_GRADE'
  | 'CHOOSE_BOOK'
  | 'CHOOSE_LESSONS'
  | 'EDIT_DATA';

export type Grade = {
  _id: string;
  grade: number;
  books: string[];
};

export type Book = {
  _id: string;
  publisher: string;
  author: string;
  imageURL: string;
  lessons: string[];
};
export type BookGroup = { [gradeId: string]: Book[] };

export type LessonFull = {
  _id: string;
  chapter: number;
  title: string;
  created_at: string;
  vocabulary: string[];
  expressions: string[];
};
export type LessonMini = Omit<
  LessonFull,
  'created_at' | 'vocabulary' | 'expressions'
>;
export type LessonGroup = { [bookId: string]: LessonMini[] };

export type State = {
  step: number;
  grades: Grade[];
  books: BookGroup;
  lessons: LessonGroup;
  chosenGrade: string;
  chosenBook: string;
  chosenBookImg: string;
  chosenLessons: string[];
};

export type Action =
  | { type: 'Step_Increase' }
  | { type: 'Step_Decrease' }
  | { type: 'Set_Grades'; grades: Grade[] }
  | { type: 'Set_Books'; books: Book[]; gradeId: string }
  | { type: 'Set_Lessons'; lessons: LessonMini[]; bookId: string }
  | { type: 'Choose_Grade'; chosenGrade: string }
  | { type: 'Choose_Book'; chosenBook: string; chosenBookImg: string }
  | { type: 'Choose_Lessons'; chosenLessons: string[] };

export type Dispatch = React.Dispatch<Action>;

export type Props = {
  closeModal: () => void;
  dispatch: Dispatch;
};

export type LessonsGradesProps = Props & {
  currentStep: 'LOADING' | 'CHOOSE_GRADE';
  grades: Grade[];
};

export type LessonsBooksProps = Props & {
  grades: Grade[];
  chosenGrade: string;
  books: BookGroup;
};

export type LessonsLessonsProps = Props & {
  chosenGrade: string;
  books: BookGroup;
  chosenBook: string;
  chosenBookImg: string;
  lessons: LessonGroup;
};

export type LessonsDataProps = Props & {
  chosenLessons: string[];
  grade: number;
  publisher: string;
};
