import React, { CSSProperties } from 'react';
import { FaPlus } from 'react-icons/fa';
import { mix } from 'color2k';

type Props = {
  isStatic?: boolean;
  isOpen?: boolean;
  id: number;
  header: string;
  content: JSX.Element;
  color: string;
  handleClick?: (id: string) => void;
};

export default function Block({
  isStatic = false,
  isOpen,
  id,
  header,
  content,
  color: accentColor,
  handleClick,
}: Props) {
  // the background color is a lighter shade of the color given
  const bgColor = mix(accentColor, 'white', 0.85);

  const onClick = (e: any) => {
    if (handleClick) handleClick((e.currentTarget as any).id);
  };

  return (
    <div
      className="block"
      style={
        {
          '--accentColor': accentColor,
          '--bgColor': bgColor,
        } as CSSProperties
      }
    >
      <div
        className="block_header"
        id={String(id)}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyPress={onClick}
      >
        {!isStatic && (
          <FaPlus
            style={{
              transition: 'transform 0.15s',
              transform: `rotate(${isOpen ? 45 : 0}deg)`,
            }}
          />
        )}
        <h3 className="block_header_title">{header}</h3>
      </div>
      {(isOpen || isStatic) && <div className="block_content">{content}</div>}

      <style jsx>{`
        .block {
          position: relative;
          margin: 0.5rem auto;
          width: 50%;
          border-radius: var(--radius);
          background-color: var(--bgColor);
          padding: var(--padding) var(--padding) var(--padding)
            calc(var(--padding) + var(--radius));

          --radius: 0.5rem;
          --padding: 0.75rem;
        }

        .block:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          background-color: var(--accentColor);
          height: 100%;
          width: var(--radius);
          border-top-left-radius: var(--radius);
          border-bottom-left-radius: var(--radius);
        }

        .block_header {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .block_header_title {
          margin: 1rem 0 1rem var(--padding);
          font-weight: bold;
        }

        .block_content {
          padding-left: calc(1rem + var(--padding));
        }
      `}</style>
    </div>
  );
}
