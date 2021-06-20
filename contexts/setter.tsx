// used to set data for our global state
import React, { createContext, useContext, useReducer } from 'react';

type Vocabulary = string[];
type Expressions = string[];

type SetterState = {
  vocabulary: Vocabulary;
  expressions: Expressions;
  vocabularyVal: string;
  expressionVal: string;
};

type SetterAction =
  | { type: 'Change_Vocabulary_Val'; newValue: string }
  | { type: 'Change_Expression_Val'; newValue: string }
  | { type: 'Add_Vocabulary'; vocabulary: string }
  | { type: 'Add_Expression'; expression: string }
  | { type: 'Edit_Vocabulary'; index: number }
  | { type: 'Edit_Expression'; index: number }
  | { type: 'Remove_Vocabulary'; index: number }
  | { type: 'Remove_Expression'; index: number }
  | { type: 'Clear_All' };

const setter: SetterState = {
  vocabularyVal: '',
  expressionVal: '',
  vocabulary: [],
  expressions: [],
};

const reducer = (state: SetterState, action: SetterAction) => {
  switch (action.type) {
    case 'Change_Vocabulary_Val':
      return { ...state, vocabularyVal: action.newValue };
    case 'Change_Expression_Val':
      return { ...state, expressionVal: action.newValue };
    case 'Add_Vocabulary':
      return {
        ...state,
        vocabularyVal: '',
        vocabulary: [...state.vocabulary, action.vocabulary],
      };
    case 'Add_Expression':
      return {
        ...state,
        expressionVal: '',
        expressions: [...state.expressions, action.expression],
      };
    case 'Edit_Vocabulary':
      return {
        ...state,
        vocabularyVal: state.vocabulary[action.index],
        vocabulary: state.vocabulary.filter((_, i) => i !== action.index),
      };
    case 'Edit_Expression':
      return {
        ...state,
        expressionVal: state.expressions[action.index],
        expressions: state.expressions.filter((_, i) => i !== action.index),
      };
    case 'Remove_Vocabulary':
      return {
        ...state,
        vocabulary: state.vocabulary.filter((_, i) => i !== action.index),
      };
    case 'Remove_Expression':
      return {
        ...state,
        expressions: state.expressions.filter((_, i) => i !== action.index),
      };
    case 'Clear_All':
      return {
        vocabularyVal: '',
        expressionVal: '',
        vocabulary: [],
        expressions: [],
      };
    default:
      return state;
  }
};

const SetterContext = createContext(
  {} as SetterState & {
    setterDispatch: React.Dispatch<SetterAction>;
    sufficientVocabulary: boolean;
    sufficientExpressions: boolean;
    sufficientData: boolean;
    minimumVocabulary: number;
    minimumExpressions: number;
  }
);

export const SetterProvider = ({
  children,
  vocabulary = [],
  expressions = [],
}: {
  children: React.ReactNode;
  vocabulary?: Vocabulary;
  expressions?: Expressions;
}) => {
  const [state, setterDispatch] = useReducer(reducer, {
    ...setter,
    vocabulary,
    expressions,
  });

  const minimumVocabulary = 9;
  const minimumExpressions = 6;
  const sufficientVocabulary = state.vocabulary.length >= minimumVocabulary;
  const sufficientExpressions = state.expressions.length >= minimumExpressions;
  const sufficientData = sufficientVocabulary && sufficientExpressions;

  return (
    <SetterContext.Provider
      value={{
        ...state,
        setterDispatch,
        sufficientVocabulary,
        sufficientExpressions,
        sufficientData,
        minimumVocabulary,
        minimumExpressions,
      }}
    >
      {children}
    </SetterContext.Provider>
  );
};

export const useSetter = () => useContext(SetterContext);
