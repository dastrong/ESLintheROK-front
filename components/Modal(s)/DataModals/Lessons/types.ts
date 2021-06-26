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
