/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { CSSProperties } from 'react';
import { FaPlus } from 'react-icons/fa';
import { mix } from 'color2k';

type Props = {
  isOpen: boolean;
  header: string;
  content: JSX.Element;
  color?: string;
  handleClick: (id: string) => void;
  id: number;
};

export default function AccordionItem({
  isOpen,
  header,
  content,
  color,
  handleClick,
  id,
}: Props) {
  const accentColor = color || 'red';
  const bgColor = mix(color || 'red', 'white', 0.85);

  return (
    <div
      // because we randomly get a color, the server and client styles will mismatch ...
      // ... and since the site is statically build we can ignore this warning
      suppressHydrationWarning
      className="accordion"
      style={
        {
          '--accentColor': accentColor,
          '--bgColor': bgColor,
        } as CSSProperties
      }
    >
      <div
        className="accordion_header"
        id={String(id)}
        onClick={e => handleClick(e.currentTarget.id)}
      >
        <FaPlus
          style={{
            transition: 'transform 0.15s',
            transform: `rotate(${isOpen ? 45 : 0}deg)`,
          }}
        />
        <h3 className="accordion_header_title">{header}</h3>
      </div>
      {isOpen && <div className="accordion_content">{content}</div>}

      <style jsx>{`
        .accordion {
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

        .accordion:before {
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
      `}</style>
      <style jsx>{`
        .accordion_header {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }
      `}</style>
      <style jsx>{`
        .accordion_header_title {
          margin: 1rem 0 1rem var(--padding);
          font-weight: ${isOpen ? 'bold' : 'normal'};
        }
      `}</style>
      <style jsx>{`
        .accordion_content {
          padding-left: calc(1rem + var(--padding));
        }
      `}</style>
    </div>
  );
}
