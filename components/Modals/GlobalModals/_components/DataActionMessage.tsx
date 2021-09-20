import React from 'react';
import { useSetter } from 'contexts/setter';

export default function DataActionMessage({
  message = 'Requirements met. Set your data whenever.',
}) {
  const {
    vocabulary,
    expressions,
    sufficientVocabulary,
    sufficientExpressions,
    sufficientData,
    minimumVocabulary,
    minimumExpressions,
  } = useSetter();

  return (
    <div className="message_container">
      {sufficientData ? message : 'Minimum requirements:'}

      {!sufficientData && (
        <div className="message_requirements">
          Vocabulary:{' '}
          <span style={{ color: sufficientVocabulary ? 'green' : 'red' }}>
            {vocabulary.length}
          </span>
          /{minimumVocabulary}
          <hr />
          Expressions:{' '}
          <span style={{ color: sufficientExpressions ? 'green' : 'red' }}>
            {expressions.length}
          </span>
          /{minimumExpressions}
        </div>
      )}

      <style jsx>{`
        .message_container {
          padding: 0 1rem;
          display: flex;
          align-items: center;
        }

        .message_requirements {
          margin-left: 0.75rem;
          font-size: 0.9rem;
        }

        hr {
          margin: 0.2rem 0;
          border: none;
          height: 1px;
          background-color: rgba(34, 36, 38, 0.15);
        }
      `}</style>
    </div>
  );
}
