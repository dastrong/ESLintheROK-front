export type Steps =
  | 'LOADING'
  | 'CHOOSE_GRADE'
  | 'CHOOSE_BOOK'
  | 'CHOOSE_LESSONS'
  | 'EDIT_DATA';

export type Props = {
  closeModal: () => void;
  decreaseStep?: () => void;
  increaseStep?: () => void;
};

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
  lessons: Omit<Lesson, 'created_at' | 'vocabulary' | 'expressions'>[];
};

export type Lesson = {
  _id: string;
  chapter: number;
  title: string;
  created_at: string;
  vocabulary: string[];
  expressions: string[];
};

export type State = {
  step: number;
  grades: Grade[];
  books: Book[];
  lessons: Lesson[];
  chosenGrade: string;
  chosenBook: string;
  chosenLesson: string;
};

export type Action =
  | { type: 'Step_Increase' }
  | { type: 'Step_Decrease' }
  | { type: 'Set_Grades'; grades: Grade[] }
  | { type: 'Set_Books'; books: Book[] }
  | { type: 'Set_Lessons'; lessons: Lesson[] }
  | { type: 'Choose_Grade'; chosenGrade: string }
  | { type: 'Choose_Book'; chosenBook: string }
  | { type: 'Choose_Lesson'; chosenLesson: string };

export type Dispatch = React.Dispatch<Action>;

export type LessonsGradesProps = Props & {
  currentStep: 'LOADING' | 'CHOOSE_GRADE';
  grades: Grade[];
  dispatch: Dispatch;
};

export type LessonsBooksProps = Props & {
  chosenGrade: string;
  grades: Grade[];
  dispatch: Dispatch;
};
