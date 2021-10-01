import React, { useRef } from 'react';
import { useSetter } from 'contexts/setter';
import InlineForm from 'components/InlineForm';
import DataScreenList from './DataScreenList';

export default function DataScreen({
  showPlaceholders = false,
  hideForms = false,
  disableHover = false,
}: {
  showPlaceholders?: boolean;
  hideForms?: boolean;
  disableHover?: boolean;
}) {
  const {
    vocabulary,
    vocabularyVal,
    expressions,
    expressionVal,
    setterDispatch,
  } = useSetter();

  // some refs so when we edit a list item, we can focus the input
  const vocabularyInputRef = useRef<HTMLInputElement>();
  const expressionInputRef = useRef<HTMLInputElement>();
  const vocabularyListRef = useRef<HTMLDivElement>();
  const expressionListRef = useRef<HTMLDivElement>();

  return (
    <div className="container">
      <div className="column">
        {!hideForms && (
          <InlineForm
            placeholder="Vocabulary here..."
            value={vocabularyVal}
            onChange={(newValue: string) =>
              setterDispatch({ type: 'Change_Vocabulary_Val', newValue })
            }
            onSubmit={(vocabulary: string) => {
              setterDispatch({ type: 'Add_Vocabulary', vocabulary });
              setTimeout(
                () =>
                  vocabularyListRef.current.scrollTo({
                    top: vocabularyListRef.current.scrollHeight,
                  }),
                100
              );
            }}
            ref={vocabularyInputRef}
          />
        )}

        <DataScreenList
          showPlaceholders={showPlaceholders}
          disableHover={disableHover}
          list={vocabulary}
          editListItem={(index: number) => {
            setterDispatch({ type: 'Edit_Vocabulary', index });
            vocabularyInputRef.current.focus();
          }}
          removeListItem={(index: number) =>
            setterDispatch({ type: 'Remove_Vocabulary', index })
          }
          ref={vocabularyListRef}
        />
      </div>

      <div className="divider" />

      <div className="column">
        {!hideForms && (
          <InlineForm
            placeholder="Expressions here..."
            value={expressionVal}
            onChange={(newValue: string) =>
              setterDispatch({ type: 'Change_Expression_Val', newValue })
            }
            onSubmit={(expression: string) => {
              setterDispatch({ type: 'Add_Expression', expression });
              setTimeout(
                () =>
                  expressionListRef.current.scrollTo({
                    top: expressionListRef.current.scrollHeight,
                  }),
                100
              );
            }}
            ref={expressionInputRef}
          />
        )}

        <DataScreenList
          showPlaceholders={showPlaceholders}
          disableHover={disableHover}
          list={expressions}
          editListItem={(index: number) => {
            setterDispatch({ type: 'Edit_Expression', index });
            expressionInputRef.current.focus();
          }}
          removeListItem={(index: number) =>
            setterDispatch({ type: 'Remove_Expression', index })
          }
          ref={expressionListRef}
        />
      </div>

      <style jsx>{`
        .container {
          min-height: 350px;
          height: 60vh;
          display: flex;
          justify-content: center;
        }

        .column {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .divider {
          width: 1px;
          background-color: rgba(34, 36, 38, 0.15);
          margin: 0 1rem;
        }
      `}</style>
    </div>
  );
}
